import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import setupInterceptors from "../../api/api";
import { deCrypter, encrypter } from "../../helper/encrypt";

export interface InitialStateProp {
  isLoading?: boolean;
  activities: any;
  errorMessage?: any;
}

const initialState: InitialStateProp = {
  isLoading: false,
  activities: [],
  errorMessage: null,
};

let { apiWithToken } = setupInterceptors();

// Thunk to get all activities
export const getAllActivities = createAsyncThunk(
  "activities/getAllActivities",
  async (params: any, thunkAPI) => {
    try {
      const method = "GET";
      const url = `/Activity/FilterActivity?data=${encrypter(params)}`;

      const response = await apiWithToken({
        method,
        url,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Internal Server Error, Kindly Contact Admin!"
      );
    }
  }
);

// Thunk to save an email activity type
export const saveEmailActivity = createAsyncThunk(
  "activities/saveEmailActivity",
  async (payload: any, thunkAPI) => {
    try {
      const method = "POST";
      const url = `/Email/CreateEmail`;

      const response = await apiWithToken({
        method,
        url,
        data: payload,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Internal Server Error, Kindly Contact Admin!"
      );
    }
  }
);

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetching activities
      .addCase(getAllActivities.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllActivities.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;

        const decryptedData = deCrypter(payload.data);
        state.activities = decryptedData?.Data;
      })
      .addCase(getAllActivities.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      });

    // Handling saving email activity
  },
});

export default activitySlice.reducer;
