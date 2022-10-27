import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
import PlantList from "./Screens/PlantList";
import PlantByID from "./Screens/PlantByID";
import PlantAPI from "./Screens/PlantAPI";
import UserSettings from "./Screens/UserSettings";
import CameraSelect from "./Screens/CameraSelect";
import AddNewPlant from "./Screens/AddNewPlant";

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/compat/firestore";
import Login from "./Screens/Login";
import Colors from "./Constants/Colors";
const firebaseConfig = {
  apiKey: "AIzaSyBOLnvOa8255Txv2kSJW0bcjvSZlAshf14",
  authDomain: "unbeleafable-c2e8a.firebaseapp.com",
  databaseURL:
    "https://unbeleafable-c2e8a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "unbeleafable-c2e8a",
  storageBucket: "unbeleafable-c2e8a.appspot.com",
  messagingSenderId: "533251791827",
  appId: "1:533251791827:web:f08abcc07f825db5c66d26",
  measurementId: "G-6RDBEEL1QH",
};

initializeApp(firebaseConfig);

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Unbeleafable login" component={Login} />
    </AuthStack.Navigator>
  );
};
const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Unbeleafable" component={Home} />
      <Stack.Screen name="Your Plants" component={PlantList} />
      <Stack.Screen
        name="plantByID"
        component={PlantByID}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              backgroundColor: route.params.color,
            },
            headerTintColor: "black",
          };
        }}
      />
      <Stack.Screen
        name="Add"
        component={AddNewPlant}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit ${route.params.title} list`
              : "Add new Plant",
            headerStyle: {
              backgroundColor: route.params.colour || Colors.leafLightGreen,
            },
          };
        }}
      />
      <Stack.Screen name="CameraSection" component={CameraSelect} />
      <Stack.Screen name="User Settings" component={UserSettings} />
      <Stack.Screen name="PlantAPI" component={PlantAPI} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (getAuth().currentUser) {
      setIsAuth(true);
    }
    //second half
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isAuth ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

<Stack.Screen
  name="Home"
  component={Home}
  option={{ headerTitle: (props) => <MyTitle {...props} /> }}
/>;
