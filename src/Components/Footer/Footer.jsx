import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Footer.style";
import FooterButton from "./FooterButton";

const Footer = ({ currentRoute }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FooterButton
        iconName="home"
        label="Inicio"
        isActive={currentRoute === "Home"}
        onPress={() => navigation.navigate("Home")}
      />
      <FooterButton
        iconName="directions-car"
        label="MyCar"
        isActive={currentRoute === "MyCar"}
        onPress={() => navigation.navigate("MyCar")}
      />
      <FooterButton
        iconName="chat-bubble-outline"
        label="Chat-AI"
        isActive={currentRoute === "Chat"}
        onPress={() => navigation.navigate("Chat")}
      />
      <FooterButton
        iconName="group"
        label="Comunidad"
        isActive={currentRoute === "Community"}
        onPress={() => navigation.navigate("Community")}
      />
      <FooterButton
        iconName="account-circle"
        label="Perfil"
        isActive={currentRoute === "Profile"}
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default Footer;
