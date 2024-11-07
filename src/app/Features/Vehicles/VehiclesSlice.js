import { createSlice } from "@reduxjs/toolkit";
import { getVehicles, registerVehicle } from "./VehiclesAction";

const initialState = {
  vehicles: [],
  vehicle: null,
  loading: false,
  error: false,
  errorMessage: "",
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerVehicle.fulfilled, (state, action) => {
        state.vehicles.push(action.payload);
        state.loading = false;
      })
      .addCase(registerVehicle.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload;
        state.loading = false;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      });
  },
});

export const vehiclesReducer = vehiclesSlice.reducer;