import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { RootStackParamList } from "../types";
import Language from "../screens/Language";
import DiscoverSufraBenefits from "../screens/DiscoverSufraBenefits";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import Register from "../screens/Register";
import CountryandLanguage from "../screens/CountryandLanguage";
import ForgetPassword from "../screens/ForgetPassword";
import InformationScreen from "../screens/InformationScreen";
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
import CartScreen from "../screens/CartScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import Payment from "../screens/Payment";
import SelectDeliveryAddress from "../screens/SelectDeliveryAddress";
import AddNewAddress from "../screens/AddNewAddress";
import ConfirmAddress from "../screens/ConfirmAddress";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <Stack.Navigator
        id={undefined}
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ animation: "fade" }}
        />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen
          name="CountryandLanguage"
          component={CountryandLanguage}
        />

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
    </>
  );
}
