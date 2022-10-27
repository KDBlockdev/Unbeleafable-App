///////////////////////////
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
////////////////////////////////this was from the youtube tutorial EP 1-5

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//this bit comes from the database - see Ep1 of youtube tutorial
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
///////////////
initializeApp(firebaseConfig); //init firebase app
const db = getFirestore(); //init services
const colRef = collection(db, "Plants"); //collection ref

export const getPlantList = () => {
  return getDocs(colRef)
    .then((snapshot) => {
      let plants = [];
      snapshot.docs.forEach((doc) => {
        plants.push({ ...doc.data(), id: doc.id });
      });
      return plants;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//adding plant/documents

export const addPlant = (title, description, color, img) => {
  const plantData = {
    title: title,
    description: description,
    color: color,
    img: img || "",
  };
  addDoc(colRef, plantData).then(() => {});
};

//deleting plants/documents
export const deletePlant = (id) => {
  deleteDoc(doc(db, "Plants", id));
};

//reportWebVitals();
