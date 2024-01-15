import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: ({ focused }) => focused ? {color: "#008E97"} : {color: "black"},
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? (<Ionicons name="home" size={24} color="#008E97" />) : (<Ionicons name="home-outline" size={24} color="black" />),
        }} />

        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: ({ focused }) => focused ? {color: "#008E97"} : {color: "black"},
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? (<FontAwesome5 name="user-alt" size={24} color="#008E97" />) : (<FontAwesome5 name="user" size={24} color="black" />),
        }} />
        

        <Tab.Screen name="Cart" component={CartScreen} options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: ({ focused }) => focused ? {color: "#008E97"} : {color: "black"},
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? (<Ionicons name="cart" size={24} color="#008E97" />) : (<AntDesign name="shoppingcart" size={24} color="black" />),
        }} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
