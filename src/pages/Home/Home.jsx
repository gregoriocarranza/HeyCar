import ScreenLayout from "@/src/Components/ScreenLayout";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import styles from "./Home.styles";
import RNPickerSelect from "react-native-picker-select";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [vehiclesData, setVehiclesData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedVehicleData, setSelectedVehicleData] = useState({});
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  // <script src="http://localhost:8097"></script>;

  useEffect(() => {
    const vehicleFocused = vehiclesData.find(
      (vehicle) => vehicle.name === selectedVehicle
    );
    setSelectedVehicleData(vehicleFocused);
  }, [selectedVehicle]);

  const loadUser = async () => {
    setRefreshing(true);
    try {
      const jsonValue = await SecureStore.getItemAsync("USER_DATA");
      if (jsonValue) {
        const result = JSON.parse(jsonValue);
        setUserData(result);
      }
      const vehiclesJsonValue = await SecureStore.getItemAsync("VEHICLES_DATA");
      if (vehiclesJsonValue) {
        const vehiclesresult = JSON.parse(vehiclesJsonValue);
        setVehiclesData(vehiclesresult);
        setSelectedVehicle(vehiclesresult[0]?.name);
      } else {
        setVehiclesData([]);
        setSelectedVehicle("");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [isFocused]);

  return (
    <ScreenLayout showFooter={true} currentRoute={"Home"}>
      <ScrollView
        contentContainerStyle={{ flex: 1, paddingHorizontal: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadUser()}
          />
        }
      >
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
              <View style={styles.VehicleCard}>
                <View style={styles.VehicleCardHeader}>
                  <View style={styles.vehicleCardInfoSection}>
                    <RNPickerSelect
                      onValueChange={(value) => setSelectedVehicle(value)}
                      items={vehiclesData.map((vehicle) => ({
                        label: vehicle.name,
                        value: vehicle.name,
                      }))}
                      value={selectedVehicle}
                    />
                    <Text style={styles.vehicleInfo}>
                      {selectedVehicleData?.model} -{" "}
                      {selectedVehicleData?.plate} - {selectedVehicleData?.year}{" "}
                      - {selectedVehicleData?.km} km
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
                      ? { uri: selectedVehicleData.image }
                      : require("../../assets/emptyCar.png")
                  }
                  style={styles.addVehicleIconImage}
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
      </ScrollView>
    </ScreenLayout>
  );
}
