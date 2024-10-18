import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ProgressBarAndroid,
} from "react-native";
import { Checkbox } from "react-native-paper";
import styles from "./UserLevelDetails.styles";
import ScreenLayout from "../../../Components/ScreenLayout";

function UserLevelDetails() {
  const achievements = [
    { name: "Cambio de aceite", points: 50, completed: true },
    { name: "Rotar ruedas", points: 40, completed: true },
    { name: "Revisión de frenos", points: 60, completed: true },
    { name: "Cambio de filtro de aire", points: 30, completed: true },
    { name: "Alineación de ruedas", points: 30, completed: true },
    { name: "Cambio de batería", points: 40, completed: true },
    { name: "Carga tu primer vehículo", points: 10, completed: true },
    { name: "Crea un usuario", points: 10, completed: true },
  ];

  const pendingTasks = [
    { name: "Inspección General del Vehículo", points: 70, completed: false },
    { name: "Revisión de Líquidos", points: 40, completed: false },
  ];

  return (
    <ScreenLayout showFooter={true} currentRoute={"Profile"}>
      <ScrollView contentContainerStyle={styles.profileContainer}>
        {/* Header del Perfil */}
        <View style={styles.profileHeader}>
          <Image
            source={require("../../../assets/user.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Perfil Generico</Text>
          <Text style={styles.profileLevel}>Nivel 1 : Conductor Novato</Text>
        </View>

        {/* Siguiente Nivel */}
        <View style={styles.nextLevelContainer}>
          <Text style={styles.nextLevelTitle}>Siguiente nivel:</Text>
          <Text>Nivel 2 : Piloto Cuidadoso</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: "60%" }]} />
          </View>
          <Text style={styles.nextLevelText}>10 pts para el próximo nivel</Text>
        </View>

        {/* Logros */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>Tus logros!</Text>
          {achievements.map((item, index) => (
            <View key={index} style={styles.achievementItem}>
              <Text style={styles.achievementText}>{item.name}</Text>
              <Text style={styles.achievementPoints}>{item.points}pts</Text>
              <Checkbox status={item.completed ? "checked" : "unchecked"} />
            </View>
          ))}
        </View>

        {/* Tareas Pendientes */}
        <View style={styles.pendingTasksContainer}>
          <Text style={styles.pendingTasksTitle}>Tareas pendientes</Text>
          {pendingTasks.map((item, index) => (
            <View key={index} style={styles.pendingTaskItem}>
              <Text style={styles.pendingTaskText}>{item.name}</Text>
              <Text style={styles.pendingTaskPoints}>{item.points}pts</Text>
              <Checkbox status={item.completed ? "checked" : "unchecked"} />
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

export default UserLevelDetails;
