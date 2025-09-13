// App.tsx
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import "react-native-gesture-handler";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={false}
      />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
