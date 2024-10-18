import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  loginContainer: {
    width: width * 0.8,
    padding: 20,
    borderRadius: 8,
    shadowColor: "#FDB827",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "#542583",
    color: "#FDB827",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  heading: {
    fontSize: height * 0.025,
    textAlign: "center",
    marginBottom: height * 0.02,
    color: "#FDB827",
  },
  form: {
    flexDirection: "column",
  },
  label: {
    marginBottom: height * 0.01,
    color: "#FDB827",
  },
  input: {
    padding: height * 0.015,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#542583",
    borderRadius: 4,
    backgroundColor: "#FFF",
    color: "#000",
  },
  picker: {
    width: "100%",
    height: height * 0.07,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#542583",
    borderRadius: 4,
    backgroundColor: "#FFF",
    color: "#000",
  },
  footerText: {
    marginTop: height * 0.02,
    textAlign: "center",
    color: "#FDB827",
  },
  link: {
    color: "#FFF",
    textDecorationLine: "underline",
  },
});

export default styles;
