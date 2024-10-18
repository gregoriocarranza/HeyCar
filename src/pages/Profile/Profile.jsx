import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Button as PaperButton, Card, IconButton } from "react-native-paper";
import styles from "./User.styles";
import ScreenLayout from "../../Components/ScreenLayout";
import * as SecureStore from "expo-secure-store";

const { width: screenWidth } = Dimensions.get("window");

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
            const userDatas = {
              name: "Perfil Generico",
              image: null,
              level: "nivel 1",
              vehicles: [
                {
                  name: "Vehiculo-1",
                  model: "Volvo XC60",
                  plate: "ABC123",
                  year: 2020,
                  km: 50000,
                  image: null,
                },
                {
                  name: "Vehiculo-2",
                  model: "BMW X5",
                  plate: "XYZ789",
                  year: 2021,
                  km: 30000,
                  image: "https://via.placeholder.com/300",
                },
              ],
            };

            setUserData(userDatas);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUser();
  }, []);

  const renderVehicleItem = ({ item, index }) => {
    return (
      <Card key={index} style={styles.vehicleCard}>
        <Card.Cover
          source={
            item?.image
              ? { uri: item.image }
              : require("../../assets/emptyCar.png")
          }
          style={styles.vehicleImage}
        />
        <Card.Actions style={styles.vehicleCardActions}>
          <View style={styles.vehicleCardNameSection}>
            <Text style={styles.vehicleName}>{item.name}</Text>
            <IconButton
              icon="close"
              onPress={() => {}}
              size={10}
              color="red"
              style={styles.closeIcon}
            />
          </View>
          <Text style={styles.vehicleInfo}>
            {item.model} - {item.plate} - {item.year} - {item.km} km
          </Text>
        </Card.Actions>
      </Card>
    );
  };

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

        {/* Información del Vehículo - Carrusel */}
        <Text style={styles.sectionTitle}>Mi/s Vehiculo/s</Text>
        <Carousel
          data={userData?.vehicles || []}
          renderItem={renderVehicleItem}
          width={screenWidth * 0.9}
          height={220}
          mode="left-align"
        />

        {/* Nivel del Usuario */}
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Eres: {userData?.level}</Text>
          <Text style={styles.levelDescription}>
            Seguí participando y cuidando tu vehículo para aumentar tu nivel y
            acceder a beneficios exclusivos.
          </Text>
          <PaperButton
            mode="contained"
            style={styles.levelButton}
            onPress={() => navigation.navigate("UserLevelDetails")}
          >
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
