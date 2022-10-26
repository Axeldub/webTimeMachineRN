import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Back,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import de mes pages
import Connection from "./components/Connection";
import Nav from "./components/Navigation";

const Stack = createNativeStackNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Connection" component={Connection} />
        <Stack.Screen name="Nav" component={Nav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



