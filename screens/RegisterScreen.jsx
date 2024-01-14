import { Image, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState } from 'react'
import {useNavigation} from "@react-navigation/native"
import { FontAwesome5 } from '@expo/vector-icons';

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    console.log("User : ", user);
    
    // send a POST  request to the backend API to register the user
    axios
      .post("http://10.0.2.2:8000/register", user)
      .then((response) => {
        console.log("response : ", response);
        console.log("response data : ", response.data);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        // setName("");
        // setEmail("");
        // setPassword("");
      })
      .catch((error) => {
        console.log("error : ", error),
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };

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
            Register to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#D0D0D0",
              paddingVertical: 7,
              paddingHorizontal: 5,
              width: 300,
              borderRadius: 5,
              gap: 5,
            }}
          >
            
            <FontAwesome5 name="user-alt" size={24} color="black" style={{color: "gray", fontSize: 20, marginLeft: 9}} />
            <TextInput
              placeholder="enter your name"
              value={{ name }}
              onChangeText={(text) => setName(text)}
              style={{ fontSize: 16 }}
              color="gray"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#D0D0D0",
              paddingVertical: 7,
              paddingHorizontal: 5,
              width: 300,
              borderRadius: 5,
              gap: 5,
              marginTop: 25
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
              style={{ fontSize: 16 }}
              color="gray"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#D0D0D0",
              paddingVertical: 7,
              paddingHorizontal: 5,
              width: 300,
              borderRadius: 5,
              gap: 5,
              marginTop: 25,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 7 }}
            />
            <TextInput
              placeholder="enter your Password"
              styles={{
                color: "gray",
                marginVertical: 10,
                fontSize: password ? 16 : 16,
              }}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              color="gray"
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
          onPress={handleRegister}
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
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: 600 }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable style={{ marginTop: 8 }} onPress={() => navigation.goBack()}>
          <Text style={{ textAlign: "center", fontSize: 16, color: "#787774" }}>
            Already Have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default RegisterScreen

const styles = StyleSheet.create({})