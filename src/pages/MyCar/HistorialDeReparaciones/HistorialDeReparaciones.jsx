import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Para el icono del calendario
import styles from "./HistorialDeReparaciones.style";
import AddRepairModal from "../../../Components/AddRepairModal/AddRepairModal";
import ScreenLayout from "../../../Components/ScreenLayout";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getVehiclesRepairHistory,
  postVehiclesRepairHistory,
} from "../../../app/Features/Vehicles/VehiclesAction";
import * as SecureStore from "expo-secure-store";
import RNPickerSelect from "react-native-picker-select";

export default function HistorialDeReparaciones() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [service, setService] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [selectedVehicleData, setSelectedVehicleData] = useState({});

  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { vehicles, vehicleRepairHistory, loading, error } = useSelector(
    (state) => state.vehicles
  );

  useEffect(() => {
    const loadHistory = async () => {
      setRefreshing(true);
      try {
        const jsonValue = await SecureStore.getItemAsync("USER_DATA");
        if (jsonValue) {
          dispatch(getVehiclesRepairHistory(selectedVehicleData.id))
            .then((result) => {
              if (vehicleRepairHistory?.length < 0) {
                console.info("No hay info de vehiculos");
                return;
              }
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
    loadHistory();
  }, [selectedVehicleData]);

  const handleDateChange = (type, selectedDate) => {
    if (!selectedDate) {
      setShowEndDatePicker(false);
      setShowStartDatePicker(false);
      return;
    }
    const formattedDate = selectedDate.toISOString().split("T")[0];
    switch (type) {
      case "startDate":
        setStartDate(formattedDate);
        setShowStartDatePicker(false);
        break;
      case "endDate":
        setEndDate(formattedDate);
        setShowEndDatePicker(false);
        break;
      default:
        Alert.alert("Case not supported");
        break;
    }
  };

  const handleAddRepair = (repairData) => {
    // console.log("Nueva reparacion registrada:", repairData);
    dispatch(
      postVehiclesRepairHistory({
        ...repairData,
        repair_vehicle_id: selectedVehicleData.id,
      })
    );
  };

  const renderRepair = ({ item }) => (
    <View style={styles.repairCard}>
      <Text style={styles.repairTitle}>{item?.workshop || item?.part}</Text>
      <Text style={styles.repairDetail}>Mecánico: {item.mechanic}</Text>
      <Text style={styles.repairDetail}>{item.date}</Text>
      <Text style={styles.repairType}>{item.type}</Text>
    </View>
  );

  return (
    <ScreenLayout showFooter={true} currentRoute={"MyCar"}>
      <View style={styles.container}>
        <View style={styles.filterRow}>
          <View style={styles.filterGroup}>
            <Ionicons name="calendar" size={24} color="#000" />
            <TouchableOpacity
              style={styles.filterInput}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text>{startDate || "Inicio"}</Text>
            </TouchableOpacity>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(event, selectedDate) => {
                handleDateChange("startDate", selectedDate);
              }}
            />
          )}

          <Text style={styles.filterSeparator}>–</Text>
          <View style={styles.filterGroup}>
            <TouchableOpacity
              style={styles.filterInput}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text>{endDate || "Fin"}</Text>
            </TouchableOpacity>
          </View>

          {showEndDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(event, selectedDate) => {
                handleDateChange("endDate", selectedDate);
              }}
            />
          )}
        </View>

        <View style={styles.filterRow}>
          <TextInput
            style={styles.filterInput}
            placeholder="Taller"
            value={workshop}
            onChangeText={setWorkshop}
          />
          <TextInput
            style={styles.filterInput}
            placeholder="Servicio"
            value={service}
            onChangeText={setService}
          />
        </View>
        <RNPickerSelect
          onValueChange={(value) => {
            const selectedVehicle = vehicles.find(
              (vehicle) =>
                value === vehicle?.vehicle_name ||
                value === `${vehicle?.brand} ${vehicle?.model}`
            );
            setSelectedVehicleData(selectedVehicle || {});
          }}
          items={
            vehicles?.length > 0
              ? vehicles.map((vehicle) => ({
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
          data={vehicleRepairHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderRepair}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No se encontraron reparaciones.
            </Text>
          }
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.buttonText}>Crear informe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.buttonText}>Exportar</Text>
          </TouchableOpacity>
        </View>

        <AddRepairModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleAddRepair}
        />
      </View>
    </ScreenLayout>
  );
}
