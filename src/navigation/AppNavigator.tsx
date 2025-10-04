import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import { RootStackParamList } from "../types";
import OnboardingStackNavigator from "./OnboardingStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import MainStackNavigator from "./MainStackNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStackNavigator} />
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
      <Stack.Screen name="MainStack" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}
