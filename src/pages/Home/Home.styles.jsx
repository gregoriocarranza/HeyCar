import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

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
    marginVertical: height * 0.02, // Responsive margin
  },
  sectionTitle: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: "bold",
    color: "#1F4A83",
  },
  showMore: {
    fontSize: width * 0.03, // Responsive font size
    fontWeight: "bold",
    color: "#1F4A83",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  sectionDivider: {
    marginVertical: height * 0.01, // Responsive vertical margin
    height: 1,
    backgroundColor: "#CCCCCC",
    width: "100%",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    paddingVertical: height * 0.015, // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
  },

  statusIconContainer: {
    flexDirection: "row",
    width: width * 0.2, // Responsive width
    height: width * 0.1, // Responsive height
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.03, // Responsive margin
  },
  statusImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    paddingHorizontal: width * 0.05,
  },
  statusText: {
    flex: 1,
    fontSize: width * 0.04, // Responsive font size
    fontWeight: "500",
    color: "#333",
  },
  statusLabel: {
    fontSize: width * 0.035, // Responsive font size
    fontWeight: "bold",
    marginLeft: width * 0.02, // Responsive margin
  },

  // with vehicle
  VehicleCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: width * 0.05, // Responsive padding
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
    marginBottom: height * 0.01, // Responsive margin
    flexShrink: 1,
    width: "80%",
  },
  VehicleText: {
    fontSize: width * 0.04, // Responsive font size
    fontWeight: "bold",
    color: "#333333",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "80%",
  },
  vehicleInfo: {
    fontSize: width * 0.035, // Responsive font size
    color: "#666",
    marginTop: height * 0.005, // Responsive top margin
    marginLeft: width * 0.04, // Responsive left margin
  },
  bellIcon: {
    fontSize: width * 0.06, // Responsive icon size
  },
});

export default styles;
