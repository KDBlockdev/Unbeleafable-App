import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import Background from "../assets/BG-moblie.jpg";
import Plantie from "../assets/PLANTIE.jpg";
import Colors from "../Constants/Colors";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const ListButtons = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}> {title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>{iconChoice(icon)}</View>
    </TouchableOpacity>
  );
};
const iconChoice = (icon) => {
  if (icon === "leaf-circle-outline") {
    return <MaterialCommunityIcons name={icon} size={60} color="white" />;
  } else {
    return (
      <Feather
        name={icon}
        size={45}
        color="white"
        style={{ paddingRight: 5 }}
      />
    );
  }
};
export default ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Background} style={styles.image}>
        <ListButtons
          title="My E-Garden"
          onPress={() => {
            navigation.navigate("Your Plants");
          }}
          icon="leaf-circle-outline"
        />

        <ListButtons
          title="Take a Picture"
          onPress={() => {
            navigation.navigate("CameraSection");
          }}
          icon="camera"
        />

        <ListButtons
          title="Search your plant!"
          onPress={() => {
            navigation.navigate("PlantAPI");
          }}
          icon="search"
        />

        <ListButtons
          title="Settings"
          onPress={() => {
            navigation.navigate("User Settings");
          }}
          icon="settings"
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  itemTitle: {
    fontSize: 24,
    padding: 5,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    backgroundColor: Colors.leafGreen,
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
