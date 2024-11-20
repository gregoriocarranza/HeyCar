import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import styles from "./AddFailureModal.style";

export default function AddFailureModal({ visible, onClose, onSubmit }) {
  const [component, setComponent] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState("");
  const [status, setStatus] = useState("Reportado");

  const handleSubmit = () => {
    const failureData = {
      component,
      description,
      date,
      mileage,
      status,
    };
    onSubmit(failureData);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Crear informe de falla</Text>

          <Text style={styles.label}>Componente fallado</Text>
          <TextInput
            style={styles.input}
            placeholder="Motor"
            value={component}
            onChangeText={setComponent}
          />

          <Text style={styles.label}>Descripción*</Text>
          <TextInput
            style={styles.input}
            placeholder="Cambio de piston por fisura..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Fecha*</Text>
              <TextInput
                style={styles.input}
                placeholder="15/10/2024"
                value={date}
                onChangeText={setDate}
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Kilometraje*</Text>
              <TextInput
                style={styles.input}
                placeholder="Reparación"
                value={mileage}
                onChangeText={setMileage}
              />
            </View>
          </View>

          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.input}
            placeholder="Reportado"
            value={status}
            onChangeText={setStatus}
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
