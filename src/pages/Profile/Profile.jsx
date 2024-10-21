import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Button as PaperButton, Card, IconButton } from "react-native-paper";
import styles from "./User.styles";
import ScreenLayout from "../../Components/ScreenLayout";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import VehicleCard from "../../Components/VehicleCard/VehicleCard";

const { width: screenWidth } = Dimensions.get("window");

function Profile({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [vehiclesData, setVehiclesData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isFocused = useIsFocused();
  const [scrollEnabled, setScrollEnabled] = useState(true);

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
              level: "1",
            };
            setUserData(userDatas);
          }
        }
        const vehiclesJsonValue = await SecureStore.getItemAsync(
          "VEHICLES_DATA"
        );
        if (vehiclesJsonValue) {
          const vehiclesresult = JSON.parse(vehiclesJsonValue);
          if (vehiclesresult) {
            // const vehicles = [
            //   {
            //     name: "Vehiculo-2",
            //     model: "BMW X5",
            //     plate: "XYZ789",
            //     year: 2021,
            //     km: 30000,
            //     image: "https://via.placeholder.com/300",
            //   },
            // ];
            setVehiclesData(vehiclesresult);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUser();
  }, [isFocused]);

  const renderDot = ({ item, index }) => {
    return (
      <View
        style={[
          styles.dot,
          activeIndex === index ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    );
  };

  return (
    <ScreenLayout showFooter={true} currentRoute={"Profile"}>
      <ScrollView
        contentContainerStyle={styles.profileContainer}
        scrollEnabled={scrollEnabled}
      >
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

        <Text style={styles.sectionTitle}>Mi/s Vehiculo/s</Text>
        {vehiclesData.length > 0 ? (
          <>
            <Carousel
              data={vehiclesData}
              renderItem={({ item, index }) => (
                <VehicleCard item={item} index={index} />
              )}
              width={screenWidth * 0.9}
              height={220}
              mode="left-align"
              snapEnabled={true}
              onSnapToItem={(index) => setActiveIndex(index)}
              onScrollBegin={() => setScrollEnabled(false)}
              onScrollEnd={() => setScrollEnabled(true)}
            />

            {/* Indicadores de Paginación */}
            <FlatList
              data={vehiclesData}
              renderItem={renderDot}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              contentContainerStyle={styles.paginationContainer}
            />
          </>
        ) : (
          <Text>No se encontraron vehículos registrados.</Text> // Mensaje cuando no hay vehículos
        )}

        <Text style={styles.sectionTitle}>Tu nivel</Text>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Nivel: {userData?.level}</Text>
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

        <TouchableOpacity
          style={styles.addVehicleContainer}
          onPress={() => navigation.navigate("RegisterVehicle")}
        >
          <IconButton icon="plus" size={24} color="#003366" />
          <Text style={styles.addVehicleText}>Agregar otro vehículo</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
}

export default Profile;
