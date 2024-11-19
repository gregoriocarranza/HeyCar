import { View, SafeAreaView, Button, Modal, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
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
import * as Notifications from "expo-notifications";
import HistorialFallos from "./src/pages/MyCar/HistorialFallos/HistorialFallos";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function App() {
  const [notification, setNotification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("Notification received in foreground:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User interacted with notification:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
                name="failureHistory"
                options={{ title: "Historial de fallos", headerShown: true }}
                component={HistorialFallos}
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
