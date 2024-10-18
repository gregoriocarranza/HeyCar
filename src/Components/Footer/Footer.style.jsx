import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  iconWrapperSmall: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  iconSmall: {
    fontSize: 24,
    color: "#a0a0a0",
  },
  iconWrapperLarge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#00457C",
  },
  iconLarge: {
    fontSize: 24,
    color: "#ffffff",
    marginRight: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
