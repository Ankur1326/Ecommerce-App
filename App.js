import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import { Provider } from "react-redux";
import store from "./Store";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigation />
        <ModalPortal />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
