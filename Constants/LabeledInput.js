import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Colors from "../Constants/Colors";

export default ({
  labelStyle,
  label,
  errorMessage,
  inputStyle,
  text,
  onChangeText,
  ...inputProps
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={labelStyle}>{label}</Text>
        <Text style={styles.error}>{errorMessage && `*${errorMessage}`}</Text>
      </View>
      <TextInput
        underlineColorAndroid="transparent"
        selectionColor="transparent"
        style={[styles.input, { outline: "none" }, inputStyle]}
        value={text}
        onChangeText={onChangeText}
        {...inputProps}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 1,
  },
  error: {
    color: Colors.red,
    fontSize: 12,
    marginLeft: 4,
  },
  input: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    paddingLeft: 4,
    fontSize: 24,
    color: Colors.black,
  },
});
