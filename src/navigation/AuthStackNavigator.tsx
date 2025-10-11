import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import Register from "../screens/Register";
import ForgetPassword from "../screens/ForgetPassword";
import InformationScreen from "../screens/InformationScreen";
import { AuthStackParamList } from "../types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="InformationScreen" component={InformationScreen} />
    </Stack.Navigator>
  );
}
