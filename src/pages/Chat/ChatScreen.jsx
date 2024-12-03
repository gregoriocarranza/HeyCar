import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./ChatScreen.styles";
import ScreenLayout from "@/src/Components/ScreenLayout";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const ChatScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { vehicles, loading, error } = useSelector((state) => state.vehicles);
  const [chats, setChats] = useState([
    {
      id: 0,
      vehicle: "Volkswagen Polo 2014",
      message: "Escribime si tenes alguna duda!",
      time: new Date(new Date().setHours(18, 51)).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: require("@/src/assets/VolkswagenPolo.png"),
    },
  ]);
  useEffect(() => {
    if (vehicles.length > 0) {
      vehicles?.forEach((element, index) => {
        setChats((prev) => [
          ...prev,
          {
            id: prev?.length + 1,
            vehicle: element?.vehicle_name,
            message: "",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            image: require("@/src/assets/emptyCar.png"),
          },
        ]);
      });
    }
  }, [isFocused]);
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
