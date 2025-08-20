import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { encrypter, deCrypter } from "../helper/encrypt";
import { getUserFromLocalStorage } from "../helper/localstorage";

const fakeApiUrl =
  // "https://spectahcmloanportal.sterlingapps.p.azurewebsites.net/api/log/forward";
  "https://test-gateway.sterling.ng/gateway/hcm-loan-portal-be/api/log/forward";
const mainApiBaseUrl = import.meta.env.VITE_API_URL;

// Create an Axios instance for main API requests
const apiClient = axios.create({
  baseURL: mainApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "X-Frame-Options": "sameorigin",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "script-src 'self'; 'unsafe-inline';",
    Pragma: "no-cache",
    "Cache-control": "no-store",
    "Strict-Transport-Security": "max-age=60",
    "access-control-allow-origin": "*",
  },
});

// Add a request interceptor to route through fake API URL
apiClient.interceptors.request.use(
  async (config: any) => {
    const logRequestBody: any = {
      url: `${mainApiBaseUrl}${config.url}`, // Full URL of the main API request
      method: config.method.toUpperCase(), // HTTP method (GET, POST, etc.)
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${getUserFromLocalStorage()?.Data?.AccessToken}`, // Dynamically set Authorization token
      },
    };

    // Add the request body to the log if it exists (for POST, PUT, etc.)
    if (config.data) {
      logRequestBody.body = encrypter(config.data); // Attach the request payload to the log
    }

    try {
      // Send the log forward request to the fake API
      const logResponse = await axios.post(fakeApiUrl, logRequestBody);

      // Stop further processing and resolve with fake API response
      return Promise.reject({
        data: logResponse?.data, // Return the fake API response as the "error" object
        status: 200, // Simulate a successful status
      });
    } catch (error: any) {
      console.error("Error in Fake API Request:", error.message);
      return Promise.reject(error); // Forward the error
    }
  },
  (error) => {
    // Handle any errors during request interception
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error) {
      if (error.data && typeof error.data === "string") {
        const decryptedData = deCrypter(error.data);
        error.data = decryptedData;
      } else {
        error.data = deCrypter(error);
      }
      return error;
    }

    // Handle other errors
    if (error.response) {
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
