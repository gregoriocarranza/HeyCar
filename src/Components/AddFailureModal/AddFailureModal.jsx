import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./AddFailureModal.style";

export default function AddFailureModal({ visible, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [part, setPart] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const errors = [];
    if (!title) errors.push("Título");
    if (!part) errors.push("Componente");
    if (!description) errors.push("Descripción");
    if (!mileage) errors.push("Kilometraje");

    if (errors.length > 0) {
      alert(`Por favor, completa los siguientes campos: ${errors.join(", ")}`);
      return;
    }

    const failureData = {
      title,
      part,
      description,
      date: date.toISOString().split("T")[0], // Formatear fecha como "YYYY-MM-DD"
      km: parseInt(mileage, 10),
      report_type: "manual",
    };

    onSubmit(failureData);
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
          <Text style={styles.title}>Crear informe de falla</Text>

          <Text style={styles.label}>Título*</Text>
          <TextInput
            style={styles.input}
            placeholder="Título del reporte"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Componente*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: Motor"
            value={part}
            onChangeText={setPart}
          />

          <Text style={styles.label}>Descripción*</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe el problema..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          <Text style={styles.label}>Fecha</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{date.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Kilometraje*</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: 15000"
            value={mileage}
            onChangeText={setMileage}
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
