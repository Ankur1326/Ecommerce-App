import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
    const navigation = useNavigation();

    const [allAddedAddresses, setAllAddedAddresses] = useState([])

    const [userIdFromToken, setUserIdFromToken] = useContext(UserType)

    const fetchAddesses = async () => {
        try {
            const response = await axios.get(`http://192.168.43.207:8000/addresses/${userIdFromToken}`)

            const addresses = response.data.addresses
            if (addresses) {
                setAllAddedAddresses(addresses)
            }
        } catch (error) {
            Alert.alert("Error while getting add added addresses", error.response.data.message)
            console.log("Error while getting add added addresses", error);
        }

    }
    useEffect(() => {
        fetchAddesses()
    }, [])

    // refresh the addresses when the component comes to the focus ie basically when we navigate back and update in the address
    useFocusEffect(
        useCallback(() => {
            fetchAddesses()
        }, [])
    )


    const handleRemeoveAddress = async (addressId, userIdFromToken) => {
        const response = await axios.post(`http://192.168.43.207:8000/address/remove/${addressId}`, { userIdFromToken })
        if (response.status == 200) {
            // fetchAddesses()
        }
        if (response.status == 400) {
            Alert.alert("Internal server error", response.data.message)
        }
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center", }}>
                <Pressable style={{
                    flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white",
                    borderRadius: 3, height: 38, flex: 1,
                }}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
                    <TextInput placeholder="Search Amazon.in" />
                </Pressable>

                <Feather name="mic" size={24} color="black" />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

                <Pressable onPress={() => navigation.navigate("Add")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderColor: "#D0D0D0", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingVertical: 7, paddingHorizontal: 5, }}>
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                <Pressable style={{ flex: 1, alignItems: "center", gap: 14 }}>
                    {/* all the added adresses */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: 600, fontSize: 20 }} >Personal Addresses</Text>
                    </View>

                    {
                        allAddedAddresses.map((item, index) => (
                            <View key={index} style={{ width: "90%", borderWidth: 1.5, borderColor: "#b3b3b3", borderRadius: 5, paddingHorizontal: 8, paddingVertical: 10, paddingBottom: 20 }} >
                                <View style={{ borderBottomWidth: 1.5, paddingBottom: 12, borderColor: "#b3b3b3" }}><Text>Default</Text></View>

                                <View style={{ paddingVertical: 10 }} >
                                    <Text style={{ fontWeight: 700, fontSize: 15 }} >{item?.name}</Text>
                                    <Text style={{}} >House No: {item?.houseNo}</Text>
                                    <Text style={{ fontSize: 15 }} >{item?.landmark}</Text>
                                    <Text style={{ fontSize: 15 }} >Phone Number: {item?.mobileNo}</Text>
                                    <Text style={{ fontSize: 15 }} >Pin Code: {item.postalCode}</Text>
                                    <Text style={{ fontSize: 15 }} >_id: {item._id}</Text>
                                </View>

                                <View style={{ flexDirection: "row", gap: 10 }} >
                                    <Pressable style={{ borderWidth: 1, paddingHorizontal: 15, paddingVertical: 6, borderColor: "#b3b3b3", borderRadius: 5, elevation: 12 }}>
                                        <Text style={{ fontWeight: 500, fontSize: 13 }} >Edit</Text>
                                    </Pressable>
                                    <Pressable onPress={() => handleRemeoveAddress(item._id, userIdFromToken)} style={{ borderWidth: 1, paddingHorizontal: 15, paddingVertical: 6, borderColor: "#b3b3b3", borderRadius: 5, shadowColor: "black", elevation: 12 }}>
                                        <Text style={{ fontWeight: 500, fontSize: 13 }} >Remove</Text>
                                    </Pressable>
                                    <Pressable style={{ borderWidth: 1, paddingHorizontal: 15, paddingVertical: 6, borderColor: "#b3b3b3", borderRadius: 5, shadowColor: "black", elevation: 12 }}>
                                        <Text style={{ fontWeight: 500, fontSize: 13 }} >set a default</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))
                    }

                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});