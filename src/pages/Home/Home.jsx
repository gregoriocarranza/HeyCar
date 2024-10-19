import ScreenLayout from "@/src/Components/ScreenLayout";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import styles from "./Home.styles";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await SecureStore.getItemAsync("USER_DATA");
        if (jsonValue) {
          const result = JSON.parse(jsonValue);
          setUserData(result);
        }
        const vehiclesJsonValue = await SecureStore.getItemAsync(
          "VEHICLES_DATA"
        );
        if (vehiclesJsonValue) {
          const vehiclesresult = JSON.parse(vehiclesJsonValue);
          setVehiclesData(vehiclesresult);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <ScreenLayout showFooter={true} currentRoute={"Home"}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={styles.vehicleContainer}>
          {vehiclesData.length === 0 ? (
            <View style={styles.noVehicleCard}>
              <Text style={styles.noVehicleText}>
                No se registró ningún vehículo
              </Text>
              <Text style={styles.registerPromptText}>
                Registra tu vehículo ahora!
              </Text>
              <TouchableOpacity
                style={styles.addVehicleIcon}
                onPress={() => navigation.navigate("RegisterVehicle")}
              >
                <Image
                  source={require("@/src/assets/newCar.png")}
                  style={styles.addVehicleIconImage}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.VehicleCard}>
              <View style={styles.VehicleCardHeader}>
                <View style={styles.vehicleCardInfoSection}>
                  <Text style={styles.VehicleText}>
                    {vehiclesData[0]?.name}
                  </Text>
                  <Text style={styles.vehicleInfo}>
                    {vehiclesData[0]?.model} - {vehiclesData[0]?.plate} -{" "}
                    {vehiclesData[0]?.year} - {vehiclesData[0]?.km} km
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Notifications")}
                >
                  <FontAwesome6 name={"bell"} style={styles.bellIcon} />
                </TouchableOpacity>
              </View>
              <Image
                source={require("@/src/assets/volkswagenNegro.png")}
                style={styles.addVehicleIcon}
              />
            </View>
          )}
        </View>

        {/* Sección de Especificaciones */}
        <Text style={styles.sectionTitle}>Especificaciones</Text>
        <View style={styles.sectionDivider} />

        {/* Sección de Advertencias */}
        <Text style={styles.sectionTitle}>Advertencias</Text>
        <View style={styles.sectionDivider} />
      </View>
    </ScreenLayout>
  );
}
