import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  noVehicleCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  noVehicleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  registerPromptText: {
    fontSize: 14,
    color: "#666666",
    marginTop: 8,
  },
  addVehicleIconTouchContainer: {
    width: "100%",
    height: 250,
  },
  addVehicleIconImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },

  sectionview: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F4A83",
  },
  showMore: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F4A83",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  sectionDivider: {
    marginVertical: 10,
    height: 1,
    backgroundColor: "#CCCCCC",
    marginVertical: 8,
    width: "100%",
  },
  specificationCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  specTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  specInfo: {
    paddingVertical: 16,
    flexDirection: "row",
  },
  specValue: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },

  //with vehicle
  VehicleCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
    alignItems: "center",
  },
  VehicleCardHeader: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vehicleCardInfoSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
    flexShrink: 1,
    width: "80%",
  },
  VehicleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "80%",
  },
  vehicleInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginLeft: 16,
  },
  bellIcon: {
    fontSize: 25,
  },
});

export default styles;
