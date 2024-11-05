import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  ViewContainerStyle: {
   paddingHorizontal:16,
   paddingBottom:100
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F4A83",
    marginVertical: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
    textAlign: "justify",
  },
  backButton: {
    marginTop: 30,
    backgroundColor: "#5DACFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
