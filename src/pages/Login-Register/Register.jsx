import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import styles from "./Login&Register";
import ScreenLayout from "../../Components/ScreenLayout";
import LogoTipo from "@/src/assets/images/HeyCarTitle.svg";
import { useDispatch } from "react-redux";
import { registerUser } from "../../app/Features/User/UserAction";
const { width } = Dimensions.get("window");

function Register({ navigation }) {
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   firstname: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   role: "",
  // });
  const [formData, setFormData] = useState({
    firstname: "Gregorio",
    lastName: "Carranza Torres",
    email: "Gregoriocarranzatorres@gmail.com",
    password: "aws",
    confirmPassword: "aws",
    role: "",
  });
  const handleSubmit = async () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    dispatch(
      registerUser({
        name: `${formData.firstname} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      })
    )
      .unwrap()
      .then((result) => {
        setFormData({
          firstname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        Alert.alert("Éxito", "Te registraste correctamente");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Register failed:", error);
      });
  };

  return (
    <ScreenLayout showFooter={false} showHeader={false}>
      {/* Agregamos el ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.loginContainer}>
          <View style={styles.imageContainer}>
            <LogoTipo width={width * 0.9} height={100} />
          </View>
          <View style={styles.showHeader}>
            <Text style={styles.title}>Registrate</Text>
            <Text style={styles.subtitle}>Crea una cuenta para continuar!</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={formData.firstname}
              onChangeText={(text) =>
                setFormData({ ...formData, firstname: text })
              }
              placeholder="Nombre"
              required
            />
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData({ ...formData, lastName: text })
              }
              placeholder="Apellido"
              required
            />
            <RadioButton.Group
              onValueChange={(newValue) =>
                setFormData({ ...formData, role: newValue })
              }
              value={formData.role}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioItem}>
                  <RadioButton value="conductor" />
                  <Text style={styles.radioLabel}>Conductor</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="mecanico" />
                  <Text style={styles.radioLabel}>Mecánico</Text>
                </View>
              </View>
            </RadioButton.Group>

            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Correo Electrónico"
              required
            />

            <TextInput
              style={styles.input}
              secureTextEntry
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              placeholder="Contraseña"
              required
            />

            <TextInput
              style={styles.input}
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(text) =>
                setFormData({ ...formData, confirmPassword: text })
              }
              placeholder="Confirmar Contraseña"
              required
            />
            <Button title="Registrar" onPress={handleSubmit} />
          </View>
          <Text style={styles.footerText}>
            ¿Ya tienes una cuenta?{" "}
            <Text
              style={styles.link}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Entra aquí
            </Text>
          </Text>
          <Text style={styles.politicsText}>
            Al registrarte, aceptas nuestros
            <Text
              style={styles.politicsLink}
              onPress={() => {
                navigation.navigate("Terms");
              }}
            >
              Términos y Condiciones
            </Text>
            y nuestra
            <Text
              style={styles.politicsLink}
              onPress={() => {
                navigation.navigate("PrivacyPolicy");
              }}
            >
              Política de Privacidad
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

export default Register;
