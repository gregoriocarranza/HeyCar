import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },

  loginContainer: {
    width: width * 0.9,
    paddingTop: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  showHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  form: {
    flexDirection: "column",
    width: "90%",
  },
  input: {
    padding: height * 0.015,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#B8BBBD",
    borderRadius: 10,
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
    color: "#6C7278",
  },
  link: {
    marginTop: height * 0.02,

    color: "#5DACFF",
    // textDecorationLine: "underline",
  },

  politicsText: {
    marginTop: height * 0.02,
    textAlign: "center",
    color: "#6C7278",
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
    fontWeight: "500",
  },
  politicsLink: {
    color: "#5DACFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingHorizontal: 5,
  },

  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
