import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: "#E6F0FF", // Fondo azul suave
    borderBottomWidth: 1,
    borderBottomColor: "#cfd8dc",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  profileLevel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  nextLevelContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: "#E6F0FF",
    borderRadius: 8,
  },
  nextLevelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  nextLevelText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  achievementsContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
  },
  achievementItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  achievementText: {
    fontSize: 16,
    color: "#333",
  },
  achievementPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  pendingTasksContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pendingTasksTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 8,
  },
  pendingTaskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  pendingTaskText: {
    fontSize: 16,
    color: "#333",
  },
  pendingTaskPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default styles;
