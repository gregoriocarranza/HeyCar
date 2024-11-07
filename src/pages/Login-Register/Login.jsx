import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./Login&Register";
import * as SecureStore from "expo-secure-store";
import ScreenLayout from "../../Components/ScreenLayout";
import { CommonActions } from "@react-navigation/native";
import LogoTipo from "@/src/assets/images/HeyCarTitle.svg";
import GoogleLogo from "@/src/assets/images/GoogleLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getUserByJWT } from "../../app/Features/User/UserAction";

const { width } = Dimensions.get("window");

function Login({ navigation }) {
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const [formData, setFormData] = useState({
    email: "Gregoriocarranzatorres@gmail.com",
    password: "aws",
  });

  const { user, status, error, errorMessage } = useSelector(
    (state) => state.user
  );

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert("Error", errorMessage);
    }
  }, [errorMessage]);

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Debes completar todos los datos");
      return;
    }

    try {
      const loginResult = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      const userResult = await dispatch(
        getUserByJWT(loginResult.access_token)
      ).unwrap();

      await storeUserData(userResult, loginResult);

      setFormData({ email: "", password: "" });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al iniciar sesión. Inténtalo de nuevo."
      );
    }
  };

  const storeUserData = async (userResult, loginResult) => {
    try {
      await SecureStore.setItemAsync(
        "USER_DATA",
        JSON.stringify({
          userId: userResult.id,
          name: userResult.name,
          image: "-",
          email: userResult.email,
          role: "conductor", //? conductor mecanico
          level: 1,
          tokens: {
            accessToken: loginResult.access_token,
            tokenIssueTime: Date.now(),
            // expiresIn: loginResult.expiresIn,
            // refreshToken: loginResult.refreshToken,
          },
        })
      );
    } catch (error) {
      console.error("Failed to store user data:", error);
      Alert.alert("Error", "No se pudo guardar la información del usuario.");
    }
  };

  return (
    <ScreenLayout showFooter={false} showHeader={false}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.loginContainer}>
          <View style={styles.imageContainer}>
            <LogoTipo width={width * 0.9} height={100} />
          </View>
          <View style={styles.showHeader}>
            <Text style={styles.title}>Inicia Sesión</Text>
            <Text style={styles.subtitle}>
              Ingresa a tu cuenta para continuar
            </Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Correo Electronico"
              required
            />

            <TextInput
              style={styles.input}
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              placeholder="Contraseña"
              required
            />
            <Button title="Iniciar sesión" onPress={handleSubmit} />
          </View>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("PasswordForget")}
          >
            Olvidaste tu contraseña?
          </Text>
          <Text style={styles.footerText}>
            ¿No tienes una cuenta?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Regístrate aquí
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <GoogleLogo style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Continuar con Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

export default Login;
