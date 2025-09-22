// DrawerNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { DrawerParamList } from "../types";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        overlayColor: "tarnsparent",
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
