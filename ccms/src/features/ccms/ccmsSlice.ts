// ccmsSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import setupInterceptors from "../../api/api";
import { GetCcmsReportsListProps } from "../../config/all_interfaces";
import { deCrypter, encrypter } from "../../helper/encrypt";
import apiFetch from "../../api/apiFetch";
import { DeleteCcmsReportResponse } from "../../config/apiResponse_interfaces";
import { AxiosResponse } from "axios";
// Interface to define the CCMS report item structure
export interface CCMSReportItem {
  Id: string;
  Name: string;
  CreateOn: string;
  ModifiedOn: string;
  CreatedBy: string;
  ModifiedBy: string;
  Request: string;
  Response: string;
  Error: string | null;
  TicketNumber: string;
  Owner: string;
  RecordCreatedOn: string | null;
  Rerun: string | null;
  ResponseType: number;
  Status: string | null;
  StatusReason: string | null;
  Successful: boolean;
}

interface CCMSReportResponseData {
  HasNextPage: boolean;
  HasPreviousPage: boolean;
  Items: CCMSReportItem[];
  PageNumber: number;
  TotalCount: number;
  TotalPages: number;
}

export interface ReportDetailsProps {
  id?: string;
}
export interface DeleteCcmsReportProps {
  id: string;
  deleteReason: string;
}

interface CCMSReportResponse {
  ActivityTime: string;
  Data: CCMSReportResponseData;
  ErrorMessage: string;
  Errors: Record<string, any>;
  HasError: boolean;
  IsSuccess: boolean;
  RequestId: string | null;
  RequestTime: string;
  ResponseCode: number;
  ResponseDescription: string;
  ResponseTime: string;
}

// Interface for the initial state of the slice
export interface InitialStateProp {
  isLoading: boolean;
  isDeletingCcms: boolean;
  ccmsReports: CCMSReportResponseData | null;
  currentCcmsReport?: CCMSReportItem | null;
  viewCcmsReport?: any[];
  deleteCcmsReport?: any;
  isExporting: boolean;
  exportingStatus: "pending" | "fulfilled" | "failed";
  errorMessage: string | null;
}

// Initial state for the ccmsSlice
const initialState: InitialStateProp = {
  isLoading: false,
  isDeletingCcms: false,
  ccmsReports: null,
  currentCcmsReport: null,
  viewCcmsReport: [],
  deleteCcmsReport: null,
  isExporting: false,
  exportingStatus: "pending",
  errorMessage: null,
};

let { apiWithToken, apiWithoutToken, apiWithTokenNoEncryptionDecryption } = setupInterceptors();


// Thunk to get the CCMS reports list
export const getCcmsReportsList = createAsyncThunk(
  "ccms/getCcmsReportsList",
  async (payload: GetCcmsReportsListProps, thunkAPI) => {
    try {
      const { PageNumber, PageSize } = payload;
      const method = "GET";
      const url = `/CCMS/ccms-reports/list?param=${encrypter(payload)}`;
      const response =
        await apiWithToken({
            method,
            url,
          });

      // const response = await apiFetch.get<{ data: any[] }>(url)
      if (typeof response?.data === "string") {
        const decryptedData = deCrypter(response?.data);
        return decryptedData;
      } else {
        // Response has already been decrypted.
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Internal Server Error, Kindly Contact Admin!"
      );
    }
  }
);

export const viewCcmsReportsDetails = createAsyncThunk(
  "ccms/viewCcmsReportsDetails",
  async (id: ReportDetailsProps, thunkAPI) => {
    try {
      const method = "GET";
      const encryptedId = encrypter(id);

      const url = `/CCMS/ccms-report-view?param=${encryptedId}`;
      const response =
        await apiWithToken({
          method,
          url,
        });
      // const response = await apiFetch.get<{ data: any[] }>(url)


      // const response = await apiFetch.get<any>(url);
      if (typeof response?.data === "string") {
        const decryptedData = deCrypter(response?.data);
        return decryptedData;
      } else {
        // Response has already been decrypted.
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Internal Server Error, Kindly Contact Admin!"
      );
    }
  }
);

export const deleteCcmsReport = createAsyncThunk<
  AxiosResponse<DeleteCcmsReportResponse>,
  DeleteCcmsReportProps
>("ccms/deleteCcmsReport", async (payload, thunkAPI) => {
  try {
    const method = "DELETE";
    const url = `/CCMS/ccms-report/delete`;

    const response: AxiosResponse<DeleteCcmsReportResponse> =
      await apiWithToken({
        method,
        url,
        data: payload,
      });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "Internal Server Error, Kindly Contact Admin!"
    );
  }
});

export const exportToExcel = createAsyncThunk(
  "/CCMS/export-to-excel",
  async (data: any, thunkAPI) => {
    let { apiWithEncryptionNoDecryption } = setupInterceptors();
    try {
      const method = "post";
      const url = `/CCMS/export-to-excel`;
      const response = await apiWithToken({
        method,
        url,
        data,
        responseType: "blob",
      });
      // Attempt to read the blob as text to check if it's an error
      const isJson = response.headers['content-type']?.includes('application/json');

      if (isJson) {
        const errorText = await response.data.text(); // Try to parse error
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Unknown error occurred.");
      }

      // Otherwise, it's a valid Excel blob
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "CcmsReport.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to export CCMS report to Excel");
    }
  }
);

const ccmsSlice = createSlice({
  name: "ccms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling getting CCMS reports list
      .addCase(getCcmsReportsList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getCcmsReportsList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.ccmsReports = payload?.Data;
        } else {
          state.ccmsReports = null;
        }
        state.errorMessage = null;
      })
      .addCase(getCcmsReportsList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      });

    builder
      // Handling getting CCMS reports list
      .addCase(viewCcmsReportsDetails.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(viewCcmsReportsDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.viewCcmsReport = payload?.Data;
        } else {
          console.error("Invalid payload data1");
          // state.viewCcmsReport = any[];
        }
        state.errorMessage = null;
      })
      .addCase(viewCcmsReportsDetails.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload as string;
      });

    builder
      .addCase(deleteCcmsReport.pending, (state) => {
        state.isDeletingCcms = true;
        state.errorMessage = null;
      })
      .addCase(deleteCcmsReport.fulfilled, (state, { payload }) => {
        state.isDeletingCcms = false;
        state.errorMessage = null;
      })
      .addCase(deleteCcmsReport.rejected, (state, { payload }) => {
        state.isDeletingCcms = false;
        state.errorMessage = payload as string;
      })

      //Export to excel
      .addCase(exportToExcel.pending, (state) => {
        state.isExporting = true;
        state.errorMessage = null;
        state.exportingStatus = "pending";
      })
      .addCase(exportToExcel.fulfilled, (state, { payload }) => {
        state.isExporting = false;
        state.errorMessage = null;
        state.exportingStatus = "fulfilled";
      })
      .addCase(exportToExcel.rejected, (state, { payload }) => {
        state.isExporting = false;
        state.errorMessage = null;
        state.exportingStatus = "failed";
      })
  },
});

export default ccmsSlice.reducer;
