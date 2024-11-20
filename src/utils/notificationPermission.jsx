import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { Alert } from "react-native";

export default async function registerForPushNotificationsAsync(
  tokenType = process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_PROVIDER || "EXPO"
) {
  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      Alert.alert("Project ID not found");
    }

    // Solicita permisos de notificación
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Error", "No se pudo obtener el token de notificación.");
      return;
    }

    // Obtener el token según el tipo seleccionado
    let token;
    if (tokenType === "EXPO") {
      token = (await Notifications.getExpoPushTokenAsync(projectId)).data;
    } else if (tokenType === "FCM") {
      token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
      throw new Error(
        "EXPO_PUBLIC_PUSH_NOTIFICATION_PROVIDER debe ser 'EXPO' o 'FCM'."
      );
    }

    // Muestra el token en una alerta
    Alert.alert(
      "Token de Notificación",
      `Token para ${tokenType}: ${token},\n\n ProjectID:${projectId}`
    );

    return { token, type: tokenType };
  } catch (error) {
    Alert.alert("Error", `Error al obtener el token: ${error.message}`);
    throw error;
  }
}
