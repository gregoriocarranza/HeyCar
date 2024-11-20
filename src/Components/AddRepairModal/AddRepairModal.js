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

export default function AddRepairModal({ visible, onClose, onSubmit }) {
  const [components, setComponents] = useState("");
  const [description, setDescription] = useState("");
  const [repairType, setRepairType] = useState("");
  const [mechanicName, setMechanicName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [repairCost, setRepairCost] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const errors = [];
    if (!components) errors.push("Componentes revisados");
    if (!description) errors.push("Descripción");
    if (!date) errors.push("Fecha");
    if (!repairType) errors.push("Tipo de informe");
    if (!mechanicName) errors.push("Nombre del mecánico");
    if (!locationAddress) errors.push("Dirección del local");
    if (!repairCost) errors.push("Total de la reparación");

    if (errors.length > 0) {
      alert(`Por favor, completa los siguientes campos: ${errors.join(", ")}`);
      return;
    }

    const repairData = {
      components,
      description,
      date,
      repairType,
      mechanicName,
      locationAddress,
      repairCost: parseFloat(repairCost),
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

          <Text style={styles.label}>Componentes revisados*</Text>
          <TextInput
            style={styles.input}
            placeholder="Motor"
            value={components}
            onChangeText={setComponents}
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
            <View style={styles.halfInput}>
              <Text style={styles.label}>Tipo de informe*</Text>
              <TextInput
                style={styles.input}
                placeholder="Reparación"
                value={repairType}
                onChangeText={setRepairType}
              />
            </View>
          </View>

          <Text style={styles.label}>Nombre del mecánico*</Text>
          <TextInput
            style={styles.input}
            placeholder="Gustavo"
            value={mechanicName}
            onChangeText={setMechanicName}
          />

          <Text style={styles.label}>Dirección del local*</Text>
          <TextInput
            style={styles.input}
            placeholder="Lima 123"
            value={locationAddress}
            onChangeText={setLocationAddress}
          />

          <Text style={styles.label}>Total de la reparación*</Text>
          <TextInput
            style={styles.input}
            placeholder="$477.364"
            value={repairCost}
            onChangeText={setRepairCost}
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
