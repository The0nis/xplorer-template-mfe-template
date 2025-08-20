import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import setupInterceptors from "../../api/api";
import { deCrypter, encrypter } from "../../helper/encrypt";
import {

  CasesPayload,
  InitialStateProp,
} from "../../types/data-types";


const initialState: InitialStateProp = {
  isLoading: false,
  casesData: null,
  
};

// Get All cases
export const getAllCases: any = createAsyncThunk(
  "cases/all",
  async (data: CasesPayload, thunkAPI) => {
    let { apiWithToken } = setupInterceptors();
    let param = encrypter(data);

    // console.log("PAYLOAD FOR GET ALL CASES",data)

    try {
      const method = "get";
      const url = `cases/all?query=${param}`;

      const response = await apiWithToken({
        method,
        url,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

export const getAllCasesByCaseNumber: any = createAsyncThunk(
  "cases/case-number",
  async (data: { CaseNumber: String }, thunkAPI) => {
    let { apiWithToken } = setupInterceptors();

    let param = encrypter(data);

    try {
      const method = "get";
      const url = `cases/case-number?data=${param}`;

      const response = await apiWithToken({
        method,
        url,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);


const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    updateCaseStatus(state) {
      state.casesStatus = "pending";
      state.creatingStatus = "pending";
      state.slaDetails = null;
    },
    clearBulkClosureValidatedData: (state) => {
      state.bulkClosureListValidatedData = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getAllCases.pending, (state) => {
        state.isLoading = true;
        state.exportingStatus = "pending";
        state.errorMessage = null;
        state.casesData = null;
        state.casesStatus = "pending";
        state.creatingStatus = "pending";
      })
      .addCase(getAllCases.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.casesData = payload;
        state.errorMessage = null;
      })
      .addCase(getAllCases.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.casesData = null;
        state.errorMessage = payload;
      })
  },
});

export const { updateCaseStatus, clearBulkClosureValidatedData } =
  caseSlice.actions;
export default caseSlice.reducer;
