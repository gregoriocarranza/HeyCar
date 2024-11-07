import { createSlice } from "@reduxjs/toolkit";
import { saveNotification } from "./NotificationAction";

const initialState = {
  tokendata: {},
  loading: false,
  error: false,
  errorMessage: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveNotification.fulfilled, (state, action) => {
        state.tokendata = {
          notification_token: action.payload.notification_token,
          notification_type: action.payload.notification_type,
        };
        state.loading = false;
      })
      .addCase(saveNotification.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = !state.error;
        state.loading = false;
      });
  },
});

export const notificationReducer = notificationSlice.reducer;
