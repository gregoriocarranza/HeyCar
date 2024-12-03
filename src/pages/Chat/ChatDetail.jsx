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
import { useSelector } from "react-redux";

const ChatDetailScreen = ({ route, navigation }) => {
  const { user, loading, error } = useSelector((state) => state.user);
  const { chatTitle, chatImage } = route.params;
  const [messages, setMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([
    {
      text: `Hola ${
        user?.name || "Santy"
      }, con la información que tengo, parece que el estado del motor es crítico. Podría tratarse de un problema con la correa de distribución o algo relacionado con el sistema de arranque. ¿Qué has intentado hacer hasta ahora?`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: false,
    },
    {
      text: "Entiendo. Es posible que esos intentos hayan agravado el problema. Te recomendaría que no intentes moverlo más. Lo mejor sería llamar a una grúa para evitar daños adicionales.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: false,
    },
    {
      text: "Puede ser grave, pero si tomas acción ahora, podrías reducir los daños. Llámale a tu mecánico lo antes posible. Si necesitas ayuda para contactar a alguien, puedo asistirte.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: false,
    },
    {
      text: "¡De nada! Espero que soluciones esto rápido y que tengas un viaje tranquilo.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: false,
    },
  ]);
  console.log(user);

  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
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

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...aiMessages[0],
          id: (prevMessages.length + 1).toString(),
        },
      ]);
    }, 3000);
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
