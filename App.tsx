import React from "react";
import { StatusBar, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider } from "./src/context/LocalizationContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <ActivityIndicator size="large" color="#000000" />
          </View>
        }
        persistor={persistor}
      >
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
      </PersistGate>
    </Provider>
  );
};

export default App;
