import { View, SafeAreaView, Button, Modal, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import HomeScreen from "./src/pages/Home/Home";
import Login from "./src/pages/Login-Register/Login";
import Profile from "./src/pages/Profile/Profile";
import Register from "./src/pages/Login-Register/Register";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/app/Store";
import {
  Provider as PaperProvider,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { styles as appStyles, theme } from "./App.Style";
import * as SecureStore from "expo-secure-store";
import UserLevelDetails from "./src/pages/Profile/Gamification/UserLevelDetails";
import RegisterVehicleForm from "./src/Components/RegisterVehicleForm/RegisterVehicleForm";
import MyCar from "./src/pages/MyCar/MyCar";
import PrivacyPolicyScreen from "./src/pages/terminos-politicas/PrivacyPolicyScreen";
import TermsAndConditionsScreen from "./src/pages/terminos-politicas/TermsAndConditionsScreen";
import HistorialFallos from "./src/pages/MyCar/HistorialFallos/HistorialFallos";
import HistorialDeReparaciones from "./src/pages/MyCar/HistorialDeReparaciones/HistorialDeReparaciones";
import ChatScreen from "./src/pages/Chat/ChatScreen";
import ChatDetailScreen from "./src/pages/Chat/ChatDetail";

const Stack = createNativeStackNavigator();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        let result = await SecureStore.getItemAsync("USER_DATA");

        if (!result) {
          console.error("No user found or access token missing.");
          setIsAuthenticated(false);
          return;
        }

        let user = JSON.parse(result);
        if (!user) {
          setIsAuthenticated(false);
          console.error("No user found or access token missing.");
          return;
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
      <SafeAreaView style={appStyles.safeArea}>
        <View style={appStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ea" />
          <Text>Autenticando Usuario...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={appStyles.safeArea}>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isAuthenticated ? "Home" : "Login"}
              screenOptions={{
                animation: "fade",
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="MyCar" component={MyCar} />
              <Stack.Screen
                name="FailureHistory"
                options={{ title: "Historial de fallos", headerShown: true }}
                component={HistorialFallos}
              />
              <Stack.Screen
                name="RepairHistory"
                options={{
                  title: "Historial de reparaciónes",
                  headerShown: true,
                }}
                component={HistorialDeReparaciones}
              />
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
                options={{ title: "Notificaciones", headerShown: true }}
                component={RegisterVehicleForm}
              />
              <Stack.Screen
                name="Terms"
                options={{ title: "Terminos y condiciones", headerShown: true }}
                component={TermsAndConditionsScreen}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                options={{
                  title: "Politicas de privacidad",
                  headerShown: true,
                }}
                component={PrivacyPolicyScreen}
              />
              <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </SafeAreaView>
  );
}

export default App;

registerRootComponent(App);
