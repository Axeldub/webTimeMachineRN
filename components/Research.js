import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Constants from 'expo-constants';
import * as Location from "expo-location";
import * as WebBrowser from 'expo-web-browser';
import { WebView } from 'react-native-webview';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  StyleSheet,
  Text,
  View,
  Back,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
} from "react-native";





export default function Research() {

  const [search, setSearch] = useState({});
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
  const [message, setMessage] = useState("No research found!");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const dateArray = date.toISOString().split('T')
  const timeStamp = dateArray[0].split('-').join('') + "" + dateArray[1].substring(0, 5).replace(':','')
  
  // fonction avec mon fetch pour get la météo
  const getSearch = async (url, timeStamp) => {
    const options = {
      method: "GET",
    };
    fetch(
        
      `http://archive.org/wayback/available?url=${url}&timestamp=${timeStamp}`,
      options
    )
      // on initialise la response en format JSOn pour etre lu par RN
      .then((response) => {
        return response.json();
       
      })

      // on joue avec la data récupéré ici
      .then(
        async (responseObject) => {
          if (responseObject) {
            console.log("API RECUP : ", responseObject);
            setSearch(responseObject);
            setUrl(responseObject.archived_snapshots.closest.url);
            await AsyncStorage.setItem("url", responseObject.archived_snapshots.closest.url);
            await AsyncStorage.setItem("date", responseObject.archived_snapshots.closest.timestamp);
            setDate(responseObject.archived_snapshots.closest.timestamp);
          } else console.log("non");
        },

        (error) => {
          console.log(error);
        }
      );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    let fTime = "Hours: " + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime)

    console.log(fDate + ' (' + fTime + ')')
  };
const showMode = (currentMode) => {
  //   if (Platform.OS === 'android') {
      setShow(true);
      setMode(currentMode);
      // for iOS, add a button that closes the picker

  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  

  // je récupère mon Asyncstorage
  const testAsync = async () => {
    if (await AsyncStorage.getItem("url") !== null){
    setMessage(await AsyncStorage.getItem("url"))
    } else  {
       setMessage("No research found!") 
    }
  };

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };





  useEffect(() => {
    //j'initialise la fonction fetch pour la lancer à chaque lancement de l'app
    getSearch();
    
    

    // test du comportement de ma data
    console.log("url", search);
  }, {});

  // ce useEffect ce relance à chaque fois que ma variable d'état search se met à jour
  useEffect(() => {
    console.log("url", search);

    testAsync();
  }, [search]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#77B5FE" }}>
      <View
        style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
          }}>
          Bienvenue dans votre moteur de recherche
        </Text>
      </View>
      <View >
            <Text style={{fontWeight:"bold,", fontSize:20, }}>{date.toLocaleString()}</Text>
            <View style={{margin:20}}>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <Button onPress={showTimepicker} title="Show time picker!" />
            {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={timeStamp}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
            <View>
             <TextInput  placeholder="Recherche.">

             </TextInput>

             </View>
          </View>
      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <TextInput
          placeholder={"Url"}
          onChangeText={(text) => setUrl(text)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            marginBottom: 20,
            marginHorizontal: 20,
            borderColor: "white",
            paddingLeft: 10,
          }}
        />
        
       
      </View>

      <View style={{ flex: 0.5, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
              getSearch(url, timeStamp);
          }}
          style={{ backgroundColor: "orange", padding: 10, borderRadius: 20 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Search</Text>
        </TouchableOpacity>
        <Text>{url}</Text>
      </View>
      <WebView
      style={{flex: 1, marginTop: Constants.statusBarHeight,}}
      source={{ uri: url }}
    />
      <View style={{flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        marginTop:80}}>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync}/>
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
    </SafeAreaView>
  )

}