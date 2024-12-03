import ScreenLayout from "@/src/Components/ScreenLayout";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FontAwesome6, Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import styles from "./Home.styles";
import RNPickerSelect from "react-native-picker-select";
import { useIsFocused } from "@react-navigation/native";
// import * as Sentry from "@sentry/react-native";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../app/Features/Vehicles/VehiclesAction";
import { StatusTypes, vehicleStatusChecker } from "@/src/utils/VehicleStatus";
import registerForPushNotificationsAsync from "../../utils/notificationPermission";
import { saveNotification } from "../../app/Features/Notification/NotificationAction";
import { getUserByJWT } from "@/src/app/Features/User/UserAction";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    vehicles: vehiclesData,
    loading,
    error,
  } = useSelector((state) => state.vehicles);

  const [userData, setUserData] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedVehicleData, setSelectedVehicleData] = useState({});
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        if (notification) {
          setNotification(notification);
          console.info("Notification received in foreground:", notification);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.info(
          "User interacted with notification:",
          response.notification.request.content
        );
        navigation.navigate("FailureHistory");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // Sentry.captureMessage("Cargando home");

  const loadUser = async () => {
    setRefreshing(true);
    try {
      const jsonValue = await SecureStore.getItemAsync("USER_DATA");
      const notificationData = await SecureStore.getItemAsync(
        "NOTIFICATION_DATA"
      );
      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setUserData(result);
        dispatch(getUserByJWT());
        dispatch(getVehicles())
          .then((result) => {
            if (vehiclesData?.length < 0) {
              console.info("No hay vehiculos");
              setSelectedVehicle("");
              return;
            }
            const statusChecked = vehicleStatusChecker(vehiclesData[0]);
            setSelectedVehicleData({ ...vehiclesData[0], statusChecked });
          })
          .catch((error) => {
            console.error("Register failed:", error);
          });
        if (!notificationData) {
          const data = await registerForPushNotificationsAsync();
          dispatch(saveNotification(data))
            .then(async (result) => {
              SecureStore.setItem(
                "NOTIFICATION_DATA",
                JSON.stringify({
                  notification_token: result.payload.notification_token,
                  notification_type: result.payload.notification_type,
                })
              );

              console.info("notification token saved");
            })
            .catch((error) => {
              console.error("Notification persisting error:", error);
            });
        }
      }
    } catch (error) {
      // Sentry.captureException("Error loading user data:", error);
      console.error("Error loading user data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    loadUser();
  }, [isFocused]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "OK":
        return <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />;
      case "CHECK":
        return <Ionicons name="warning" size={20} color="#FFC107" />;
      case "DANGER":
        return <Ionicons name="close-circle" size={20} color="#F44336" />;
      case "WARNING":
        return <Ionicons name="alert-circle" size={20} color="#FF9800" />;
      default:
        return <AntDesign name="questioncircleo" size={20} color="#aa00ff" />;
    }
  };

  return (
    <ScreenLayout showFooter={true} currentRoute={"Home"}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadUser()}
          />
        }
      >
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <View style={styles.vehicleContainer}>
            {vehiclesData?.length === 0 ? (
              <View style={styles.noVehicleCard}>
                <Text style={styles.noVehicleText}>
                  No se registró ningún vehículo
                </Text>
                <Text style={styles.registerPromptText}>
                  Registra tu vehículo ahora!
                </Text>
                <TouchableOpacity
                  style={styles.addVehicleIconTouchContainer}
                  onPress={() => navigation.navigate("RegisterVehicle")}
                >
                  <Image
                    source={require("@/src/assets/newCar.png")}
                    style={styles.addVehicleIconImage}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.VehicleCard}>
                  <View style={styles.VehicleCardHeader}>
                    <View style={styles.vehicleCardInfoSection}>
                      <RNPickerSelect
                        onValueChange={(value) => {
                          const selectedVehicle = vehiclesData.find(
                            (vehicle) =>
                              value === vehicle?.vehicle_name ||
                              value === `${vehicle?.brand} ${vehicle?.model}`
                          );

                          const statusChecked =
                            vehicleStatusChecker(selectedVehicle);
                          setSelectedVehicleData(
                            { ...selectedVehicle, statusChecked } || {}
                          );
                        }}
                        items={vehiclesData?.map((vehicle) => ({
                          label:
                            vehicle.vehicle_name ||
                            `${vehicle.brand} ${vehicle.model}`,
                          value:
                            vehicle.vehicle_name ||
                            `${vehicle.brand} ${vehicle.model}`,
                        }))}
                        value={
                          selectedVehicleData.vehicle_name ||
                          `${selectedVehicleData.brand} ${selectedVehicleData.model}`
                        }
                      />
                      <Text style={styles.vehicleInfo}>
                        {"Marca: " + selectedVehicleData?.brand ||
                          "Marca desconocida"}{" "}
                        -{" "}
                        {"Patente: " + selectedVehicleData?.license_plate ||
                          "Sin patente"}{" "}
                        -{" "}
                        {"Año: " + selectedVehicleData?.year ||
                          "Año desconocido"}{" "}
                        -{" "}
                        {selectedVehicleData?.km || "Kilometraje no disponible"}{" "}
                        km
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Notifications")}
                    >
                      <FontAwesome6 name={"bell"} style={styles.bellIcon} />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={
                      selectedVehicleData?.image
                        ? { uri: selectedVehicleData?.image }
                        : require("../../assets/Autos/tiggo-3.png")
                    }
                    style={styles.addVehicleIconImage}
                  />
                </View>
                {/* <View style={styles.sectionview}>
                  <View style={styles.sectionDivider} />
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Advertencias</Text>
                    <Text style={styles.showMore}>Mostrar Mas</Text>
                  </View>
                  {selectedVehicleData?.adv?.map((spec, index) => (
                    <View key={index} style={styles.specificationCard}>
                      <Text style={styles.specTitle}>{spec.name}</Text>
                      <Text style={styles.specValue}>{spec.value}</Text>
                    </View>
                  ))}
                </View> */}
                <View style={styles.sectionview}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Estado del vehiculo</Text>
                  </View>
                  <View style={styles.sectionDivider} />
                  {selectedVehicleData &&
                    selectedVehicleData.statusChecked?.length > 0 && (
                      <>
                        {selectedVehicleData.statusChecked.map((data) => (
                          <View key={data.id} style={styles.statusItem}>
                            <data.img style={styles.statusImage} />
                            <Text style={styles.statusText}>{data.name}</Text>
                            <View style={styles.statusIconContainer}>
                              {getStatusIcon(data.status)}
                              <Text
                                style={[
                                  styles.statusLabel,
                                  {
                                    color:
                                      data.status === "OK"
                                        ? "#4CAF50"
                                        : data.status === "CHECK"
                                        ? "#FFC107"
                                        : data.status === "WARNING"
                                        ? "#FF9800"
                                        : data.status === "DANGER"
                                        ? "#F44336"
                                        : "#000000", // Null color
                                  },
                                ]}
                              >
                                {StatusTypes[data?.status] || "sin estado"}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </>
                    )}
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
