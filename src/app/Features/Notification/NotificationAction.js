import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccesTokenVerified } from "../../../utils/TokenValidations";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export const saveNotification = createAsyncThunk(
  "users/postNotification",
  async (tokenData, { rejectWithValue }) => {
    try {
      let user = await getAccesTokenVerified();

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/users/notification-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.tokens?.accessToken}`,
          },
          body: JSON.stringify(tokenData),
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error: :", error);
      return rejectWithValue("No se pudo obtener la información del usuario");
    }
  }
);
