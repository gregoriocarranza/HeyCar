import { View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import HomeScreen from "./src/pages/Home/Home";
import Login from "./src/pages/Login-Register/Login";
import Profile from "./src/pages/Profile/Profile";
import Register from "./src/pages/Login-Register/Register";
import {
  Provider as PaperProvider,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { styles, theme } from "./App.Style";
import * as SecureStore from "expo-secure-store";
import UserLevelDetails from "./src/pages/Profile/Gamification/UserLevelDetails";
import RegisterVehicleForm from "./src/Components/RegisterVehicleForm/RegisterVehicleForm";
import MyCar from "./src/pages/MyCar/MyCar";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        let result = await SecureStore.getItemAsync("USER_DATA");
        if (!result) {
          console.error("No user found or access token missings.");
          setIsAuthenticated(false);
        }

        let user = JSON.parse(result);

        if (!user) {
          console.error("No user found or access token missing.");
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ea" />
          <Text>Autenticando Usuario...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? "Home" : "Login"}
            screenOptions={{
              animation: "fade", //default | fade | slide_from_right | slide_from_left | slide_from_bottom | none|
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="MyCar" component={MyCar} />
            <Stack.Screen
              name="UserLevelDetails"
              options={{ title: "Nivel de usuario", headerShown: true }}
              component={UserLevelDetails}
            />
            <Stack.Screen
              name="RegisterVehicle"
              options={{ title: "Registra tu vehiculo", headerShown: true }}
              component={RegisterVehicleForm}
            />
            <Stack.Screen
              name="Notifications"
              options={{ title: "Notificaciones", headerShown: true }} // TODO Hacer servicio de notificacioens basico
              component={RegisterVehicleForm}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
}
registerRootComponent(App);
