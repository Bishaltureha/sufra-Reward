// App.tsx
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#ffffff" }}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          translucent={false}
        />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
