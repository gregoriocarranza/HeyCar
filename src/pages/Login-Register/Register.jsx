import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login&Register";
// import { registerUser } from "../../Features/User/UserAction";
import ScreenLayout from "../../Components/ScreenLayout";

function Register({ navigation }) {
  // const dispatch = useDispatch();
  // const { user, status, error, errorMessage } = useSelector(
  //   (state) => state.user
  // );
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // useEffect(() => {
  //   if (errorMessage) {
  //     Alert.alert("Error", errorMessage);
  //   }
  // }, [errorMessage]);

  // useEffect(() => {
  //   const loadUser = () => {
  //     const userJson = localStorage.getItem("USER");
  //     if (userJson) {
  //       navigation.navigate("Home");
  //     }
  //   };
  //   loadUser();
  // }, []);

  const handleSubmit = async () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    // dispatch(
    //   registerUser({
    //     firstname: formData.firstname,
    //     lastName: formData.lastName || " - ",
    //     email: formData.email,
    //     password: formData.password,
    //     role: formData.role,
    //   })
    // )
    //   .unwrap()
    //   .then((result) => {
    //     setFormData({
    //       firstname: "",
    //       email: "",
    //       password: "",
    //       confirmPassword: "",
    //     });
    //     Alert.alert("Éxito", "Te registraste correctamente");
    //     navigation.navigate("Login");
    //   })
    //   .catch((error) => {
    //     console.error("Register failed:", error);
    //   });
    navigation.navigate("Login");
  };

  return (
    <ScreenLayout showFooter={false} showHeader={false}>
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Registro de usuario</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Nombre de usuario:</Text>
          <TextInput
            style={styles.input}
            value={formData.firstname}
            onChangeText={(text) =>
              setFormData({ ...formData, firstname: text })
            }
            required
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            required
          />

          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            required
          />

          <Text style={styles.label}>Confirmar contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            required
          />
          {/* 
        <Text style={styles.label}>Rol:</Text>
        <Picker
          selectedValue={formData.role}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setFormData({ ...formData, role: itemValue })
          }
        >
          <Picker.Item label="-- Seleccione una opción --" value="" />
          <Picker.Item label="Repositor" value="REPOSIOR" />
          <Picker.Item label="Tecnico" value="TECNICO" />
          <Picker.Item label="Piloto" value="PILOTO" />
        </Picker> */}

          <Button title="Registrar" onPress={handleSubmit} />
        </View>
        <Text style={styles.footerText}>
          ¿Ya tienes una cuenta?
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Entra aquí
          </Text>
        </Text>
      </View>
    </ScreenLayout>
  );
}

export default Register;
