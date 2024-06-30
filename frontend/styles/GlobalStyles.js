import { StyleSheet } from 'react-native';

export const butterFlyTheme = StyleSheet.create({
    dark: {
        primaryBackgroundColor: "#1c1f25",
        secondaryBackgroundColor: '#282c34',
        primaryTextColor: "#ffcc00",
        secondaryTextColor: "#ffffff",
        primaryBorderColor: "#ffcc00",
    },
    light: {
        primaryBackgroundColor: "#ffffff",
        secondaryBackgroundColor: '#f0f0f0',
        primaryTextColor: "#000000",
        secondaryTextColor: "#333333",
        primaryBorderColor: "#cccccc",
    }
});

export const defaultTheme = butterFlyTheme.dark;