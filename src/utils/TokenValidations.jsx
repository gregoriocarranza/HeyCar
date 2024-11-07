import * as SecureStore from "expo-secure-store";

export const getAccesTokenVerified = async () => {
  try {
    let result = await SecureStore.getItemAsync("USER_DATA");
    if (!result) {
      throw new Error("No user found or access token missings.");
    }

    let user = JSON.parse(result);

    if (!user || !user?.tokens?.accessToken) {
      console.error("No user found or access token missing.");
      throw new Error("No user found or access token missing.");
    }

    if (!(await validateToken(user?.tokens))) {
      throw new Error("El token está vencido");
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const validateToken = async (tokens) => {
  const currentTime = Date.now();
  const tokenIssueTime = tokens.tokenIssueTime;
  const expiresIn = tokens.expiresIn * 1000;

  if (currentTime - tokenIssueTime >= expiresIn) {
    console.log("El token ha expirado, intenta refrescarlo");
    // return await refreshAccessToken(tokens.refreshToken);
    return false;
  }

  // El token aún es válido
  return true;
};
