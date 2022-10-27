import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import Colors from "../Constants/Colors";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getPlantList } from "../utils/api";
import { deletePlant } from "../utils/api";
import Background from "../assets/BG-moblie.jpg";

const PlantList = ({ title, color, onPress, onDelete, id }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, { backgroundColor: color }]}
    >
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name="leaf-circle-outline"
          size={24}
          color="white"
        />
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="white"></Ionicons>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const renderAddListIcon = (navigation, addPlantToList) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Add", { saveChanges: addPlantToList });
      }}
    >
      <AntDesign
        name="pluscircle"
        size={36}
        color="black"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};
export default ({ navigation }) => {
  const [plantList, setPlantList] = useState([
    { title: "Succulent HC", color: Colors.leafGreen },
  ]);
  const [apiPlants, setApiPlants] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(false);
    getPlantList().then((results) => {
      setApiPlants(results);
    });
  }, [, isDeleted]);

  const addPlantToList = (item) => {
    plantList.push(item);
    setPlantList([...apiPlants]);
  };
  const removePlantFromList = (id) => {
    deletePlant(id);
    setIsDeleted(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddListIcon(navigation, addPlantToList),
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={plantList}
        renderItem={({ item: { title, color }, index }) => {
          return (
            <PlantList
              title={title}
              color={color}
              navigation={navigation}
              onPress={() => {
                navigation.navigate("plantByID", { title, color });
              }}
              onDelete={() => {
                removePlantFromList(index);
              }}
            />
          );
        }}
      /> */}
      <ImageBackground source={Background} style={styles.image}>
        <FlatList
          data={apiPlants}
          renderItem={({ item: { title, color, id, description, img } }) => {
            return (
              <PlantList
                title={title}
                color={color}
                id={id}
                navigation={navigation}
                onPress={() => {
                  navigation.navigate("plantByID", {
                    title,
                    color,
                    description,
                    img,
                  });
                }}
                onDelete={() => {
                  removePlantFromList(id);
                }}
              />
            );
          }}
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
    paddingRight: 15,
    fontSize: 36,
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
