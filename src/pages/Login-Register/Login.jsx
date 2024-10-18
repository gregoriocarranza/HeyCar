import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { getUserByJWT, loginUser } from "../../Features/User/UserAction";
import styles from "./Login&Register";
import * as SecureStore from "expo-secure-store";
import ScreenLayout from "../../Components/ScreenLayout";
import { CommonActions } from "@react-navigation/native";

function Login({ navigation }) {
  // const dispatch = useDispatch();
  // const { user, status, error, errorMessage } = useSelector(
  //   (state) => state.user
  // );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [formData, setFormData] = useState({
  //   email: "example@example.com",
  //   password: "securePassword123",
  // });

  // useEffect(() => {
  //   if (errorMessage) {
  //     Alert.alert("Error", errorMessage);
  //   }
  // }, [errorMessage]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // if (!formData.email || !formData.password) {
    //   Alert.alert("Debes completar todos los datos");
    //   return;
    // }

    try {
      // const loginResult = await dispatch(
      //   loginUser({
      //     email: formData.email,
      //     password: formData.password,
      //   })
      // ).unwrap();

      // const userResult = await dispatch(
      //   getUserByJWT(loginResult.accessToken)
      // ).unwrap();

      // await storeUserData(userResult, loginResult);
      await SecureStore.setItemAsync(
        "USER_DATA",
        JSON.stringify({
          userUuid: "9956d221-980d-47dd-ae10-dea21d13fe35",
          name: "Jhon",
          lastname: "Doe",
          image: "-",
          email: formData.email,
          role: "User",
          level: 1,
          // tokens: {
          //   accessToken: loginResult.accessToken,
          //   tokenIssueTime: Date.now(),
          //   expiresIn: loginResult.expiresIn,
          //   refreshToken: loginResult.refreshToken,
          // },
        })
      );
      setFormData({ email: "", password: "" });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } catch (error) {
      console.error("Login failed:", error);
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
          userUuid: userResult.userUuid,
          name: userResult.name,
          lastname: userResult.lastname,
          image: userResult.image,
          email: formData.email,
          role: userResult.role,
          tokens: {
            accessToken: loginResult.accessToken,
            tokenIssueTime: Date.now(),
            expiresIn: loginResult.expiresIn,
            refreshToken: loginResult.refreshToken,
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
      <View style={styles.loginContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/user.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            required
          />
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            required
          />
          <Button title="Iniciar sesión" onPress={handleSubmit} />
        </View>
        <Text style={styles.footerText}>
          ¿No tienes una cuenta?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Regístrate aquí
          </Text>
        </Text>
      </View>
    </ScreenLayout>
  );
}

export default Login;
