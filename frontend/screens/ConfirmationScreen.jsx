import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from "axios";
import { UserType } from '../UserContext';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { cleanCart } from '../redux/CartReducer';

import RazorpayCheckout from 'react-native-razorpay';

const ConfirmationScreen = () => {
    const steps = [
        { title: "Address", content: "Address From" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ]

    const [currentStep, setCurrentStep] = useState(0)
    const [addresses, setAddresses] = useState([])

    const [userIdFromToken, setUserIdFromToken] = useContext(UserType)
    // function to fetch all added addresses from database
    const fetchAddesses = async () => {
        try {
            const response = await axios.get(`http://192.168.43.207:8000/addresses/${userIdFromToken}`)

            const addresses = response.data.addresses
            if (addresses) {
                setAddresses(addresses)
            }
        } catch (error) {
            Alert.alert("Error while getting add added addresses", error.response.data.message)
            console.log("Error while getting add added addresses", error);
        }
    }

    useEffect(() => {
        fetchAddesses()
    }, [])

    const [selectedAddress, setSelectedAddress] = useState("")
    const [option, setOption] = useState(false)
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("")

    const cart = useSelector((state) => state.cart.cart)
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);


    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post(
                `http://192.168.43.207:8000/order`,
                { userId: userIdFromToken, cartItem: cart, shippingAddress: selectedAddress, paymentMethod: selectedPaymentOption, totalPrice: total }
            )

            if (response.status === 200) {
                navigation.navigate("Order")
                dispatch(cleanCart())
                console.log(response.data.message);
            }
            else {
                console.log("error creating order ", response.data.message);
            }

        } catch (error) {
            Alert.alert("Error while place your order")
            console.log("Error while place your order", error);
        }

    }

    const pay = async () => {
        try {
            let options = {
                description: 'Credits towards consultation',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5FJOm2p0GJ65ccxW5h_egLrVhm8v4s0o1g&s',
                currency: 'INR',
                name: 'Ankur Swami',
                key: 'rzp_test_MV5bnImbMoGCES',
                amount: total * 100,
                order_id: 'order_DslnoIgkIDL8Zt',
                prefill: {
                    email: 'gaurav.kumar@example.com',
                    contact: '9191919191',
                    name: 'Gaurav Kumar',
                },
                theme: { color: '#53a20e' }
            }

            
            // const data = await RazorpayCheckout.open(options)
            if (RazorpayCheckout && RazorpayCheckout.open) {
                RazorpayCheckout.open(options)
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log("error :", error);
                    });
            } else {
                console.log("RazorpayCheckout.open is not available");
            }
            // console.log("data : ", data);

            // const response = await axios.post(
            //     `http://192.168.43.207:8000/order`,
            //     { userId: userIdFromToken, cartItem: cart, shippingAddress: selectedAddress, paymentMethod: selectedPaymentOption, totalPrice: total }
            // )

            // if (response.status === 200) {
            //     navigation.navigate("Order")
            //     dispatch(cleanCart())
            //     console.log(response.data.message);
            // }
            // else {
            //     console.log("error creating order ", response.data.message);
            // }

        } catch (error) {
            console.log("error while pay payment : ", error);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#f5f5f5" }} >
            <ScrollView>
                {/* <StatusBar backgroundColor="#00b5b0" /> */}
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40, borderBottomWidth: 5.6, marginBottom: 15, borderBottomColor: "#bababa" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                            justifyContent: "space-between",
                        }}
                    >
                        {steps?.map((step, index) => (
                            <Pressable key={step.title} onPress={() => setCurrentStep(index)} style={{ justifyContent: "center", alignItems: "center" }}>
                                {index > 0 && (
                                    <View
                                        style={[
                                            { flex: 1, height: 2, backgroundColor: "green" },
                                            index <= currentStep && { backgroundColor: "green" },
                                        ]}
                                    />
                                )}
                                <View
                                    style={[
                                        {
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15,
                                            backgroundColor: "#ccc",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        },
                                        index < currentStep && { backgroundColor: "green" },
                                    ]}
                                >
                                    {index < currentStep ? (
                                        <Text
                                            style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                        >
                                            &#10003;
                                        </Text>
                                    ) : (
                                        <Text
                                            style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                        >
                                            {index + 1}
                                        </Text>
                                    )}
                                </View>
                                <Text style={{ textAlign: "center", marginTop: 8 }}>
                                    {step.title}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* step 0 / Address */}
                {currentStep == 0 && (
                    <View style={{ marginHorizontal: 20 }} >
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>Select a delivery address</Text>

                        <Pressable style={{ backgroundColor: "yellow" }}>
                            {addresses?.map((item, index) => (
                                <Pressable onPress={() => setSelectedAddress(item)} style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#b3b3b3", borderRadius: 5, paddingHorizontal: 8, paddingBottom: 20 }} >


                                    <View key={index} style={{ flexDirection: "row", alignItems: 'center', gap: 10, }} >
                                        {selectedAddress && selectedAddress._id === item?._id ? (
                                            <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                                        ) : (
                                            <Entypo name="circle" size={24} color="gray" />

                                        )}

                                        <View style={{ paddingVertical: 10 }} >
                                            <Text style={{ fontWeight: 700, fontSize: 15 }} >{item?.name}</Text>
                                            <Text style={{}} >{item?.houseNo}</Text>
                                            <Text style={{ fontSize: 15 }} >{item?.landmark}</Text>
                                            <Text style={{ fontSize: 15 }} >Phone Number: {item?.mobileNo}</Text>
                                            <Text style={{ fontSize: 15 }} >Pin Code: {item.postalCode}</Text>
                                        </View>

                                    </View>

                                    {
                                        selectedAddress && selectedAddress._id === item?._id ? (
                                            <View style={{ flexDirection: "column", gap: 10 }} >
                                                <Pressable onPress={() => setCurrentStep(1)} style={{ paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, backgroundColor: "#f7b539" }}>
                                                    <Text style={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }} >Deliver to this address</Text>
                                                </Pressable>
                                                <Pressable style={{ borderWidth: 1, paddingHorizontal: 15, paddingVertical: 8.5, borderColor: "#b3b3b3", borderRadius: 5, shadowColor: "black" }}>
                                                    <Text style={{ fontWeight: 500, fontSize: 12.5, textAlign: 'center' }} >Edit Addess</Text>
                                                </Pressable>
                                                <Pressable style={{ borderWidth: 1, paddingHorizontal: 15, paddingVertical: 8.5, borderColor: "#b3b3b3", borderRadius: 5, shadowColor: "black" }}>
                                                    <Text style={{ fontWeight: 500, fontSize: 12.5, textAlign: 'center' }} >Add delivery instructions</Text>
                                                </Pressable>
                                            </View>
                                        ) : ""
                                    }

                                </Pressable>
                            ))}
                        </Pressable>
                    </View>
                )}

                {/* stet 1 / Delivery */}
                {
                    currentStep == 1 && (
                        <View style={{ width: "100%", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 22, fontWeight: "bold" }} >Choose your delivery options </Text>
                            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 20 }} >Choose a delivery speen </Text>

                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', borderWidth: 1, borderColor: "gray", paddingVertical: 10, paddingHorizontal: 8, marginTop: 7, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }} >

                                {
                                    option == true ? (
                                        <FontAwesome5 onPress={() => setOption(!option)} name="dot-circle" size={24} color="#008397" />
                                    ) : (<Entypo onPress={() => setOption(!option)} name="circle" size={24} color="gray" />)
                                }

                                <Text style={{ flex: 1 }} >
                                    <Text style={{ color: "green", fontWeight: 500 }} >Tomorrow by 10pm</Text>
                                    <Text style={{ fontWeight: 700 }} > — Free Delivery</Text>
                                </Text>
                            </View>

                            {
                                option == true ? (
                                    <Pressable onPress={() => setCurrentStep(2)} style={{ paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, backgroundColor: "#f7b539", marginTop: 30 }}>
                                        <Text style={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }} >Continue</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable style={{ paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, backgroundColor: "#bdbdbd", marginTop: 30 }}>
                                        <Text style={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }} >Please select the option</Text>
                                    </Pressable>
                                )
                            }


                        </View>
                    )
                }

                {/* step 2 / Payment */}
                {
                    currentStep == 2 && (
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold" }} >Select Your payment Method</Text>
                            <View>
                                <Pressable onPress={() => setSelectedPaymentOption("cash")} style={{ backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, flexDirection: "row", alignItems: "center", gap: 7, marginTop: 12, }}>
                                    {
                                        selectedPaymentOption == "cash" ? (
                                            <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                                        ) : (<Entypo name="circle" size={24} color="gray" />)
                                    }

                                    <Text>Cash on Delivery</Text>
                                </Pressable>
                                <Pressable onPress={() => {
                                    setSelectedPaymentOption("card")
                                    Alert.alert("UPI/Debit Card", "Pay Online", [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel is Pressed")
                                        },
                                        {
                                            text: "OK",
                                            onPress: () => pay()
                                        },
                                    ])
                                }} style={{ backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, flexDirection: "row", alignItems: "center", gap: 7, marginTop: 12, }}>
                                    {
                                        selectedPaymentOption == "card" ? (
                                            <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                                        ) : (<Entypo name="circle" size={24} color="gray" />)
                                    }
                                    <Text>UPI / Credit or debit card</Text>
                                </Pressable>
                            </View>
                            {
                                selectedPaymentOption !== "" ? (
                                    <Pressable onPress={() => setCurrentStep(3)} style={{ paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, backgroundColor: "#f7b539", marginTop: 30 }}>
                                        <Text style={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }} >Continue</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable style={{ paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, backgroundColor: "#bdbdbd", marginTop: 30 }}>
                                        <Text style={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }} >Please select the option</Text>
                                    </Pressable>
                                )
                            }
                        </View>
                    )
                }

                {/* step 3 / Place Order */}
                {
                    currentStep === 3 && selectedPaymentOption === "cash" && (
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, }}>
                                <View>
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Save 5% and never run out</Text>
                                    <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>Turn on auto deliveries</Text>
                                </View>

                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </View>

                            <View style={{ backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, }}>
                                <Text>Shipping to selectedAddress?.name</Text>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8, }}>
                                    <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Items</Text>

                                    <Text style={{ color: "gray", fontSize: 16 }}>₹{total}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8, }}>
                                    <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Delivery</Text>

                                    <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8, }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Total</Text>

                                    <Text style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}>₹{total}</Text>
                                </View>
                            </View>

                            <View style={{ backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, }}>
                                <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

                                <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>Pay on delivery (Cash)</Text>
                            </View>

                            <Pressable onPress={() => handlePlaceOrder()} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20, }}>
                                <Text>Place your order</Text>
                            </Pressable>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})