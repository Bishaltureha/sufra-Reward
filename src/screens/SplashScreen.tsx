import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useAppSelector } from "../store/hooks";
import { requestAllPermissions } from "../utils/requestPermissions";
import MultiSequenceLoader from "../../assets/svg/MultiSequenceLoader";
import { svgList } from "../../assets/svg/svgList";
import CloudVTLottieImage from "../components/CloudVTLottieImage";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  const { isAuthenticated, hasCompletedOnboarding } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    (async () => {
      await requestAllPermissions();

      setTimeout(() => {
        if (isAuthenticated) {
          // ✅ User already logged in → go to Main
          navigation.replace("MainStack", { screen: "Home" });
        } else if (hasCompletedOnboarding) {
          // ✅ Seen onboarding → go to Login
          navigation.replace("AuthStack", { screen: "Login" });
        } else {
          // ✅ First-time user → go to Welcome
          navigation.replace("OnboardingStack", { screen: "Welcome" });
        }
      }, 1500);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/image/logo.png")}
        style={styles.image}
      />
      {/* <MultiSequenceLoader icons={svgList} size={30} duration={1000} /> */}

      {/* <CloudVTLottieImage imageSource={''}/> */}
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
    width: 200,
    height: 200,
  },
});
