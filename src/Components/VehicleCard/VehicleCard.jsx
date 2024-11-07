import React from "react";
import { View, Text } from "react-native";
import { Card, IconButton } from "react-native-paper";
import styles from "../../pages/Profile/User.styles";

const VehicleCard = ({ item, index }) => {
  const onRemove = () => {
    console.log(item);
  };
  return (
    <Card key={index} style={styles.vehicleCard}>
      <Card.Cover
        source={
          item?.image
            ? { uri: item.image }
            : require("../../assets/emptyCar.png")
        }
        style={styles.vehicleImage}
      />
      <Card.Actions style={styles.vehicleCardActions}>
        <View style={styles.vehicleCardInfoSection}>
          <Text style={styles.vehicleName}>
            {item?.vehicle_name || `${item.brand} ${item.model}`}
          </Text>
          <Text style={styles.vehicleInfo}>
            {item.brand} - {item.model} - {item.license_plate} - {item.year} -{" "}
            {item.km} km
          </Text>
        </View>
        <IconButton
          icon="close"
          onPress={onRemove}
          size={20}
          color="red"
          style={styles.closeIcon}
        />
      </Card.Actions>
    </Card>
  );
};

export default VehicleCard;
