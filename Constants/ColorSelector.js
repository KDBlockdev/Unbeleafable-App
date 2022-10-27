import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../Constants/Colors";

const ColorButton = ({ onPress, isSelected, color }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.colorButton,
          {
            borderWidth: isSelected ? 5 : 0,
            backgroundColor: color,
          },
        ]}
      ></TouchableOpacity>
    </View>
  );
};

export default ({ selectedColor, colorOptions, onSelect }) => {
  return (
    <View style={styles.container}>
      {colorOptions.map((colorName) => {
        return (
          <ColorButton
            onPress={() => onSelect(Colors[colorName])}
            color={Colors[colorName]}
            isSelected={Colors[colorName] == selectedColor}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: {
    height: 32,
    width: 32,
    borderColor: Colors.lightGray,
    borderRadius: 25,
    margin: 10,
  },
});
