import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./ChatScreen.styles";
import ScreenLayout from "@/src/Components/ScreenLayout";
import { useDispatch, useSelector } from "react-redux";

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { vehicles, loading, error } = useSelector((state) => state.vehicles);
  const [chats, setChats] = useState([
    {
      id: "1",
      vehicle: vehicles[0].vehicle_name,
      message: "Según tus últimos datos...",
      time: "18:51",
      image: require("@/src/assets/emptyCar.png"),
    },
  ]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => navigation.navigate("ChatDetail", { chatId: item.id })}
    >
      <Image source={item.image} style={styles.vehicleImage} />
      <View style={styles.chatInfo}>
        <Text style={styles.vehicleName}>{item.vehicle}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout showFooter={true} currentRoute={"ChatScreen"}>
      <View style={styles.container}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          contentContainerStyle={styles.chatList}
        />
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate("ChatIA")}
        >
          <FontAwesome5 name="robot" size={24} color="#fff" />
          <Text style={styles.chatButtonText}>Chat IA</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default ChatScreen;
