import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Colors from "../Constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../Constants/Button";
import { getAuth, signOut } from "firebase/auth";
import Background from "../assets/BG-moblie.jpg";

export default () => {
  return (
    <ImageBackground source={Background} style={styles.image}>
      <View styles={styles.container}>
        <Button
          text="Log out"
          onPress={() => {
            signOut(getAuth())
              .then(() => {})
              .catch((err) => {});
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    fontSize: 32,
    fontWeight: "200%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
