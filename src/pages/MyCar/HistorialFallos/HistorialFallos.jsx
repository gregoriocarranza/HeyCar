import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ScreenLayout from "../../../Components/ScreenLayout";
import styles from "./HistorialFallos.styles";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import {
  getVehicles,
  getVehiclesFailureHistory,
  postVehiclesFailureHistory,
} from "../../../app/Features/Vehicles/VehiclesAction";
import RNPickerSelect from "react-native-picker-select";
import { Capitalize } from "../../../utils/StringsChangers";
import AddFailureModal from "../../../Components/AddFailureModal/AddFailureModal";

export default function HistorialFallos({ navigation }) {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedVehicleData, setSelectedVehicleData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {
    vehicles: vehiclesData,
    vehicleHistory,
    loading,
    error,
  } = useSelector((state) => state.vehicles);

  const loadVehicleHistory = async () => {
    setRefreshing(true);
    try {
      if (selectedVehicleData?.id) {
        dispatch(getVehiclesFailureHistory(selectedVehicleData.id));
      }
    } catch (error) {
      console.error("Error loading vehicle data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadVehicleHistory();
  }, [selectedVehicleData]);

  useEffect(() => {
    const loadUser = async () => {
      setRefreshing(true);
      try {
        const jsonValue = await SecureStore.getItemAsync("USER_DATA");
        if (jsonValue) {
          dispatch(getVehicles())
            .then((result) => {
              if (vehiclesData?.length < 0) {
                console.info("No hay vehiculos");

                return;
              }
              setSelectedVehicleData(vehiclesData[0]);
            })
            .catch((error) => {
              console.error("Register failed:", error);
            });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setRefreshing(false);
      }
    };
    loadUser();
  }, [isFocused]);

  const handleAddFailure = (failureData) => {
    console.log("Nueva falla registrada:", {
      ...failureData,
      vehicle_id: selectedVehicleData?.id,
    });
    dispatch(
      postVehiclesFailureHistory({
        ...failureData,
        vehicle_id: selectedVehicleData?.id,
      })
    );
  };

  const renderFallo = ({ item }) => {
    const date = new Date(item?.created_at);
    const formattedDate = `${date.getUTCDate()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;

    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.titulo}>{item?.title}</Text>
          <Text style={styles.detalle}>{item?.km} Km</Text>
          <Text style={styles.detalle}>
            Tipo de reporte: {Capitalize(item?.report_type)}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.fecha}>{formattedDate}</Text>
          <Text style={styles.estado}>
            {item?.fixed ? "Solucionado" : "Reportado"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenLayout showFooter={true} currentRoute={"MyCar"}>
      <View style={styles.container}>
        <AddFailureModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddFailure}
        />
        <RNPickerSelect
          onValueChange={(value) => {
            const selectedVehicle = vehiclesData.find(
              (vehicle) =>
                value === vehicle?.vehicle_name ||
                value === `${vehicle?.brand} ${vehicle?.model}`
            );
            setSelectedVehicleData(selectedVehicle || {});
          }}
          items={
            vehiclesData?.length > 0
              ? vehiclesData.map((vehicle) => ({
                  label:
                    vehicle?.vehicle_name ||
                    `${vehicle?.brand} ${vehicle?.model}`,
                  value:
                    vehicle?.vehicle_name ||
                    `${vehicle?.brand} ${vehicle?.model}`,
                }))
              : [{ label: "No hay vehículos disponibles", value: null }]
          }
          value={
            selectedVehicleData?.vehicle_name ||
            `${selectedVehicleData?.brand} ${selectedVehicleData?.model}`
          }
          style={{
            inputAndroid: styles.pickerInput,
            inputIOS: styles.pickerInput,
          }}
          placeholder={{
            label: "Selecciona un vehículo",
            value: null,
          }}
        />

        <FlatList
          data={vehicleHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderFallo}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadVehicleHistory}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay fallas registradas.</Text>
            </View>
          }
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Añadir Falla</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Exportar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
}
