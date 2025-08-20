import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deCrypter, encrypter } from "../../helper/encrypt";
import apiClient from "../../api/api_2";
import { calculateDateRange } from "../../components/config";
import setupInterceptors from "../../api/api";

// Define types
export interface DashboardState {
  duration: string;
  isFetching: boolean;
  errorMessage: string | null;
}

let { apiWithToken } = setupInterceptors();

const method = "GET";

// Thunk for fetching case statistics based on duration
export const fetchCaseStatistics = createAsyncThunk(
  "dashboard/fetchCaseStatistics",
  async (param: { duration: string; userId?: string }, thunkAPI) => {
    const { dateFrom, dateTo } = calculateDateRange(param?.duration);
    const payloadToSend = {
      dateFrom,
      dateTo,
      userId: param.userId,
    };

    try {
      const url = `/case/filter-status-by-date?query=${encrypter(
        payloadToSend
      )}`;

      const response = await apiWithToken({
        method,
        url,
      });
      console.log("fetchCaseStatistics-response", response);
      return response?.data;
    } catch (error) {
      console.error("fetchCaseStatistics-API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

// Create slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    duration: "last24hrs",
    isFetching: false,
    errorMessage: "",
  },
  reducers: {
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setCaseResolution: (state, action) => {
      state.caseResolution = action.payload;
    },
    setCaseStatus: (state, action) => {
      state.caseStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetching cases statistics
      .addCase(fetchCaseStatistics.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCaseStatistics.fulfilled, (state, { payload }) => {
        state.isFetching = false;
      })
      .addCase(fetchCaseStatistics.rejected, (state, { payload }) => {
        state.isFetching = false;
        if (typeof payload === "string") {
          state.errorMessage = payload;
        }
      });
  },
});

export const { setDuration, setCaseResolution, setCaseStatus } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
