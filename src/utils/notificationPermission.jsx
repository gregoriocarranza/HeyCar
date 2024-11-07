import * as Notifications from "expo-notifications";

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  if (process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_PROVIDER === "EXPO") {
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else if (process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_PROVIDER === "FCM") {
    token = (await Notifications.getDevicePushTokenAsync()).data;
  } else {
    throw new Error(
      "EXPO_PUBLIC_PUSH_NOTIFICATION_PROVIDER tiene que ser valido"
    );
  }

  // console.log(
  //   `Token para ${process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_PROVIDER}:`,
  //   token
  // );

  return { token, type: process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_PROVIDER };
}
