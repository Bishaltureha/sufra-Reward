import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { DrawerParamList } from "../types";
import CustomDrawerContent from "../components/CustomDrawerContent";
import TopTabScreen from "./TopTabScreen";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: "transparent",
        swipeEnabled: true,
        drawerHideStatusBarOnOpen: true,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />

      <Drawer.Screen
        name="TopTabScreen"
        component={TopTabScreen}
        initialParams={{ screen: "Delivery" }}
        options={{ title: "Order" }}
      />
    </Drawer.Navigator>
  );
}
