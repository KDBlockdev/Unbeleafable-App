import { useEffect, useState } from "react";
import { Text, View } from "react-native-web";
import CameraSelect from "./CameraSelect";

const HealthAPI = () => {
  const [plantFile, setPlantFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setPicIdData();
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPlantFile(base64.slice(23));
  };

  const convertBase64 = (files) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const setPicIdData = () => {
    const data = {
      api_key: "-- ask for one: https://web.plant.id/api-access-request/ --",
      images: [plantFile],
      modifiers: ["crops_fast", "similar_images"],
      language: "en",
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
        console.log("Plant:", responseData.suggestions);
        console.log(
          "Plant Details:",
          responseData.suggestions[0].plant_details.wiki_description.value
        );
        setSuggestions(responseData.suggestions);
      });
  };

  const suggestionRenderer = suggestions.map((suggestion) => {
    return (
      <View>
        <Text key={suggestion.id}></Text>
        <Text className="Plant Name">
          <li key="plant_name">{suggestion.plant_name}</li>
        </Text>
        {suggestions.map((plant_details) => (
          <Text className="Plant Description">
            <li key={"plant_description"}>{plant_details.wiki_description}</li>
          </Text>
        ))}
        {/* <Text>
            <li key="plant_details">{suggestions[0].plant_details.wiki_description}</li>
          </Text> */}
      </View>
    );
  });

  const content = isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View>{suggestionRenderer}</View>
  );

  return (
    <View>
      <View className="CameraSelect">
        <View>
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
        </View>
        <View>
          <Text>
            <button onClick={setPicIdData}>Click Me</button>
          </Text>
        </View>
        <View>{content}</View>
      </View>
    </View>
  );
};

export default PlantAPI;
