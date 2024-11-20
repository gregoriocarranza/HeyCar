import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  list: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "#e8f0fe",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  detalle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  info: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "column",
    justifyContent: "flex-end",
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

  // Nuevo estilo para el contenedor de botones
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  actionButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#0056b3",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
