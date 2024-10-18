import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  editProfileButton: {
    backgroundColor: "#007bff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#003366",
  },
  vehicleCard: {
    alignSelf: "center",
    marginBottom: 12, // Reducido para tener menos separación entre cards
    elevation: 1, // Reducida la sombra para menos prominencia
    borderRadius: 10, // Añadido para un aspecto más limpio
    width: screenWidth * 0.8,
    // height: 150,
  },
  vehicleImage: {
    height: 120, // Reducido para hacer el card más compacto
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  vehicleCardActions: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "left",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  vehicleCardNameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  vehicleInfo: {
    fontSize: 14, // Reducido el tamaño para hacer el texto más compacto
    color: "#333", // Color más suave para menos prominencia
  },
  closeIcon: {
    color: "#ff0000",
    width: 15,
    height: 15,
  },
  levelContainer: {
    marginVertical: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius: 8,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  levelDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  levelButton: {
    backgroundColor: "#007bff",
    alignSelf: "flex-start",
  },
  addVehicleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  addVehicleText: {
    fontSize: 16,
    color: "#003366",
    marginLeft: 8,
  },
});

export default styles;
