import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { RootStackParamList } from "../types";
import Language from "../screens/Language";
import DiscoverSufraBenefits from "../screens/DiscoverSufraBenefits";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import Register from "../screens/Register";
import CountryandLanguage from "../screens/CountryandLanguage";
import ForgetPassword from "../screens/ForgetPassword";
import InformationScreen from "../screens/InformationScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="CountryandLanguage" component={CountryandLanguage} />
      <Stack.Screen
        name="DiscoverSufraBenefits"
        component={DiscoverSufraBenefits}
      />
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="InformationScreen" component={InformationScreen} />
    </Stack.Navigator>
  );
}
