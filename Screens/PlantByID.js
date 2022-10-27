import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Switch,
  ImageBackground,
} from "react-native";
import Colors from "../Constants/Colors";
import ExamplePlant from "../assets/PLANTIE.jpg";
import { Ionicons } from "@expo/vector-icons";
import Background from "../assets/BG-moblie.jpg";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import storage from "@react-native-async-storage/async-storage";

export default (title, description, id) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [wateringOn, setWateringOn] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const plantName = title.route.params.title;
  const plantDescription = title.route.params.description;
  const plantImg = title.route.params.img;
  const examplePlant = ExamplePlant;

  {
    /* Notifications */
  }
  /*
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    const getPermissions = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Enable push notifications to use the app!");
          await storage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem("expopushtoken", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };
    getPermissions();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
*/
  const getNote = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Unbeleafable",
        body: "One of your plants need watering!",
        data: { data: "data" },
      },
      trigger: { seconds: 1 },
    });
    setWateringOn(false);
  };
  //End
  return (
    <ImageBackground source={Background} style={styles.image}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.picContainer}>
            <Image
              source={plantImg ? { uri: plantImg } : ExamplePlant}
              style={{
                width: 305,
                height: 195,
                borderRadius: 80,
                borderWidth: 2,
                borderColor: Colors.darkGray,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
          <Text style={styles.title}>Plant's Name:</Text>
          <View style={styles.careContainer}>
            <Text style={styles.containerText}>{plantName}</Text>
          </View>
          <View style={styles.careWrapper}>
            <View style={styles.careContainer}>
              <Text style={styles.containerText}>About {plantName}</Text>
              <Text style={styles.containerLittleText}>{plantDescription}</Text>
            </View>
          </View>
          <View style={styles.careWrapper}>
            <View style={styles.careContainer}>
              <Text style={styles.containerText}>
                Water every 1 week for this Plant
              </Text>
              <View style={styles.careContainer}>
                <Text style={styles.containerText}>
                  Turn on notifications?:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setWateringOn(true);
                    //getNote();
                  }}
                  style={{
                    backgroundColor: wateringOn ? Colors.blue : Colors.red,
                    color: "white",
                    padding: 10,
                    color: "white",
                  }}
                >
                  <Text style={styles.containerText}>
                    {!wateringOn
                      ? "Remind me for next watering?"
                      : "Reminder Set!"}
                  </Text>
                  <Ionicons
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    name="water-outline"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
  containerText: {
    color: "white",
    fontSize: 20,
  },
  containerLittleText: {
    color: "white",
    fontSize: 16,
  },
  plantDesc: {
    marginTop: 5,
    fontSize: 20,
    color: Colors.gray,
    fontStyle: "italic",
  },
  picContainer: {
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: Colors.cream,
    shadowColor: Colors.darkGray,
    shadowOffset: {
      width: 1,
      height: 9,
    },
    shadowOpacity: 0.3,
    shadowRadius: 11.95,
    elevation: 15,
    alignItems: "center",
  },
  careWrapper: {
    flexDirection: "column",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  careContainer: {
    backgroundColor: Colors.blueGray,
    margin: 10,
    width: "70%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 11,
    elevation: 18,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
