import React, { useEffect } from "react";
import {
  StyleSheet,
  I18nManager,
  Platform,
  ActivityIndicator,
  View,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocalizationProvider } from "./context/LocalizationContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { navigationRef } from "./navigation/navigationRef";
import { getLanguage } from "./utils/storage";

// 👇 Import the package (with your custom type)
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { AddressProvider } from "./context/AddressContext";

const App = () => {
  useEffect(() => {
    // if (Platform.OS === "android") {
    //   StatusBar.setHidden(true);

    //   setTimeout(
    //     () => changeNavigationBarColor("transparent", false, true),
    //     2000
    //   );
    // }

    // Set RTL for web
    if (Platform.OS === "web") {
      const { language, isRTL } = getLanguage();
      const htmlElement = document.documentElement;
      if (htmlElement) {
        htmlElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
        htmlElement.setAttribute("lang", language || "en");
      }
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
            <AddressProvider>
              <NavigationContainer ref={navigationRef}>
                <AppNavigator />
              </NavigationContainer>
            </AddressProvider>
          </SafeAreaProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
