import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import styles from "./RegisterVehicleForm.styles";
import * as SecureStore from "expo-secure-store";

function RegisterVehicleForm({ navigation }) {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    model: "",
    type: "Camioneta",
    plate: "",
    year: "",
    km: "",
    image: null,
  });

  const handleChange = (field, value) => {
    setVehicleData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validación: Verificar que todos los campos estén completos
      if (
        !vehicleData.name ||
        !vehicleData.model ||
        !vehicleData.type ||
        !vehicleData.plate ||
        !vehicleData.year ||
        !vehicleData.km
      ) {
        console.error("Todos los campos son requeridos");
        return;
      }

      const vehiclesJsonValue = await SecureStore.getItemAsync("VEHICLES_DATA");

      let vehicles = [];
      if (vehiclesJsonValue) {
        vehicles = JSON.parse(vehiclesJsonValue);
        if (!Array.isArray(vehicles)) {
          console.error(
            "Error: Los datos de vehículos no están en un formato de arreglo"
          );
          vehicles = [];
        }
      }

      // Agregar el nuevo vehículo al arreglo de vehículos
      vehicles.push(vehicleData);

      // Guardar los datos actualizados de vehículos en el almacenamiento seguro
      await SecureStore.setItemAsync("VEHICLES_DATA", JSON.stringify(vehicles));

      // console.log("Registro del vehículo:", vehicleData);
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar el vehículo:", error);
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* Título del formulario */}
      <Text style={styles.formTitle}>Registra tu vehículo</Text>

      {/* Campos del formulario */}
      <TextInput
        label="Nombre del vehículo"
        value={vehicleData.name}
        onChangeText={(text) => handleChange("name", text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Modelo"
        value={vehicleData.model}
        onChangeText={(text) => handleChange("model", text)}
        style={styles.input}
        mode="outlined"
      />

      {/* Opciones de tipo de vehículo */}
      <RadioButton.Group
        onValueChange={(newValue) => handleChange("type", newValue)}
        value={vehicleData.type}
      >
        <View style={styles.radioButtonRow}>
          <RadioButton value="Camioneta" />
          <Text style={styles.radioLabel}>Camioneta</Text>
          <RadioButton value="Auto" />
          <Text style={styles.radioLabel}>Auto</Text>
          <RadioButton value="Otro" />
          <Text style={styles.radioLabel}>Otro</Text>
        </View>
      </RadioButton.Group>

      {/* Otros Campos */}
      <TextInput
        label="Patente"
        value={vehicleData.plate}
        onChangeText={(text) => handleChange("plate", text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Año"
        value={vehicleData.year}
        onChangeText={(text) => handleChange("year", text)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Kilometraje (Km)"
        value={vehicleData.km}
        onChangeText={(text) => handleChange("km", text)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Imagen para el vehiculo"
        value={vehicleData.image}
        onChangeText={(text) => handleChange("image", text)}
        style={styles.input}
        mode="outlined"
      />

      {/* Botones */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Registra tu auto
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}
      >
        Cancelar
      </Button>
    </View>
  );
}

export default RegisterVehicleForm;
