import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import styles from "./ChatDetail.styles";

const ChatDetailScreen = ({ route, navigation }) => {
  const { chatTitle, chatImage } = route.params;

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hola, estoy teniendo un problema con mi automóvil.",
      time: "20:25",
      isSender: true,
    },
    {
      id: "2",
      text: "Sí, estoy leyendo la información hasta el momento de tu automóvil, ¿en qué te puedo ayudar?",
      time: "20:25",
      isSender: false,
    },
    {
      id: "3",
      text: "Se me prendió una luz que no sé cuál es, te mando una foto.",
      time: "20:25",
      isSender: true,
    },
    {
      id: "4",
      image: require("@/src/assets/emptyCar.png"),
      time: "20:25",
      isSender: true,
    },
    {
      id: "5",
      text: "Esa es la luz de la reserva de combustible, intenta ir a la estación de servicio más cercana para poder rellenar el vehículo y no correr el riesgo de quedarte sin combustible mientras manejas.",
      time: "20:25",
      isSender: false,
    },
  ]);

  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: inputText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSender: true,
        },
      ]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isSender ? styles.senderMessage : styles.receiverMessage,
      ]}
    >
      {item.image ? (
        <Image source={item.image} style={styles.messageImage} />
      ) : (
        <Text style={styles.messageText}>{item.text}</Text>
      )}
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={chatImage} style={styles.chatImage} />
        <Text style={styles.chatTitle}>{chatTitle}</Text>
        <View style={{ flexDirection: "row", marginLeft: "auto" }}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("@/src/assets/Background.png")}
        resizeMode="cover"
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
        />
      </ImageBackground>
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="camera"
          size={24}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Escribe algo aquí..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#0056b3" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default ChatDetailScreen;
