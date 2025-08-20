import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
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
}

const headerConfig = {
  "Content-Type": "text/json",
  // "X-Frame-Options": "sameorigin",
  // "X-Content-Type-Options": "nosniff",
  // "Content-Security-Policy": "script-src 'self'; 'unsafe-inline';",
  // "Pragma": "no-cache",
  // "Cache-control": "no-store",
  // "Strict-Transport-Security": "max-age=60",
};

// Function to set up Axios interceptors with the provided store
const setupInterceptors = () => {
  // console.log({ store });
  // Create Axios instances
  const createInstance = (headers: any) => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers,
      responseType: "json",
    });
  };

  // Reusable function for encrypting parameters
  const encryptParams = (params: any) => {
    if (params !== undefined) {
      for (const key in params) {
        params[key] = `"${encrypter(params[key])}"`.replace(/^"(.*)"$/, "$1");
      }
    }
    // console.log({ params });
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
    
    console.log(getUserFromLocalStorage()?.Data?.AccessToken)

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
      config.data = encrypter(config.data);
    } else {
      // Reset the encryption fields if not needed
      config.params = config.params; // Adjust as needed
      config.data = config.data; // Adjust as needed
    }

    return config;
  };

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
    // console.log({ response }, response.data);
    response.data = deCrypter(response?.data);
    return response?.data;
  };

  const responseNoDecryptionInterceptor = (response: any) => {
    return response?.data;
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
