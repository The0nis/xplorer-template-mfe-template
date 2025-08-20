import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
  ResponseType,
} from "axios";
import { encrypter, deCrypter } from "../helper/encrypt";
import { getUserFromLocalStorage } from "../helper/localstorage";

// Interface for the Store
interface Store {}

// Extended InternalAxiosRequestConfig to include custom properties
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  needEncryption?: boolean;
  submittingFiles?: boolean;
  headers: AxiosRequestHeaders;
  responseType?: ResponseType; // Add responseType here
}

const headerConfig = {
  "Content-Type": "text/json",
};

// Function to set up Axios interceptors with the provided store
const setupInterceptors = (baseUrl?: string) => {
  // Create Axios instances
  const createInstance = (headers: any, responseType?: ResponseType) => {
    return axios.create({
      baseURL: baseUrl || import.meta.env.VITE_API_URL,
      headers,
      responseType: responseType || "json", // Default to 'json' if not provided
    });
  };

  // Reusable function for encrypting parameters
  const encryptParams = (params: any) => {
    if (params !== undefined) {
      for (const key in params) {
        params[key] = `"${encrypter(params[key])}"`.replace(/^"(.*)"$/, "$1");
      }
    }
    return params;
  };

  // Request interceptors function
  const requestInterceptor = (
    config: CustomRequestConfig,
    needEncryption = false,
    submittingFiles = false,
    skipAuth = false // Add a parameter to skip Authorization
  ) => {
    const getToken =
      localStorage.getItem("accessToken") ||
      getUserFromLocalStorage()?.Data?.AccessToken;

    // Only add Authorization header if skipAuth is false
    if (!skipAuth) {
      config.headers.Authorization = `Bearer ${getToken}`;
    }

    // Set the Content-Type and Accept headers
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";

    // Override Content-Type for file submissions
    if (submittingFiles) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    // Handle encryption if needed
    if (needEncryption) {
      config.params = encryptParams(config.params);
      config.data = { data: encrypter(config.data) };
    } else {
      // Reset the encryption fields if not needed
      config.params = config.params; // Adjust as needed
      config.data = config.data; // Adjust as needed
    }

    return config;
  };

  // Create Axios instances
  const apiWithToken = createInstance(headerConfig);
  const apiWithTokenNoEncryption = createInstance(headerConfig);
  const apiWithTokenNoEncryptionDecryption = createInstance(headerConfig);
  const apiWithoutToken = createInstance(headerConfig);

  // Set up request interceptors for different axios instances

  // apiWithToken: Includes Authorization header and encryption
  apiWithToken.interceptors.request.use(
    (config: CustomRequestConfig) => requestInterceptor(config, true), // Encryption enabled
    (error) => Promise.reject(error)
  );

  // apiWithTokenNoEncryption: Includes Authorization header, file submission
  apiWithTokenNoEncryption.interceptors.request.use(
    (config: CustomRequestConfig) => requestInterceptor(config, false, true), // Encryption disabled, file submission enabled
    (error) => Promise.reject(error)
  );

  // apiWithTokenNoEncryptionDecryption: Includes Authorization header, file submission, no encryption
  apiWithTokenNoEncryptionDecryption.interceptors.request.use(
    (config: CustomRequestConfig) => requestInterceptor(config, false, true), // Encryption disabled, file submission enabled
    (error) => Promise.reject(error)
  );

  // apiWithoutToken: Skips Authorization header, encryption enabled
  apiWithoutToken.interceptors.request.use(
    (config: CustomRequestConfig) =>
      requestInterceptor(config, true, false, true), // Encryption enabled, Authorization skipped
    (error) => Promise.reject(error)
  );

  const responseInterceptor = (response: any) => {
    if (response.data && typeof response.data === "string") {
      const decryptedData = deCrypter(response.data);
      response.data = decryptedData;
    }
    return response;
  };

  const responseNoDecryptionInterceptor = (response: any) => {
    return response.data;
  };

  // Set up response interceptors for apiWithToken, apiWithTokenNoEncryption, and apiWithoutToken
  apiWithToken.interceptors.response.use(responseInterceptor, (error) =>
    Promise.reject(error)
  );

  apiWithTokenNoEncryption.interceptors.response.use(
    responseInterceptor,
    (error) => Promise.reject(error)
  );

  apiWithTokenNoEncryptionDecryption.interceptors.response.use(
    responseNoDecryptionInterceptor,
    (error) => Promise.reject(error)
  );

  apiWithoutToken.interceptors.response.use(responseInterceptor, (error) =>
    Promise.reject(error)
  );

  return {
    apiWithToken,
    apiWithTokenNoEncryption,
    apiWithoutToken,
    apiWithTokenNoEncryptionDecryption,
  };
};

export default setupInterceptors;

// Export the setupInterceptors function directly
export const {
  apiWithToken,
  apiWithTokenNoEncryption,
  apiWithoutToken,
  apiWithTokenNoEncryptionDecryption,
} = setupInterceptors();
