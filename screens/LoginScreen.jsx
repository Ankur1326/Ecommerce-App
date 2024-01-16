import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native"
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken")
        if (token) {
          navigation.replace("Main")
        }
        
      } catch (error) {
        console.log("Error message : ", error);
      }
    }
    checkLoginStatus();
  }, [])

    
  
  

  const loginHandler = async () => {
    const user = {
      email: email,
      password: password
    }

    try {
      // const response = await axios.post("http://10.0.2.2:8000/login", user) // for android studio
      const response = await axios.post("http://192.168.43.207:8000/login", user) // physical mobile device

      if (response.status == 201 || response.status == 200) {
        
        await AsyncStorage.setItem("authToken", response.data.secretKey)
        // navigation.navigate("Main")
        navigation.replace("Main")
        console.log("response.data.secretKey : ", response.data.secretKey);
        
      } else {
        Alert.alert(
          "Login Error",
          "An unexpected error occurred while Login. Please try again later."
        );
        console.log("Unexpected response status:", response.status);
      }

    } catch (error) {
      console.log("Error during login user :", error.message);

      if (error.response.status == 400 || error.response.status == 409 || error.response.status == 404) {
        console.log("error.response.data.message : ", error.response.data.message);
        Alert.alert(
          "Login Error",
          error.response.data.message
        )
      }
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        ></Image>
      </View>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontSize: 17, fontWeight: 700, textAlign: "center" }}>
            Login to In Your Account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#D0D0D0",
              paddingVertical: 6,
              paddingHorizontal: 5,
              width: 350,
              borderRadius: 5,
              gap: 5,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={{ marginLeft: 7 }}
            />
            <TextInput
              placeholder="enter your Email"
              value={{ email }}
              onChangeText={(text) => setEmail(text)}
              style={{ fontSize: 18, marginVertical: 7 }}
              color="gray"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#D0D0D0",
              paddingVertical: 6,
              paddingHorizontal: 5,
              width: 350,
              borderRadius: 5,
              gap: 5,
              marginTop: 25,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="black"
              style={{ marginLeft: 7 }}
            />
            <TextInput
              placeholder="enter your Password"
              style={{
                color: "gray",
                marginVertical: 7,
                fontSize: 18,
              }}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              color="gray"
              value={password}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#474747" }}>Keep me logged in</Text>
          <Text style={{ color: "#007fff", fontWeight: 500 }}>
            Forgot Password
          </Text>
        </View>

        <Pressable
          style={{
            marginTop: 85,
            backgroundColor: "#f7b539",
            paddingVertical: 14,
            width: 180,
            margin: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 5,
          }}
          onPress={loginHandler}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: 600 }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable style={{ marginTop: 8 }} onPress={() => navigation.navigate("Register")}>
          <Text style={{ textAlign: "center", fontSize: 16, color: "#787774" }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
