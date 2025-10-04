import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider } from "./src/context/LocalizationContext";

const App = () => {
  return (
    <LocalizationProvider>
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </LocalizationProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff" },
});
