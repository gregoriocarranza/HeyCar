import { createSlice } from "@reduxjs/toolkit";
import {
  getVehicles,
  getVehiclesFailureHistory,
  getVehiclesRepairHistory,
  postVehiclesFailureHistory,
  postVehiclesRepairHistory,
  registerVehicle,
} from "./VehiclesAction";

const initialState = {
  vehicles: [],
  vehicleHistory: [],
  vehicleRepairHistory: [],
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
      })
      .addCase(getVehiclesFailureHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehiclesFailureHistory.fulfilled, (state, action) => {
        state.vehicleHistory = action.payload;
        state.loading = false;
      })
      .addCase(getVehiclesFailureHistory.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      .addCase(postVehiclesFailureHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(postVehiclesFailureHistory.fulfilled, (state, action) => {
        state.vehicleHistory.push(action.payload);
        state.loading = false;
      })
      .addCase(postVehiclesFailureHistory.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      .addCase(getVehiclesRepairHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehiclesRepairHistory.fulfilled, (state, action) => {
        state.vehicleRepairHistory = action.payload;
        state.loading = false;
      })
      .addCase(getVehiclesRepairHistory.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      })
      .addCase(postVehiclesRepairHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(postVehiclesRepairHistory.fulfilled, (state, action) => {
        state.vehicleRepairHistory.push(action.payload);
        state.loading = false;
      })
      .addCase(postVehiclesRepairHistory.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.error = true;
        state.loading = false;
      });
  },
});

export const vehiclesReducer = vehiclesSlice.reducer;
