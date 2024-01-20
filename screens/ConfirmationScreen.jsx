import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ConfirmationScreen = () => {
    const steps = [
        { title: "Address", content: "Address From" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ]

    const [currentStep, setCurrentStep] = useState()
    return (
        <SafeAreaView>
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})