import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RepairHistoryIcon from "@/src/assets/images/MyCarIcons/repairHistoryIcon.svg";
import FailureHistoryIcon from "@/src/assets/images/MyCarIcons/failureHistoryIcon.svg";
import WarningsIcon from "@/src/assets/images/MyCarIcons/warningsIcon.svg";
import RemindersIcon from "@/src/assets/images/MyCarIcons/remindersIcon.svg";
import StatusReportIcon from "@/src/assets/images/MyCarIcons/statusReportIcon.svg";
import RegisterVehicleIcon from "@/src/assets/images/MyCarIcons/registerVehicleIcon.svg";
import styles from "./MyCar.styles";
import ScreenLayout from "@/src/Components/ScreenLayout";

const MyCar = ({ navigation }) => {
  return (
    <ScreenLayout showFooter={true} currentRoute={"MyCar"}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RepairHistory")}
          >
            <RepairHistoryIcon width={40} height={40} />
            <Text style={styles.text}>Historial de reparaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("FailureHistory")}
          >
            <FailureHistoryIcon width={40} height={40} />
            <Text style={styles.text}>Historial de fallos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Warnings")}
          >
            <WarningsIcon width={40} height={40} />
            <Text style={styles.text}>Advertencias</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Reminders")}
          >
            <RemindersIcon width={40} height={40} />
            <Text style={styles.text}>Recordatorios</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("VehicleStatus")}
          >
            <StatusReportIcon width={40} height={40} />
            <Text style={styles.text}>Informe de estado del vehículo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RegisterVehicle")}
          >
            <RegisterVehicleIcon width={40} height={40} />
            <Text style={styles.text}>Registrar otro vehículo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default MyCar;
