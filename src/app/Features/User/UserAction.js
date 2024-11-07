import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccesTokenVerified } from "../../../utils/TokenValidations";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
export const getUserByJWT = createAsyncThunk(
  "users/getByJWT",
  async (accessToken = null, { rejectWithValue }) => {
    let user = {};
    try {
      if (!accessToken) {
        user = await getAccesTokenVerified();
      }

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken || user?.tokens?.accessToken}`,
        },
      });
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

export const registerUser = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const users = await response.json();
      return users[0] || null;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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

export const healthCheck = async () => {
  console.log("Iniciando solicitud a:", `${EXPO_PUBLIC_API_URL}/health`);

  try {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error durante la solicitud:", error);
    throw error;
  }
};
