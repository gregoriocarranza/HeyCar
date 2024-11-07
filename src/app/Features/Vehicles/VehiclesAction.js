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