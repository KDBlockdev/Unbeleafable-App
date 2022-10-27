import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Colors from "../Constants/Colors";
import ColorSelector from "../Constants/ColorSelector";
import { addPlant } from "../utils/api";

const colorList = [
  "leafGreen",
  "leafLightGreen",
  "leafDarkGreen",
  "blue",
  "teal",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blueGray",
];

export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(
    route.params.color || Colors.leafLightGreen
  );
  const [isValid, setIsValid] = useState(true);
  const [added, setAdded] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.label}>Plant Name:</Text>
          {!isValid && (
            <Text style={{ color: Colors.red, fontSize: 10 }}>
              * Plant Name Cannot be empty
            </Text>
          )}
        </View>
        <View>
          <TextInput
            underlineColorAndroid={"transparent"}
            selectionColor={"transparent"}
            autoFocus={true}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setIsValid(true);
            }}
            placeholder={"New Plant Name"}
            maxLength={30}
            style={[styles.input, { outline: "none" }]}
          />
        </View>
        <View>
          <Text style={styles.label}>Color Select:</Text>
          <ColorSelector
            onSelect={(color) => {
              setColor(color);
              navigation.dispatch(CommonActions.setParams({ color }));
            }}
            selectedColor={color}
            colorOptions={colorList}
          />
        </View>
        <View>
          <Text style={styles.label}>description of plant:</Text>
          {!isValid && (
            <Text style={{ color: Colors.red, fontSize: 10 }}>
              * Cannot be empty
            </Text>
          )}
          <TextInput
            underlineColorAndroid={"transparent"}
            selectionColor={"transparent"}
            autoFocus={true}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setIsValid(true);
            }}
            placeholder={"description of your Plant"}
            style={[styles.input, { outline: "none" }]}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            if (title.length > 1) {
              setIsValid(true);
              setAdded(true);
              route.params.saveChanges({ title, color });
              addPlant(title, description, color);
            } else {
              setIsValid(false);
            }
            // navigation.dispatch(CommonActions.goBack());
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Save new Plant
          </Text>
        </TouchableOpacity>
        {added ? (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              navigation.navigate("Unbeleafable");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Return to Plants
            </Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    color: Colors.darkGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontsize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colors.leafLightGreen,
    height: 60,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
  },
  label: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 7,
  },
});
