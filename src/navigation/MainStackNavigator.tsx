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
import ProductDetails from "../screens/ProductDetails";
import ProductDetailsWithImage from "../screens/ProductDetailsWithImage";
import RecommendationScreen from "../screens/RecommendationScreen";
import CartScreen from "../screens/CartScreen";
import AddNewAddress from "../screens/AddNewAddress";
import Payment from "../screens/Payment";
import SelectDeliveryAddress from "../screens/SelectDeliveryAddress";
import ConfirmAddress from "../screens/ConfirmAddress";
import { MainStackParamList } from "../types";

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="TopTabScreen" component={TopTabScreen} />
      <Stack.Screen name="Deals" component={DealsScreen} />
      <Stack.Screen name="GetHelp" component={GetHelpScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="FindStores" component={FindStoresScreen} />
      <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
      <Stack.Screen name="BrandDetails" component={BrandDetailsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen
        name="ProductDetailsWithImage"
        component={ProductDetailsWithImage}
      />
      <Stack.Screen name="Recommendation" component={RecommendationScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen
        name="SelectDeliveryAddress"
        component={SelectDeliveryAddress}
      />
      <Stack.Screen name="ConfirmAddress" component={ConfirmAddress} />
    </Stack.Navigator>
  );
}
