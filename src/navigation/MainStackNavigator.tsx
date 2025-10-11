import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import TopTabScreen from "./TopTabScreen";
import DealsScreen from "../screens/DealsScreen";
import GetHelpScreen from "../screens/GetHelpScreen";
import FAQScreen from "../screens/FAQScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FindStoresScreen from "../screens/FindStoresScreen";
import LoyaltyScreen from "../screens/LoyaltyScreen";
import BrandDetailsScreen from "../screens/BrandDetailsScreen";
import { MainStackParamList } from "../types";

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="FindStores" component={FindStoresScreen} />
      <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
      <Stack.Screen name="BrandDetails" component={BrandDetailsScreen} />
    </Stack.Navigator>
  );
}
