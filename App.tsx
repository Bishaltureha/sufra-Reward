import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider } from "./src/context/LocalizationContext";

const App = () => {
  return (
    <LocalizationProvider>
      <SafeAreaProvider style={{ backgroundColor: "#ffffff" }}>
        <NavigationContainer>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false}
          />
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </LocalizationProvider>
  );
};

export default App;
