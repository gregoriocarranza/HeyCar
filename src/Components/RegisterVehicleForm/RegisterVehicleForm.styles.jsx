import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    margin: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  input: {
    marginBottom: 12,
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 16,
  },
  submitButton: {
    backgroundColor: "#003366",
    marginVertical: 16,
    paddingVertical: 8,
  },
  cancelButton: {
    borderColor: "#cccccc",
    paddingVertical: 8,
  },
});

export default styles;
