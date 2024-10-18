import ScreenLayout from "@/src/Components/ScreenLayout";
import { Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await SecureStore.getItemAsync("USER_DATA");
        if (jsonValue) {
          const result = JSON.parse(jsonValue);
          if (result) {
            setUserData(result);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <ScreenLayout showFooter={true} currentRoute={"Home"}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    </ScreenLayout>
  );
}
