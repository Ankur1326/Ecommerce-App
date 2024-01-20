import { Pressable, ScrollView, StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from "react-redux"
import { decrementQuantity, incementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from "@react-navigation/native"


const CartScreen = () => {
  const navigation = useNavigation()
  const cart = useSelector((state) => state.cart.cart)
  console.log(cart);
  const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);

  console.log("total : ", total);

  const dispatch = useDispatch()
  const handleDecreaseQuantity = (item) => {
    dispatch(decrementQuantity(item))
  }

  const handleDeleteItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }
  const handleIncreaseQuantity = (item) => {
    dispatch(incementQuantity(item))
  }


  return (
    <SafeAreaView style={{ backgroundColor: "white" }} >
      <ScrollView>
        {/* search ;bar */}
        <View style={{ backgroundColor: "#b3fffe", paddingHorizontal: 15, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
          <Pressable style={{ backgroundColor: "white", flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 8, width: "88%", alignItems: "center", borderRadius: 5 }}>
            {/* icon */}
            <AntDesign name="search1" size={22} color="black" />
            <TextInput color="gray" placeholder='Search Amazone.in' style={{ paddingLeft: 9, fontSize: 16 }} />
          </Pressable>

          <Pressable style={{ marginRight: 10 }}>
            <SimpleLineIcons name="microphone" size={28} color="black" />
          </Pressable>
        </View>

        <View style={{ paddingVertical: 15, paddingHorizontal: 10, flex: 1, gap: 10 }} >
          <View style={{ flexDirection: 'row', gap: 5 }} >
            <Text style={{ fontSize: 20 }} >SubTotal</Text>
            <Text style={{ fontSize: 20, fontWeight: 700 }} >{total}</Text>
          </View>
          <Text style={{ color: "gray" }} >EMI Available <Text style={{ color: "#0066b2" }} >Details</Text></Text>
          <Pressable onPress={() => navigation.navigate("Confirm")} style={{ backgroundColor: "#f7b539", paddingHorizontal: 10, paddingVertical: 15, borderRadius: 7 }}>
            <Text style={{ textAlign: 'center', fontWeight: 600 }}>Proceed to Buy ( {cart.length > 0 ? cart.length : "0"} item )</Text>
          </Pressable>

          <View style={{ borderBottomWidth: 1, borderBottomColor: "gray", marginTop: 20, marginBottom: 10 }} ></View>


          {
            cart.length > 0 ? (
              cart.map((item, index) => (
                <Pressable key={index} style={{ flexDirection: 'row', alignItems: "start", justifyContent: 'space-between', position: 'relative', paddingVertical: 20, paddingHorizontal: 10, height: 300, borderWidth: 1, borderColor: "#a1a1a1", gap: 10 }} >
                  <View>
                    <Image style={{ width: 150, height: 160, resizeMode: 'contain' }} source={{ uri: item?.image }} />
                  </View>
                  <View>
                    <Text numberOfLines={2} style={{ width: 165 }} >{item?.title.length < 50 ? (item.title) : (item.title.split(0))}</Text>
                    {item.offer && <Text>{item?.offer}</Text>}
                    <Text style={{ fontSize: 22, fontWeight: 700 }} >₹{item?.price}</Text>
                    <View >
                      {item.oldPrice && <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: "gray" }} >₹{item.oldPrice}</Text>}
                    </View>
                    <Image style={{ width: 30, height: 30, resizeMode: "contain" }} source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                    />
                    <Text style={{ color: "green", fontSize: 17, fontWeight: 500 }}>In Stock</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', backgroundColor: "#c9c9c9", borderRadius: 7, borderColor: "#a3a3a3", borderWidth: 1, width: 135, height: 38, flex: 1, gap: 10, position: 'absolute', bottom: 60, left: 20 }} >
                    <View>
                      {
                        item.quantity > 1 ? (
                          <Pressable onPress={() => handleDecreaseQuantity(item)}><AntDesign name="minus" size={24} color="black" /></Pressable>
                        ) : (
                          <Pressable onPress={() => handleDeleteItemFromCart(item)} ><AntDesign name="delete" size={18} color="black" /></Pressable>
                        )
                      }
                    </View>
                    <Text style={{ fontSize: 20, borderLeftWidth: 1, borderRightWidth: 1, paddingHorizontal: 18, backgroundColor: "white", paddingVertical: 5, borderColor: "#a3a3a3" }} >{item.quantity}</Text>
                    <Pressable onPress={() => handleIncreaseQuantity(item)}><AntDesign name="plus" size={18} color="black" /></Pressable>
                  </View>

                  <Pressable onPress={() => handleDeleteItemFromCart(item)} style={{ borderRadius: 5, borderColor: "#a3a3a3", borderWidth: 1, height: 40, position: 'absolute', bottom: 60, left: 170, paddingHorizontal: 15, paddingVertical: 8 }}>
                    <Text style={{ fontSize: 17, fontWeight: 600, color: "gray" }} >Delete</Text>
                  </Pressable>

                  <Pressable style={{ borderRadius: 5, borderColor: "#a3a3a3", borderWidth: 1, height: 35, position: 'absolute', bottom: 10, left: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: 600, color: "gray" }} >Save for letter</Text>
                  </Pressable>
                  <Pressable style={{ borderRadius: 5, borderColor: "#a3a3a3", borderWidth: 1, height: 35, position: 'absolute', bottom: 10, right: 40, paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: 600, color: "gray" }} >See More Like this</Text>
                  </Pressable>

                </Pressable>
              ))

            ) : (
              <View>
                <View style={{ flexDirection: "row", alignItems: 'center', gap: 15 }} >
                  <Image style={{ width: 100, height: 100 }} source={{ uri: "data:image/png;base64,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" }} />
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>Your Amazon Cart is empty</Text>
                    <Text style={{ fontSize: 15, fontWeight: 400, color: "#0066b2" }}>Pick up where your left off</Text>
                  </View>
                </View>

              </View>
            )
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})