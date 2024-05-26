import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import { useSelector } from "react-redux";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  const cart = useSelector((state) => state.cart.cart)


  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: ({ focused, color }) => focused ? { color: "#008E97", } : { color: "black" },
          headerShown: false,
          tabBarIcon: ({ focused, size }) => focused ? (<Ionicons name="home" size={size} color="#008E97" />) : (<Ionicons name="home-outline" size={size} color="black" />),
        }} />

        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: "Profile", tabBarLabelStyle: ({ focused }) => focused ? { color: "#008E97" } : { color: "black" }, tabBarIcon: ({ focused, size }) => focused ? (<Ionicons name="person" size={size} color="#008E97" />) : (<FontAwesome5 name="user" size={size} color="black" />),
        }} />

        <Tab.Screen name="Cart" component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarBadge: cart.length > 0 ? cart.length : null,
            tabBarLabelStyle: ({ focused }) => focused ? { color: "#008E97", } : { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused, size }) => focused ? (<Ionicons name="cart" size={size} color="#008E97" />) : (<AntDesign name="shoppingcart" size={size} color="black" />),
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
        <Stack.Screen name="Info" component={ProductInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Address" component={AddAddressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add" component={AddressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Confirm" component={ConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;