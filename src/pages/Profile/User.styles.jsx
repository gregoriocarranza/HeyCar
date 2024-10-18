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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  vehicleCardNameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  vehicleName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },

  vehicleInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  closeIcon: {
    width: 18,
    height: 18,
    backgroundColor: "#ffcccc",
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
