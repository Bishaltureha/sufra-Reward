// navigation/GiftCardStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GiftCardStackParamList } from "../types";
import GiftCardsScreen from "../screens/GiftCardsScreen";
import GiftCardsPaymentScreen from "../screens/GiftCardsPaymentScreen";
import GiftCardsPaymentDoneScreen from "../screens/GiftCardsPaymentDoneScreen";

const Stack = createNativeStackNavigator<GiftCardStackParamList>();

export default function GiftCardStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GiftCardsMain" component={GiftCardsScreen} />
      <Stack.Screen name="Payment" component={GiftCardsPaymentScreen} />
      <Stack.Screen name="PaymentDone" component={GiftCardsPaymentDoneScreen} />
    </Stack.Navigator>
  );
}
