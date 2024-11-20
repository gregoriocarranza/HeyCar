import { StyleSheet } from "react-native";

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
  list: {
    flexGrow: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default styles;
