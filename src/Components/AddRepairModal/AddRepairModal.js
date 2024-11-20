import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import styles from "./AddRepairModal.style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

export default function AddRepairModal({ visible, onClose, onSubmit }) {
  const [part, setPart] = useState("");
  const [description, setDescription] = useState("");
  const [repairType, setRepairType] = useState("repair");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedVehicleData, setSelectedVehicleData] = useState({});
  const { vehicles, vehicleHistory, loading, error } = useSelector(
    (state) => state.vehicles
  );

  const handleSubmit = () => {
    const errors = [];
    if (!part) errors.push("Componente");
    if (!description) errors.push("Descripción");
    if (!date) errors.push("Fecha");
    if (!cost) errors.push("Costo");
    if (!selectedVehicleData.id) errors.push("Vehículo");

    if (errors.length > 0) {
      alert(`Por favor, completa los siguientes campos: ${errors.join(", ")}`);
      return;
    }

    const repairData = {
      date: date.toISOString(), // Fecha en formato ISO 8601
      part,
      description,
      cost: parseFloat(cost), // Convertir a número
      repair_vehicle_id: selectedVehicleData.id,
      type: repairType,
    };

    onSubmit(repairData);
    onClose();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Crear informe de reparación</Text>
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
          <Text style={styles.label}>Componente*</Text>
          <TextInput
            style={styles.input}
            placeholder="Motor"
            value={part}
            onChangeText={setPart}
          />

          <Text style={styles.label}>Descripción*</Text>
          <TextInput
            style={styles.input}
            placeholder="Cambio de pistón por fisura..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Fecha</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{date.toISOString().split("T")[0]}</Text>
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={handleDateChange}
              />
            )}
          </View>

          <Text style={styles.label}>Costo de la reparación*</Text>
          <TextInput
            style={styles.input}
            placeholder="$477.364"
            value={cost}
            onChangeText={setCost}
            keyboardType="numeric"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
