import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  chatTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerIcon: {
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  senderMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1ecf1",
  },
  receiverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f8d7da",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 5,
    textAlign: "right",
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default styles;
