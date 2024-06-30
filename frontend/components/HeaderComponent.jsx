import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { defaultTheme } from '../styles/GlobalStyles';

const HeaderComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <AntDesign name="search1" size={22} color="#ffcc00" style={styles.icon} />
                <TextInput
                    placeholder="Search Amazon.in"
                    placeholderTextColor="#ffcc00"
                    style={styles.input}
                />
            </View>
            <Pressable style={styles.microphoneButton}>
                <SimpleLineIcons name="microphone" size={28} color="#ffcc00" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: defaultTheme.primaryBackgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: '#2c3038',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    searchContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c3038',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#ffcc00',
    },
    microphoneButton: {
        padding: 10,
    },
});

export default HeaderComponent;
