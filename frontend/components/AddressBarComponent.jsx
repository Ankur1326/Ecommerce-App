import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { memo, useState } from 'react';
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';

const AddressBarComponent = ({ setVisible, selectedAddress }) => {
    const [modalVisible, setModalVisible] = useState(false);
    console.log("selectedAddress : ", selectedAddress);

    return (
        <Pressable
            style={styles.container}
            onPress={() => setVisible(!modalVisible)}
        >
            <EvilIcons name="location" size={28} color="#ffcc00" style={styles.icon} />
            <View style={styles.textContainer}>
                {selectedAddress ? (
                    <Text style={styles.addressText}>Deliver To {selectedAddress.name} - {selectedAddress.landmark} {selectedAddress.postalCode}</Text>
                ) : (
                    <Text style={styles.placeholderText}>Add an Address</Text>
                )}
            </View>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#ffcc00" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1f25',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginHorizontal: 10,
        marginVertical: 5,
        borderColor: '#ffcc00',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    addressText: {
        color: '#ffcc00',
        fontSize: 16,
    },
    placeholderText: {
        color: '#ffcc00',
        fontSize: 16,
    },
});

export default memo(AddressBarComponent);
