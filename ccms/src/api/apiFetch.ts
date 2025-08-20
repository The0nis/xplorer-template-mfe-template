import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { getUserFromLocalStorage } from "../helper/localstorage";

// Extended InternalAxiosRequestConfig to include custom properties
// interface CustomRequestConfig extends InternalAxiosRequestConfig {
//   needEncryption?: boolean;
//   submittingFiles?: boolean;
//   headers: AxiosRequestHeaders;
// }

const fakeApiUrl =
  "https://test-gateway.sterling.ng/gateway/hcm-loan-portal-be/api/log/forward";
const mainApiBaseUrl = import.meta.env.VITE_API_URL;

// Create an Axios instance for main API requests
const apiClient = axios.create({
  baseURL: mainApiBaseUrl, // Main API base URL
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

// Function to get the logged-in user's token (mock example)


// Add a request interceptor to route through fake API URL
apiClient.interceptors.request.use(
  async (config: any) => {
    console.log(config);

    const getToken =
      localStorage.getItem("accessToken") ||
      getUserFromLocalStorage()?.Data?.AccessToken;

    const logRequestBody: any = {
      url: `${mainApiBaseUrl}${config.url}`, // Full URL of the main API request
      method: config.method.toUpperCase(), // HTTP method (GET, POST, etc.)
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${getToken}`, // Dynamically set Authorization token
      },
    };


    // Add the request body to the log if it exists (for POST, PUT, etc.)
    if (config.data) {
      logRequestBody.body = JSON.stringify(config.data); // Attach the request payload to the log
      console.log("logRequestBody: ", logRequestBody.body);
      // console.log("logRequestBodyData: ", logRequestBody.body.data);
    }

    try {
      // Send the log forward request to the fake API
      const logResponse = await axios.post(fakeApiUrl, logRequestBody);
      console.log("Fake API Response:", logResponse);

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

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // console.log("Response Interceptor: Success", response);
    // console.log("Response Data:", deCrypter(response?.data));
    return response.data;
  },
  (error) => {
    // console.log("responseError: ", error);
    if (error) {
      // console.log("Using Fake API Response:", deCrypter(error?.data?.data));
      //  const decryptedResolvedError = deCrypter(error?.data?.data);
      return Promise.resolve(error); // Return the fake API response data
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
