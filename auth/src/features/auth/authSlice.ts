import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import setupInterceptors from "../../api/api";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../helper/localstorage";

export interface InitialStateProp {
  isLoading?: boolean;
  loginStatus?: any;
  user?: any;
  userData?: any;
  errorMessage?: any;
}

interface loginDataProps {
  UserName: string;
  Password: string;
  OneToken: string;
  SwitchOneToken: string;
}

const initialState: InitialStateProp = {
  isLoading: false,
  loginStatus: null,
  user: null,
  userData: getUserFromLocalStorage(),
  errorMessage: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: loginDataProps, thunkAPI) => {
    let { apiWithoutToken } = setupInterceptors();

    try {
      const method = "post";
      const url = "/auth/login";

      const response = await apiWithoutToken({
        method,
        url,
        data,
      });
      console.log({ response });
      localStorage.setItem("test data", JSON.stringify(response));
      addUserToLocalStorage(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error || "Failed to make req.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.loginStatus = "pending";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload;
        console.log(state.userData);
        addUserToLocalStorage(payload);
        state.errorMessage = null;
        state.loginStatus = "fulfilled";
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.userData = null;
        state.errorMessage = payload;
        state.loginStatus = "failed";
      });
  },
});

// export const {logout} = authSlice.actions
export default authSlice.reducer;
