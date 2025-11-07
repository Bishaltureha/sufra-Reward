import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { I18nManager } from "react-native";
import { scale } from "../utils/dimen";
import { DrawerParamList } from "../types";

// Screens
import HomeScreen from "../screens/HomeScreen";
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
import ProfileScreen from "../screens/ProfileScreen";
import OrderTracking from "../screens/OrderTracking";
// Optional (currently commented to prevent redundant navigation loops)
// import TransactionHistory from "../screens/TransactionHistory";
// import UserAgreements from "../screens/UserAgreements";
// import ProfileInformation from "../screens/ProfileInformation";
// import ExtraInformation from "../screens/ExtraInformation";

// Components
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  const isRTL = I18nManager.isRTL;

  return (
    <Drawer.Navigator
      id={"DrawerRoot" as any}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        swipeEnabled: false,
        swipeEdgeWidth: 0,
        drawerHideStatusBarOnOpen: true,
        drawerPosition: isRTL ? "right" : "left",
        drawerStyle: {
          direction: isRTL ? "rtl" : "ltr",
          width: scale(320),
          backgroundColor: "#f5f5f5",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* Core navigation screens */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="TopTabScreen"
        component={TopTabScreen}
        initialParams={{ screen: "Delivery" }}
        options={{ title: "Order" }}
      />
      <Drawer.Screen name="GiftCards" component={GiftCardStack} />
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
      <Drawer.Screen name="OrderTracking" component={OrderTracking} />

      {/* Optional screens (enable when needed) */}
      {/* <Drawer.Screen name="TransactionHistory" component={TransactionHistory} /> */}
      {/* <Drawer.Screen name="UserAgreements" component={UserAgreements} /> */}
      {/* <Drawer.Screen name="ProfileInformation" component={ProfileInformation} /> */}
      {/* <Drawer.Screen name="ExtraInformation" component={ExtraInformation} /> */}
    </Drawer.Navigator>
  );
}
