import { createSlice } from "@reduxjs/toolkit";
import { getUserByJWT, registerUser, loginUser } from "./UserAction";

const initialState = {
  user: null,
  loading: false,
  error: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserByJWT.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserByJWT.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserByJWT.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = !state.error;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = !state.error;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = !state.error;
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
