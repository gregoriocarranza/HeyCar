import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccesTokenVerified } from "../../../utils/TokenValidations";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export const registerVehicle = createAsyncThunk(
  "vehicles/register",
  async (vehicle, { rejectWithValue }) => {
    try {
      user = await getAccesTokenVerified();

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/vehicles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.tokens?.accessToken}`,
        },
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getVehicles = createAsyncThunk(
  "vehicles/getVehicles",
  async (vehicle, { rejectWithValue }) => {
    try {
      user = await getAccesTokenVerified();

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/vehicles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.tokens?.accessToken}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getVehiclesFailureHistory = createAsyncThunk(
  "vehicles/getVehiclesFailureHistory",
  async (vehicle_id, { rejectWithValue }) => {
    try {
      user = await getAccesTokenVerified();

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/vehicles/${vehicle_id}/failures`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.tokens?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postVehiclesFailureHistory = createAsyncThunk(
  "vehicles/postVehiclesFailureHistory",
  async (vehicle, { rejectWithValue }) => {
    try {
      user = await getAccesTokenVerified();

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/vehicles/${vehicle?.vehicle_id}/failures`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.tokens?.accessToken}`,
          },
          body: JSON.stringify(vehicle),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getVehiclesRepairHistory = createAsyncThunk(
  "vehicles/getVehiclesRepairHistory",
  async (vehicle_id, { rejectWithValue }) => {
    try {
      user = await getAccesTokenVerified();

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/repairs/${vehicle_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.tokens?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postVehiclesRepairHistory = createAsyncThunk(
  "vehicles/postVehiclesRepairHistory",
  async (repair, { rejectWithValue }) => {
    try {
      user = await getAccesTokenVerified();

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/repairs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.tokens?.accessToken}`,
        },
        body: JSON.stringify(repair),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error("response.ok", data.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
