import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import setupInterceptors from "../../api/api";
import { encrypter } from "../../helper/encrypt";
export interface InitialStateProp {
  isLoading?: boolean;
  userManagementStatus?: any;
  errorMessage?: any;
}

const initialState: InitialStateProp = {
  isLoading: false,
  userManagementStatus: null,
  errorMessage: null,
};

const userMgtBaseUrl = import.meta.env.VITE_API_URL;

let { apiWithToken } = setupInterceptors(userMgtBaseUrl);

// USER
export const validateUsername = createAsyncThunk(
  "user/validateUsername",
  async (data: { Username: string }, thunkAPI) => {
    let { apiWithToken } = setupInterceptors();
    // let param = encrypter(data);
    try {
      const method = "post";
      const url = "/users/validate-username";

      const response = await apiWithToken({
        method,
        url,
        data,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || "Failed to make req.");
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "users/all",
  async (data: {}, thunkAPI) => {
    // let { apiWithToken } = setupInterceptors();
    let param = encrypter(data);

    try {
      const method = "get";
      const url = `/users/all?query=${param}`;

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

const userManagementSlice = createSlice({
  name: "usermanagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateUsername.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.userManagementStatus = "pending";
      })
      .addCase(validateUsername.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(validateUsername.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      })
      // GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export default userManagementSlice.reducer;
