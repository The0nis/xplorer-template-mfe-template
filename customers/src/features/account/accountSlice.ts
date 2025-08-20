import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import setupInterceptors from "../../api/api";
import { encrypter } from "../../helper/encrypt";

export interface InitialStateProp {
  isLoading?: boolean;
  errorMessage?: any;
  customerBvnData?: any;
}

const initialState: InitialStateProp = {
  isLoading: false,
  customerBvnData: null,
  errorMessage: null,
};
export interface CustomerBvnProp {
  customerBvn: string;
}

export const accountBvn = createAsyncThunk(
  "Customer/GetAccountsByBVN",
  async (data: CustomerBvnProp, thunkAPI) => {
    let { apiWithToken, apiWithTokenNoEncryption } = setupInterceptors();
    let param = encrypter(data?.customerBvn);
    try {
      const method = "get";
      const url = `Customer/GetAccountsByBVN?param=${param}`;

      const response = await apiWithToken({
        method,
        url,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to make request, Please Contact Admin"
      );
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(accountBvn.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(accountBvn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.customerBvnData = payload;
        state.errorMessage = null;
      })
      .addCase(accountBvn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.customerBvnData = null;
        state.errorMessage = payload;
      });
  },
});

export default accountSlice.reducer;
