import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#1F4A83",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default styles;
