import React, { useEffect } from "react";
import {
  StyleSheet,
  I18nManager,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider } from "./src/context/LocalizationContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import { navigationRef } from "./src/navigation/navigationRef";
import { getLanguage } from "./src/utils/storage";

const App = () => {
  useEffect(() => {
    // Set RTL on web
    if (Platform.OS === "web") {
      const { language, isRTL } = getLanguage();

      // Set direction on HTML element
      const htmlElement = document.documentElement;
      if (htmlElement) {
        htmlElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
        htmlElement.setAttribute("lang", language || "en");
      }

      // Set I18nManager for React Native Web
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        }
        persistor={persistor}
      >
        <LocalizationProvider>
          <SafeAreaProvider style={styles.container}>
            <NavigationContainer ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff" },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
