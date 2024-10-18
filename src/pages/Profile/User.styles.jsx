import { StyleSheet } from "react-native";

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
    marginBottom: 16,
    elevation: 2,
  },
  vehicleImage: {
    height: 150,
  },
  vehicleCardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  vehicleInfo: {
    fontSize: 16,
    flex: 1,
  },
  closeIcon: {
    alignSelf: "flex-start",
  },
  vehicleButton: {
    backgroundColor: "#007bff",
    marginLeft: 16,
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
