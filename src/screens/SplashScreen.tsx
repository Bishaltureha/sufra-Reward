import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useAppSelector } from "../store/hooks";
import { requestAllPermissions } from "../utils/requestPermissions";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  const { isAuthenticated, hasCompletedOnboarding } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    (async () => {
      // Request all permissions first
      await requestAllPermissions();

      // Then proceed with your app navigation
      setTimeout(() => {
        if (isAuthenticated) {
          navigation.replace("MainStack", { screen: "Home" });
        } else if (hasCompletedOnboarding) {
          navigation.replace("AuthStack", { screen: "Login" });
        } else {
          navigation.replace("OnboardingStack", { screen: "Welcome" });
        }
      }, 2000);
    })();
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
