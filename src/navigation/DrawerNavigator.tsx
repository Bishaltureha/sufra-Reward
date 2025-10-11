import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { I18nManager, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { DrawerParamList } from "../types";
import CustomDrawerContent from "../components/CustomDrawerContent";
import TopTabScreen from "./TopTabScreen";
import DealsScreen from "../screens/DealsScreen";
import BookCateringScreen from "../screens/BookCateringScreen";
import MyFavoritesScreen from "../screens/MyFavoritesScreen";
import MyAddressesScreen from "../screens/MyAddressesScreen";
import MyPaymentMethodsScreen from "../screens/MyPaymentMethodsScreen";
import GetHelpScreen from "../screens/GetHelpScreen";
import FAQScreen from "../screens/FAQScreen";
import GiftCardStack from "./GiftCardStack";
import NotificationScreen from "../screens/NotificationScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import { scale } from "../utils/dimen";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  const isRTL = I18nManager.isRTL;

  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerPosition: isRTL ? "right" : "left",
        overlayColor: "rgba(0,0,0,0.5)",
        swipeEnabled: false,
        drawerHideStatusBarOnOpen: true,
        drawerStyle: {
          direction: isRTL ? "rtl" : "ltr",
          width: scale(320),
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="GiftCards" component={GiftCardStack} />
      <Drawer.Screen
        name="TopTabScreen"
        component={TopTabScreen}
        initialParams={{ screen: "Delivery" }}
        options={{ title: "Order" }}
      />
      <Drawer.Screen name="Deals" component={DealsScreen} />
      <Drawer.Screen name="BookCatering" component={BookCateringScreen} />
      <Drawer.Screen name="MyFavorites" component={MyFavoritesScreen} />
      <Drawer.Screen name="MyAddresses" component={MyAddressesScreen} />
      <Drawer.Screen
        name="MyPaymentMethods"
        component={MyPaymentMethodsScreen}
      />
      <Drawer.Screen name="MyOrders" component={MyOrdersScreen} />
      <Drawer.Screen name="FAQ" component={FAQScreen} />
      <Drawer.Screen name="GetHelp" component={GetHelpScreen} />

      <Drawer.Screen name="Notification" component={NotificationScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
