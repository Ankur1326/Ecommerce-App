import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native"

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

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
              paddingVertical: 7,
              paddingHorizontal: 5,
              width: 300,
              borderRadius: 5,
              gap: 5,
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
              color="black"
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