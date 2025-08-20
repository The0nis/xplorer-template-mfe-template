import { toast } from "react-toastify";
import setupInterceptors from "../api/api";
import apiFetcher from "../api/apiFetcher";
import { deCrypter, encrypter } from "./encrypt";
import { AxiosError } from "axios";

const settingsBaseUrl = import.meta.env.VITE_API_URL;

let { apiWithToken } = setupInterceptors(settingsBaseUrl);

// apiHelper.ts
export const fetchData = async ({
  endpoint,
  data,
  method = "get",
  encrypt = true,
}: {
  endpoint: string;
  data?: any;
  method?: "get" | "post" | "put" | "delete";
  encrypt?: boolean;
}) => {
  try {
    let param = encrypter(data);
    const url = `${endpoint}?Data=${param}`;
    let response;

    response = await apiWithToken({
      method,
      url,
      data,
    });

    if (typeof response?.data?.data === "string") {
      const decryptedData = deCrypter(response?.data?.data);
      
      return decryptedData;
    }
    return response;
  } catch (error) {
    console.error("API Error:", error);
    // toast.error(error.message)
  }
};

export const fetchApiData = async ({
  endpoint,
  method = "GET",
  data = null,
}: {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
}) => {
  try {
    const url = `${endpoint}`;
    const response = await apiWithToken({
      method,
      url,
      data,
    });
    return response?.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
