import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CaseStructureParams } from "../../types/data-types";
import { fetchApiData, fetchData } from "../../helper/apiHelper";

export interface InitialStateProp {
  isLoading?: boolean;
  errorMessage?: any;
  users: any;
}

const initialState: InitialStateProp = {
  isLoading: false,
  errorMessage: null,
  users: [],
};

//CASE STRUCTURE

// GET USERS
export const getAllUsers = createAsyncThunk(
  "casesTypes/allusers",
  async (data: {}, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/CaseStructure/GetAllUsers",
        data,
        method: "get",
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to make request");
    }
  }
);

const caseStructureSlice = createSlice({
  name: "caseStructure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetching users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          state.users = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.users = [];
        }
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      });
  },
});

export default caseStructureSlice.reducer;
