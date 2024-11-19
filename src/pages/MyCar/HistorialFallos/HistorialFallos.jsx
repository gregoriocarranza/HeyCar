import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HistorialFallos() {
  const fallos = [
    {
      id: "1",
      titulo: "Freno de mano",
      kilometraje: "KM 13,243",
      tipoReporte: "Reporte Automático",
      fecha: "8/10/2024",
      estado: "Reportada",
    },
    {
      id: "2",
      titulo: "Pinchadura de rueda delantera derecha",
      kilometraje: "KM 5,243",
      tipoReporte: "Reporte Manual",
      fecha: "29/4/2023",
      estado: "Solucionado",
    },
  ];

  const renderFallo = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.detalle}>{item.kilometraje}</Text>
      <Text style={styles.detalle}>{item.tipoReporte}</Text>
      <View style={styles.footer}>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.estado}>{item.estado}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de fallos</Text>
      </View>
      <FlatList
        data={fallos}
        keyExtractor={(item) => item.id}
        renderItem={renderFallo}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.exportButton}>
        <Text style={styles.exportText}>Exportar</Text>
      </TouchableOpacity>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navActive]}>
          <Ionicons name="car-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#e8f0fe",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detalle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  fecha: {
    fontSize: 14,
    color: "#888",
  },
  estado: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0056b3",
  },
  exportButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#0056b3",
    borderRadius: 8,
    alignItems: "center",
  },
  exportText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navActive: {
    backgroundColor: "#0056b3",
    padding: 10,
    borderRadius: 20,
  },
});
