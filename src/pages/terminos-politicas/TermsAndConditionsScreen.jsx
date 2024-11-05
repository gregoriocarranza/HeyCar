import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./PrivacyPolicy_TermsAndConditions.styles";

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}>
      <View style={styles.ViewContainerStyle}>
        <Text style={styles.title}>Términos y Condiciones</Text>

        <Text style={styles.paragraph}>
          Bienvenido a HeyCar. Al utilizar nuestra aplicación, aceptas los
          siguientes términos y condiciones, que describen los derechos y
          responsabilidades relacionados con el uso de nuestra plataforma.
        </Text>

        <Text style={styles.subtitle}>1. Funcionalidad de la Aplicación</Text>
        <Text style={styles.paragraph}>
          HeyCar proporciona alertas, diagnósticos en tiempo real y
          notificaciones de mantenimiento de vehículos. Estos diagnósticos
          pueden basarse en la información ingresada por el usuario o a través
          del dispositivo OBD (On-Board Diagnostics). Sin el OBD, la app se
          limita a una herramienta de gestión de datos del vehículo, sin
          diagnósticos en tiempo real.
        </Text>

        <Text style={styles.subtitle}>2. Limitaciones de Responsabilidad</Text>
        <Text style={styles.paragraph}>
          Aunque HeyCar busca proporcionar información precisa, los diagnósticos
          ofrecidos no son infalibles. La aplicación está diseñada para asistir
          en cuestiones básicas, pero no reemplaza la evaluación de un mecánico
          profesional. HeyCar no se responsabiliza por daños, pérdidas o
          diagnósticos erróneos que resulten del uso de la app.
        </Text>

        <Text style={styles.subtitle}>3. Recolección y Uso de Datos</Text>
        <Text style={styles.paragraph}>
          Los usuarios pueden almacenar, modificar o eliminar sus datos
          personales en cualquier momento. Utilizamos datos agregados de manera
          anónima para mejorar nuestros servicios, los cuales pueden
          desactivarse en la configuración.
        </Text>

        <Text style={styles.subtitle}>4. Modificaciones del Servicio</Text>
        <Text style={styles.paragraph}>
          Nos reservamos el derecho de modificar o suspender temporalmente el
          acceso a la app o a ciertas funcionalidades sin previo aviso.
        </Text>

        <Text style={styles.subtitle}>
          5. Atención al Cliente y Resolución de Disputas
        </Text>
        <Text style={styles.paragraph}>
          Cualquier queja o inquietud será gestionada por nuestro equipo de
          atención al cliente. Para consultas o problemas, contáctanos en
          [correo electrónico de soporte].
        </Text>

        <Text style={styles.subtitle}>6. Uso Permitido</Text>
        <Text style={styles.paragraph}>
          Las cuentas son individuales, pero cada automóvil registrado puede ser
          administrado por varias cuentas. El acceso compartido no implica la
          cesión de derechos de propiedad o control de la cuenta.
        </Text>

        <Text style={styles.subtitle}>7. Propiedad Intelectual</Text>
        <Text style={styles.paragraph}>
          Todo el contenido, software y gráficos de HeyCar son propiedad
          exclusiva de nuestro equipo y no pueden ser reproducidos sin
          autorización.
        </Text>

        <Text style={styles.subtitle}>8. Cambios en los Términos</Text>
        <Text style={styles.paragraph}>
          Nos reservamos el derecho de actualizar estos Términos y Condiciones
          en cualquier momento, notificando a los usuarios de cualquier cambio.
        </Text>
      </View>
    </ScrollView>
  );
}
