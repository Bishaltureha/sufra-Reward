import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Language from "../screens/Language";
import CountryandLanguage from "../screens/CountryandLanguage";
import DiscoverSufraBenefits from "../screens/DiscoverSufraBenefits";
import { OnboardingStackParamList } from "../types";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ animation: "fade" }}
      />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="CountryandLanguage" component={CountryandLanguage} />
      <Stack.Screen
        name="DiscoverSufraBenefits"
        component={DiscoverSufraBenefits}
      />
    </Stack.Navigator>
  );
}
