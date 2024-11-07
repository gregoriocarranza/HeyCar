import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import styles from "./RegisterVehicleForm.styles";
import { useDispatch, useSelector } from "react-redux";
import { registerVehicle } from "../../app/Features/Vehicles/VehiclesAction";

function RegisterVehicleForm({ navigation }) {
  const dispatch = useDispatch();
  const { vehicles, loading, error } = useSelector((state) => state.vehicles);

  const [vehicleData, setVehicleData] = useState({
    vehicle_name: "",
    brand: "",
    model: "",
    vehicle_type: "Truck",
    license_plate: "",
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
        !vehicleData.vehicle_name ||
        !vehicleData.brand ||
        !vehicleData.model ||
        !vehicleData.vehicle_type ||
        !vehicleData.license_plate ||
        !vehicleData.year ||
        !vehicleData.km
      ) {
        Alert.alert("Todos los campos son requeridos");
        return;
      }
      dispatch(registerVehicle(vehicleData))
        .unwrap()
        .then((result) => {
          setVehicleData({
            name: "",
            brand: "",
            model: "",
            vehicle_type: "Truck",
            license_plate: "",
            year: "",
            km: "",
            image: null,
          });
          Alert.alert("Éxito", "Registraste el auto correctamente");
          navigation.goBack();
        })
        .catch((error) => {
          console.error("Register failed:", error);
        });
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
        value={vehicleData.vehicle_name}
        onChangeText={(text) => handleChange("vehicle_name", text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Marca"
        value={vehicleData.brand}
        onChangeText={(text) => handleChange("brand", text)}
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
        onValueChange={(newValue) => handleChange("vehicle_type", newValue)}
        value={vehicleData.vehicle_type}
      >
        <View style={styles.radioButtonRow}>
          <RadioButton value="Truck" />
          <Text style={styles.radioLabel}>Camioneta</Text>
          <RadioButton value="Car" />
          <Text style={styles.radioLabel}>Auto</Text>
          <RadioButton value="Other" />
          <Text style={styles.radioLabel}>Otro</Text>
        </View>
      </RadioButton.Group>

      <TextInput
        label="Patente"
        value={vehicleData.license_plate}
        onChangeText={(text) => handleChange("license_plate", text)}
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
      {/* <TextInput
        label="Imagen para el vehiculo"
        value={vehicleData.image}
        onChangeText={(text) => handleChange("image", text)}
        style={styles.input}
        mode="outlined"
      /> */}

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
