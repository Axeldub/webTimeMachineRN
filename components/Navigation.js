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
} from "react-native";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// import composants
import Research from "../components/Research";
import Settings from "../components/Settings";

const Tab = createBottomTabNavigator();

function Nav() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle";
            } else if (route.name === "settings") {
              iconName = focused ? "ios-list" : "ios-list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "yellow",
          tabBarInactiveTintColor: "gray",
        })}>
        <Tab.Screen
          options={{ headerShown: false }}
          name="home"
          component={Research}
        />

        <Tab.Screen
          options={{ headerShown: false }}
          name="settings"
          component={Settings}
        />
      </Tab.Navigator>
    </View>
  );
}
export default Nav;
