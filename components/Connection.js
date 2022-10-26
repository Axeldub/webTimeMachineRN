import * as Location from "expo-location";
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
} from "react-native";
import { useEffect, useState } from "react";

function Connection({ navigation }) {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    console.log("login", login);
  }, [login, email, password]);

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
      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <TextInput
          placeholder={"email"}
          onChangeText={(text) => setEmail(text)}
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
        <TextInput
          placeholder={"password"}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            marginHorizontal: 20,
            borderColor: "white",
            paddingLeft: 10,
          }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{ flex: 0.5, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            if (email != null && password != null) {
              setLogin(true);
              navigation.navigate("Nav");
            } else {
              Alert.alert("Erreur", "email ou mdp incorrects");
            }
          }}
          style={{ backgroundColor: "orange", padding: 10, borderRadius: 20 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Connection;
