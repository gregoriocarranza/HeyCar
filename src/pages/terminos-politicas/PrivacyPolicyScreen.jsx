import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./PrivacyPolicy_TermsAndConditions.styles";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}>
      <View style={styles.ViewContainerStyle}>
        <Text style={styles.title}>Política de Privacidad</Text>

        <Text style={styles.paragraph}>
          En Hey Car, respetamos su privacidad y estamos comprometidos a
          proteger los datos personales que compartan con nosotros. Esta
          Política de Privacidad describe cómo recopilamos, usamos, almacenamos
          y protegemos su información.
        </Text>

        <Text style={styles.subtitle}>1. Información que Recopilamos</Text>
        <Text style={styles.paragraph}>
          Recopilamos los siguientes datos personales cuando se registra y
          utiliza nuestra aplicación: nombre, correo electrónico, ubicación,
          patente del automóvil, modelo del vehículo, kilómetros y datos
          técnicos del vehículo.
        </Text>

        <Text style={styles.subtitle}>2. Uso de los Datos</Text>
        <Text style={styles.paragraph}>
          Utilizamos sus datos personales exclusivamente para analizar la
          información del vehículo y devolver diagnósticos preventivos. No
          compartimos sus datos personales con terceros.
        </Text>

        <Text style={styles.subtitle}>3. Almacenamiento de los Datos</Text>
        <Text style={styles.paragraph}>
          Los datos que recopilamos se almacenan en servidores seguros
          proporcionados por Amazon Web Services (AWS). Su información se
          mantendrá almacenada hasta que usted decida eliminarla.
        </Text>

        <Text style={styles.subtitle}>4. Seguridad de la Información</Text>
        <Text style={styles.paragraph}>
          AWS implementa altos estándares de seguridad para proteger sus datos
          contra accesos no autorizados.
        </Text>

        <Text style={styles.subtitle}>5. Derechos del Usuario</Text>
        <Text style={styles.paragraph}>
          Usted tiene derecho a acceder, corregir o eliminar sus datos
          personales en cualquier momento.
        </Text>

        <Text style={styles.subtitle}>6. Edad Mínima</Text>
        <Text style={styles.paragraph}>
          Nuestra aplicación está dirigida exclusivamente a personas mayores de
          18 años. No recopilamos información de menores de 18 años.
        </Text>

        <Text style={styles.subtitle}>7. Cambios en la Política</Text>
        <Text style={styles.paragraph}>
          Nos reservamos el derecho de actualizar esta Política de Privacidad en
          cualquier momento. Notificaremos a los usuarios cuando haya cambios
          significativos.
        </Text>
      </View>
    </ScrollView>
  );
}
