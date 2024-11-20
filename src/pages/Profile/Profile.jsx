import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Button as PaperButton, Card, IconButton } from "react-native-paper";
import styles from "./User.styles";
import ScreenLayout from "../../Components/ScreenLayout";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import VehicleCard from "../../Components/VehicleCard/VehicleCard";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../app/Features/Vehicles/VehiclesAction";
import registerForPushNotificationsAsync from "../../utils/notificationPermission";
import { saveNotification } from "../../app/Features/Notification/NotificationAction";

const { width: screenWidth } = Dimensions.get("window");

function Profile({ navigation }) {
  const dispatch = useDispatch();
  const {
    vehicles: vehiclesData,
    loading,
    error,
  } = useSelector((state) => state.vehicles);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
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
            setUserData({ ...result, image: null, level: "1" });
            dispatch(getVehicles());
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUser();
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      SecureStore.deleteItemAsync("USER_DATA");
      SecureStore.deleteItemAsync("NOTIFICATION_DATA");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta de nuevo.");
    }
  };

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

  const changeType = async () => {
    try {
      const data = await registerForPushNotificationsAsync("EXPO");
      Alert.alert("Data", JSON.stringify(data));
      dispatch(saveNotification(data))
        .then(async (result) => {
          SecureStore.setItem(
            "NOTIFICATION_DATA",
            JSON.stringify({
              notification_token: result.payload.notification_token,
              notification_type: result.payload.notification_type,
            })
          );

          console.log("notification token saved");
        })
        .catch((error) => {
          console.error("Notification persisting error:", error);
        });
    } catch (error) {
      Alert.alert("Error", `Error al enviar el token: ${error.message}`);
    }
  };

  return (
    <ScreenLayout showFooter={true} currentRoute={"Profile"}>
      <ScrollView
        contentContainerStyle={styles.profileContainer}
        scrollEnabled={scrollEnabled}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderInfoContainer}>
            <Image
              source={
                userData?.image
                  ? { uri: userData?.image }
                  : require("../../assets/user.png")
              }
              style={styles.profileImage}
            />
            {/* <View style={styles.roleContainer}>
              <Text style={styles.roleText}>Rol: {userData?.role}</Text>
              {getIcon(userData?.role)}
            </View> */}
          </View>

          <View style={styles.profileHeaderInfoContainer}>
            <Text style={styles.profileName}>{userData?.name}</Text>
            <PaperButton
              mode="contained"
              style={styles.editProfileButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}> Editar perfil</Text>
            </PaperButton>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Icon
                name="logout"
                size={18}
                color="#FFFFFF"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Tipo de Token: EXPO</Text>
          <Button title="Enviar Token" onPress={changeType} />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

export default Profile;
