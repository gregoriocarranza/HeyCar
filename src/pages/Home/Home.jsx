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
import * as Sentry from "@sentry/react-native";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState({});
  const [vehiclesData, setVehiclesData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedVehicleData, setSelectedVehicleData] = useState({});
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  Sentry.captureMessage("Cargando home");

  useEffect(() => {
    try {
      if (selectedVehicle != "") {
        const vehicleFocused =
          vehiclesData.find((vehicle) => vehicle?.name === selectedVehicle) ||
          {};
        setSelectedVehicleData(vehicleFocused);
      }
    } catch (error) {
      Sentry.captureException("Error filtering the selected vehicle:", error);
      console.error("Error filtering the selected vehicle:", error);
    }
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
        Sentry.captureMessage("Sin vehiculo");
        setVehiclesData([]);
        setSelectedVehicle("");
      }
    } catch (error) {
      Sentry.captureException("Error loading user data:", error);
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
                        onValueChange={(value) => setSelectedVehicle(value)}
                        items={vehiclesData?.map((vehicle) => ({
                          label: vehicle.name,
                          value: vehicle.name,
                        }))}
                        value={selectedVehicle}
                      />
                      <Text style={styles.vehicleInfo}>
                        {selectedVehicleData?.model || "Modelo desconocido"} -
                        {selectedVehicleData?.plate || "Sin patente"} -
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
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Especificaciones</Text>
                  </View>
                  <View style={styles.sectionDivider} />
                  {selectedVehicleData?.specifications?.map((spec, index) => (
                    <View key={index} style={styles.specificationCard}>
                      <Text style={styles.specTitle}>{spec.name}</Text>
                      <View style={styles.specInfo}>
                        <Text style={styles.specValue}>
                          {spec.value} {""}
                        </Text>
                        <Text style={styles.specValue}>{spec.unity}</Text>
                      </View>
                    </View>
                  ))}
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
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
