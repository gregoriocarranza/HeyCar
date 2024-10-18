import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button as PaperButton, Card, IconButton } from "react-native-paper";
import styles from "./User.styles";
import ScreenLayout from "../../Components/ScreenLayout";
import * as SecureStore from "expo-secure-store";

function Profile({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await SecureStore.getItemAsync("USER_DATA");
        if (jsonValue) {
          const result = JSON.parse(jsonValue);
          if (result) {
            // Datos de usuario y vehículo hardcodeados
            const userDatas = {
              name: "Perfil Generico",
              // image: "https://via.placeholder.com/150",
              image: null,
              level: "nivel 1",
              vehicles: [
                {
                  model: "Volvo XC60",
                  plate: "ABC123",
                  year: 2020,
                  km: 50000,
                  // image: "https://via.placeholder.com/300",
                  image: null,
                },
                {
                  model: "BMW X5",
                  plate: "XYZ789",
                  year: 2021,
                  km: 30000,
                  image: "https://via.placeholder.com/300",
                },
              ],
            };

            // Combinamos userData y userData?.vehicle en un solo objeto
            setUserData(userDatas);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <ScreenLayout showFooter={true} currentRoute={"Profile"}>
      <ScrollView contentContainerStyle={styles.profileContainer}>
        {/* Perfil de Usuario */}
        <View style={styles.profileHeader}>
          <Image
            source={
              userData?.image
                ? { uri: userData?.image }
                : require("../../assets/user.png")
            }
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData?.name}</Text>
          <PaperButton
            mode="contained"
            style={styles.editProfileButton}
            onPress={() => setModalVisible(true)}
          >
            Editar perfil
          </PaperButton>
        </View>

        {/* Información del Vehículo */}
        <Text style={styles.sectionTitle}>Mi/s Vehiculo/s</Text>
        {userData?.vehicles?.map((vehicle, index) => (
          <Card key={index} style={styles.vehicleCard}>
            <Card.Cover
              source={
                vehicle?.image
                  ? { uri: vehicle.image }
                  : require("../../assets/emptyCar.png")
              }
              style={styles.vehicleImage}
            />
            <Card.Actions style={styles.vehicleCardActions}>
              <Text style={styles.vehicleInfo}>
                {vehicle.model} - {vehicle.plate} - {vehicle.year} -{" "}
                {vehicle.km} km
              </Text>
              <IconButton
                icon="close"
                onPress={() => {}}
                size={24}
                color="red"
                style={styles.closeIcon}
              />
            </Card.Actions>
            <Card.Actions>
              <PaperButton mode="contained" style={styles.vehicleButton}>
                Ver información
              </PaperButton>
            </Card.Actions>
          </Card>
        ))}

        {/* Nivel del Usuario */}
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Eres: {userData?.level}</Text>
          <Text style={styles.levelDescription}>
            Seguí participando y cuidando tu vehículo para aumentar tu nivel y
            acceder a beneficios exclusivos.
          </Text>
          <PaperButton mode="contained" style={styles.levelButton}>
            Mi nivel
          </PaperButton>
        </View>

        {/* Agregar otro vehículo */}
        <View style={styles.addVehicleContainer}>
          <IconButton icon="plus" size={24} color="#003366" />
          <Text style={styles.addVehicleText}>Agregar otro vehículo</Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

export default Profile;
