import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useAppSelector } from "../store/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  const { isAuthenticated, hasCompletedOnboarding } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // Decision logic
      if (isAuthenticated) {
        // User is logged in - go to Home
        navigation.replace("MainStack", { screen: "Home" });
      } else if (hasCompletedOnboarding) {
        // User has seen welcome screens before but not logged in - go to Login
        navigation.replace("AuthStack", { screen: "Login" });
      } else {
        // First time user - show welcome flow
        navigation.replace("OnboardingStack", { screen: "Welcome" });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/image/logo.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    resizeMode: "contain",
  },
});
