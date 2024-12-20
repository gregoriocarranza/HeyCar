import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  profileHeader: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 24,
    width: screenWidth,
    justifyContent: "space-evenly",
  },
  profileHeaderInfoContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: 24,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
  },
  icon: {
    marginLeft: 24,
  },
  roleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 55,
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 25,
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el texto
  },
  buttonText: {
    color: "#FFFFFF", // Color del texto en blanco
    fontSize: 16,
    fontWeight: "bold",
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
    marginBottom: 12,
    elevation: 1,
    borderRadius: 10,
    width: screenWidth * 0.8,
  },
  vehicleImage: {
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  vehicleCardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  vehicleCardInfoSection: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  vehicleName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  vehicleInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  closeIcon: {
    backgroundColor: "#ffcccc",
    borderRadius: 20,
    padding: 5,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: screenWidth * 0.9,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007bff",
  },
  inactiveDot: {
    backgroundColor: "#c0c0c0",
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
