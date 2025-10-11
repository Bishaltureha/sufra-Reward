import React, { useEffect } from "react";
import { StatusBar, StyleSheet, I18nManager, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider } from "./src/context/LocalizationContext";
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
    <LocalizationProvider>
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer ref={navigationRef}>
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
