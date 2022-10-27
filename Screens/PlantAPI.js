import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImagePickerIOS,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CameraSelect from "./CameraSelect";
import Colors from "../Constants/Colors";
import Background from "../assets/BG-moblie.jpg";
import { addPlant } from "../utils/api";
import Button from "../Constants/Button";
import { async } from "@firebase/util";

const PlantAPI = () => {
  const [plantFile, setPlantFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [isHealthy, setIsHealthy] = useState(true);
  const [healthyData, setHealthyData] = useState({
    name: "Disease name",
    disease_details: { description: "none" },
  });
  const [plantCondition, setPlantCondition] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [added, setAdded] = useState(false);
  const [image, setImage] = useState(null);
  const [beenCalled, setBeenCalled] = useState(false);

  useEffect(() => {
    setPicIdData();
  }, []);

  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   setPlantFile(base64.slice(23));
  // };
  const userImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.uri);
    handler(result);
  };
  const handler = async (result) => {
    //const base64 = await convertBase64(result.uri);
    setPlantFile(result.base64);
  };

  const setPicIdData = () => {
    const data = {
      api_key: "t3oX6F0xKsUW7qol1uNyPg1iiccbNcHw4NmpQbGrENs7vkwUMw",
      images: [plantFile],
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoading(false);
        setSuggestions(responseData.suggestions);
        setBeenCalled(true);
        healthOfPlant();
      });
  };

  const healthOfPlant = () => {
    const data = {
      api_key: "t3oX6F0xKsUW7qol1uNyPg1iiccbNcHw4NmpQbGrENs7vkwUMw",
      images: [plantFile],
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      disease_details: [
        "cause",
        "common_names",
        "classification",
        "description",
        "treatment",
        "url",
      ],
    };

    fetch("https://api.plant.id/v2/health_assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoading(false);
        setHealthyData(responseData.health_assessment.diseases[0]);
        setIsHealthy(responseData.health_assessment.is_healthy);
      });
  };

  //Plant find
  useEffect(() => {
    setAdded(false);
    suggestions.map((x) => {
      plantData.push({
        name: x.plant_name,
        img: "User Image",
        description: x.plant_details.wiki_description.value,
      });
      setPlantData([...plantData]);
    });
  }, [suggestions]);

  // PLant Health
  useEffect(() => {
    let plantCondition = {
      name: healthyData.name || "",
      description: healthyData.disease_details.description || "",
    };
    setPlantCondition[plantCondition];
  }, [healthyData]);

  const FoundPlants = ({ name, description, img }) => {
    return (
      <ScrollView>
        <View
          style={{
            backGroundColor: "blue",
            margin: 10,
            width: "70%",
            flex: 1,
            justifyContent: "center",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View>
            <Text
              style={{
                justifyContent: "center",
                fontSize: 25,
                fontWeight: "500",
                color: Colors.blueGray,
              }}
            >
              Name: {name}
            </Text>
            {/* <Text>Users image:{img}</Text>
          <Image
          source={{ img }}
          style={{
            height: 160,
            width: 305,
          }}
        /> */}
            <Text
              style={{
                justifyContent: "center",
                fontSize: 21,
                fontWeight: "300",
                color: Colors.black,
              }}
            >
              description: {description}
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: Colors.leafLightGreen,
                height: 70,
                width: "90%",
                margin: 16,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 1,
              }}
              onPress={() => {
                if (!added) {
                  addPlant(name, description, "green", image);
                }
                setAdded(true);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  justifyContent: "center",
                }}
              >
                {!added ? "Add to Your plants?" : "Plant added! Check Garden"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  const HealthyOrNot = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.leafLightGreen,
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          Your Plant is:
          {isHealthy
            ? "Healthy"
            : !isHealthy
            ? "Not Healthy"
            : "No Plant Selected"}
        </Text>
        <View>
          {!isHealthy ? (
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
                Oh No we think it could be {healthyData.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  padding: 2,
                }}
              >
                description: {healthyData.disease_details.description}
              </Text>
              <Text></Text>
            </View>
          ) : (
            <View>
              <Text></Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        style={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {/* <ScrollView> */}
        <View>
          <View className="CameraSelect">
            <Button
              text={"Select Image"}
              onPress={() => {
                userImg();
              }}
            ></Button>
            {image ? (
              <View>
                {image && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 2,
                      marginTop: 2,
                    }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 25,
                        padding: 1,
                      }}
                    />
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text></Text>
              </View>
            )}
            <View>
              <HealthyOrNot />
            </View>
          </View>
        </View>
        <View>
          <Button
            buttonStyle={{
              backgroundColor: Colors.leafDarkGreen,
              color: "white",
              padding: 10,
            }}
            text={"Click Me To Find Your Plant!"}
            onPress={() => {
              setPicIdData();
            }}
          ></Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.cream,
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
            borderRadius: 30,
          }}
        >
          <FlatList
            data={plantData}
            renderItem={({ item: { name, img, description } }) => {
              return (
                <View style={{ flex: 1, alignItems: "center" }}>
                  <FoundPlants
                    styles={{ color: "white" }}
                    name={name}
                    description={description}
                    img={img}
                  />
                </View>
              );
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PlantAPI;
