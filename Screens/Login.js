import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Colors from "../Constants/Colors";
import Button from "../Constants/Button";
import LabeledInput from "../Constants/LabeledInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Background from "../assets/BG-moblie.jpg";
import validator from "validator";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  Firestore,
} from "firebase/firestore";

const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    }),
  };
  return isValid;
};

const createAccount = (email, password) => {
  createUserWithEmailAndPassword(getAuth(), email, password).then((cred) => {});
};

const login = (email, password) => {
  signInWithEmailAndPassword(getAuth(), email, password).then((cred) => {});
};

export default () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [reenterPasswordField, setReenterPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Background} style={styles.image}>
        <Text style={styles.header}>Welcome to the Unbeleafable App </Text>
        <MaterialCommunityIcons
          style={styles.icon}
          name="leaf-circle-outline"
          size={60}
          color={Colors.leafDarkGreen}
        />
        <Text style={styles.header}> Please login</Text>
        <View style={{ flex: 1.5 }}>
          <LabeledInput
            label="Email"
            text={emailField.text}
            onChangeText={(text) => {
              setEmailField({ text });
            }}
            errorMessage={emailField.errorMessage}
            labelStyle={styles.label}
            autoCompleteType={"email"}
          />
          {/* password */}
          <LabeledInput
            label="Password"
            text={passwordField.text}
            onChangeText={(text) => {
              setPasswordField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passwordField.errorMessage}
            labelStyle={styles.label}
            autoCompleteType={"password"}
          />
          {/* reenter Password */}
          {isCreateMode && (
            <LabeledInput
              label="Re-Enter Password"
              text={reenterPasswordField.text}
              onChangeText={(text) => {
                setReenterPasswordField({ text });
              }}
              secureTextEntry={true}
              errorMessage={reenterPasswordField.errorMessage}
              labelStyle={styles.label}
            />
          )}
          {/* New user/ new account */}
          <TouchableOpacity
            onPress={() => {
              setIsCreateMode(!isCreateMode);
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: Colors.blue,
                fontSize: 24,
              }}
            >
              {isCreateMode
                ? "Already have an account?"
                : "Create a new account"}
            </Text>
          </TouchableOpacity>
          <Button
            onPress={() => {
              const isValid = validateFields(
                emailField.text,
                passwordField.text
              );
              let isAllValid = true;
              if (!isValid.email) {
                emailField.errorMessage = "Please Enter a valid email";
                setEmailField({ ...emailField });
                isAllValid = false;
              }
              if (!isValid.password) {
                passwordField.errorMessage =
                  "Password must contain at least 6 Characters, containing numbers and capital letters";
                setPasswordField({ ...passwordField });
                isAllValid = false;
              }
              if (
                isCreateMode &&
                reenterPasswordField.text != passwordField.text
              ) {
                reenterPasswordField.errorMessage = "Passwords don't match";
                setReenterPasswordField({ ...reenterPasswordField });
                isAllValid = false;
              }
              if (isAllValid) {
                isCreateMode
                  ? createAccount(emailField.text, passwordField.text)
                  : login(emailField.text, passwordField.text);
              }
            }}
            buttonStyle={{ backgroundColor: Colors.leafDarkGreen }}
            text={isCreateMode ? "Create Account" : "Login"}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// ERROR messages too small
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    color: Colors.black,
    alignSelf: "center",
  },
  label: {
    paddingTop: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
