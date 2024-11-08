import ScreenLayout from "@/src/Components/ScreenLayout";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Button,
} from "react-native";
import { FontAwesome6, Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import styles from "./Home.styles";
import RNPickerSelect from "react-native-picker-select";
import { useIsFocused } from "@react-navigation/native";
// import * as Sentry from "@sentry/react-native";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../app/Features/Vehicles/VehiclesAction";
import vehicleStatusChecker from "@/src/utils/VehicleStatus";
import registerForPushNotificationsAsync from "../../utils/notificationPermission";
import { saveNotification } from "../../app/Features/Notification/NotificationAction";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    vehicles: vehiclesData,
    loading,
    error,
  } = useSelector((state) => state.vehicles);

  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState({});
  const [tokenType, setTokenType] = useState("FCM");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedVehicleData, setSelectedVehicleData] = useState({});
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  // Sentry.captureMessage("Cargando home");

  useEffect(() => {
    try {
      if (selectedVehicle != "") {
        const vehicleFocused =
          vehiclesData.find((vehicle) => vehicle?.id === selectedVehicle) || {};
        const statusChecked = vehicleStatusChecker(vehicleFocused);
        setSelectedVehicleData({ ...vehicleFocused, statusChecked });
      }
    } catch (error) {
      // Sentry.captureException("Error filtering the selected vehicle:", error);
      console.error("Error filtering the selected vehicle:", error);
    }
  }, [selectedVehicle]);

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
        dispatch(getVehicles())
          .then((result) => {
            if (vehiclesData?.length < 0) {
              console.info("No hay vehiculos");
              setSelectedVehicle("");
              return;
            }
            // setSelectedVehicle(vehiclesData[0]?.id);
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

              console.log("notification token saved");
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

  useEffect(() => {
    if (isMounted) {
      try {
        console.log("ejecutando el cambio de token por variable");

        const changeType = async () => {
          const data = await registerForPushNotificationsAsync(tokenType);
          dispatch(saveNotification(data))
            .then(async (result) => {
              SecureStore.setItem(
                "NOTIFICATION_DATA",
                JSON.stringify({
                  notification_token: result.payload.notification_token,
                  notification_type: result.payload.notification_type,
                })
              );

              console.log("notification token saved");
            })
            .catch((error) => {
              console.error("Notification persisting error:", error);
            });
        };
        changeType();
      } catch (error) {
        console.error("Notification error:", error);
      }
    } else {
      setIsMounted(true);
    }
  }, [tokenType]);

  const toggleTokenType = () => {
    setTokenType((prevType) => (prevType === "FCM" ? "EXPO" : "FCM"));
  };

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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Tipo de Token: {tokenType}</Text>
          <Button title="Cambiar Token Type" onPress={toggleTokenType} />
        </View>
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
                        onValueChange={(value, index) =>
                          setSelectedVehicle(index)
                        }
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
                        {selectedVehicleData?.model || "Modelo desconocido"} -
                        {selectedVehicleData?.brand || "Marca desconocida"} -
                        {selectedVehicleData?.license_plate || "Sin patente"} -
                        {selectedVehicleData?.year || "Año desconocido"} -
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
                        : require("../../assets/emptyCar.png")
                    }
                    style={styles.addVehicleIconImage}
                  />
                </View>
                <View style={styles.sectionview}>
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
                </View>
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
                                {data?.status?.charAt(0).toUpperCase() +
                                  data?.status?.slice(1).toLowerCase() ||
                                  "sin estado"}
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
