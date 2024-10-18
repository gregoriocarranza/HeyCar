// FooterButton.js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Footer.style";

const FooterButton = ({ iconName, label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={isActive ? styles.iconWrapperLarge : styles.iconWrapperSmall}
      onPress={onPress}
    >
      <MaterialIcons
        name={iconName}
        style={isActive ? styles.iconLarge : styles.iconSmall}
      />
      {isActive && <Text style={styles.buttonText}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default FooterButton;
