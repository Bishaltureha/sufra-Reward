import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { scale } from "../utils/dimen";
import BellIcon from "../../assets/svg/BellIcon";
import DrawerStar from "../../assets/svg/DrawerStar";
import FrontArrow from "../../assets/svg/FrontArrow";

import BookCateringLogo from "../../assets/svg/drawer/BookCateringLogo";
import DealsLogo from "../../assets/svg/drawer/DealsLogo";
import DeliveryLogo from "../../assets/svg/drawer/DeliveryLogo";
import DineInLogo from "../../assets/svg/drawer/DineInLogo";
import FAQLogo from "../../assets/svg/drawer/FAQLogo";
import GetHelpLogo from "../../assets/svg/drawer/GetHelpLogo";
import HomeLogo from "../../assets/svg/drawer/HomeLogo";
import MyAddressesLogo from "../../assets/svg/drawer/MyAddressesLogo";
import MyFavoritesLogo from "../../assets/svg/drawer/MyFavoritesLogo";
import MyOrdersLogo from "../../assets/svg/drawer/MyOrdersLogo";
import MyPaymentMethodsLogo from "../../assets/svg/drawer/MyPaymentMethodsLogo";
import GiftCardsLogo from "../../assets/svg/drawer/GiftCardsLogo";
import OrderTrackingLogo from "../../assets/svg/drawer/OrderTrackingLogo";

import { useLocalization } from "../context/LocalizationContext";
import LanguageSelector from "./LanguageSelector";

// ✅ Redux imports
import { useAppSelector } from "../store/hooks";

const WHATSAPP_NUMBER = "+91 93098 59668";
const openWhatsApp = () => {
  const message = "Hi, I'm interested in catering services.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(message)}`;
  Linking.openURL(whatsappUrl).catch(() => {
    console.log("WhatsApp is not installed on this device.");
  });
};

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation, state } = props;
  const { t } = useLocalization();

  // ✅ Redux user data (persisted via MMKV)
  const user = useAppSelector((state) => state.user.data);
  const isLoggedIn = useAppSelector((state) => state.user.isAuthenticated);

  const userName =
    user?.name && user.name.trim().length > 0
      ? user.name
      : t("drawer.loginOrRegister");

  const drawerItems = [
    { name: "Home", translationKey: "drawer.home", icon: HomeLogo },
    {
      name: "GiftCards",
      translationKey: "drawer.giftCards",
      icon: GiftCardsLogo,
    },
    { name: "Delivery", translationKey: "drawer.delivery", icon: DeliveryLogo },
    { name: "DineIn", translationKey: "drawer.dineIn", icon: DineInLogo },
    { name: "Deals", translationKey: "drawer.deals", icon: DealsLogo },
    {
      name: "BookCatering",
      translationKey: "drawer.bookCatering",
      icon: BookCateringLogo,
    },
    {
      name: "OrderTracking",
      translationKey: "drawer.orderTracking",
      icon: OrderTrackingLogo,
      showOnlyWhenLoggedOut: true,
    },
    {
      name: "MyFavorites",
      translationKey: "drawer.myFavorites",
      icon: MyFavoritesLogo,
      requiresAuth: true,
    },
    {
      name: "MyOrders",
      translationKey: "drawer.myOrders",
      icon: MyOrdersLogo,
      requiresAuth: true,
    },
    {
      name: "MyAddresses",
      translationKey: "drawer.myAddresses",
      icon: MyAddressesLogo,
      requiresAuth: true,
    },
    {
      name: "MyPaymentMethods",
      translationKey: "drawer.myPaymentMethods",
      icon: MyPaymentMethodsLogo,
      requiresAuth: true,
    },
    { name: "GetHelp", translationKey: "drawer.getHelp", icon: GetHelpLogo },
    { name: "FAQ", translationKey: "drawer.faq", icon: FAQLogo },
  ];

  const renderDrawerItem = (item, index) => {
    if (item.requiresAuth && !isLoggedIn) return null;
    if (item.showOnlyWhenLoggedOut && isLoggedIn) return null;

    const currentRoute = state.routes[state.index];
    const currentRouteName = currentRoute.name;
    const currentParams = currentRoute.params as
      | { screen?: string }
      | undefined;

    let isActive = false;
    if (item.name === "Delivery" || item.name === "DineIn") {
      isActive =
        currentRouteName === "TopTabScreen" &&
        currentParams?.screen === item.name;
    } else {
      isActive = currentRouteName === item.name;
    }

    const handlePress = () => {
      if (item.name === "BookCatering") {
        openWhatsApp();
      } else if (item.name === "Delivery" || item.name === "DineIn") {
        navigation.navigate("TopTabScreen", { screen: item.name });
      } else {
        navigation.navigate(item.name as never);
      }
    };

    const IconComponent = item.icon;
    const color = isActive ? "#017851" : "#6D6D6D";

    return (
      <TouchableOpacity
        key={index}
        style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
        onPress={handlePress}
      >
        <IconComponent width={22} height={22} color={color} fill={color} />
        <Text
          style={[
            styles.drawerItemText,
            isActive && styles.activeDrawerItemText,
          ]}
        >
          {t(item.translationKey)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/image/logo.png")} />
        <TouchableOpacity
          style={styles.circularButton}
          onPress={() => navigation.navigate("Notification")}
        >
          <BellIcon />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() =>
          isLoggedIn
            ? navigation.navigate("Profile")
            : navigation.navigate("AuthStack", { screen: "Login" })
        }
      >
        <DrawerStar />
        <View style={styles.Logintext}>
          <Text style={styles.userName}>{userName}</Text>
          {isLoggedIn && (
            <Text style={styles.userDetails}>{t("drawer.accountDetails")}</Text>
          )}
        </View>
        <View style={styles.arrowBox}>
          <FrontArrow color="#017851" width={6} height={10} />
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />
      <View style={styles.drawerItems}>
        {drawerItems.map(renderDrawerItem)}
      </View>
      <View style={styles.divider} />

      {/* Language Selector */}
      <View style={styles.bottomContainer}>
        <LanguageSelector
          containerStyle={styles.languageSelectorContainer}
          dropdownStyle={styles.languageSelectorDropdown}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circularButton: {
    width: scale(40),
    height: scale(40),
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    backgroundColor: "#F6B01F",
    width: scale(10),
    height: scale(10),
    borderRadius: 5,
    position: "absolute",
    right: 3,
    top: -2,
  },
  userInfo: {
    marginTop: 20,
    marginHorizontal: 19,
    flexDirection: "row",
    alignItems: "center",
  },
  Logintext: { flex: 1, marginStart: 16 },
  userName: {
    fontWeight: "700",
    fontSize: scale(18),
    color: "#017851",
  },
  userDetails: {
    color: "#717171",
    fontSize: 13,
  },
  arrowBox: {
    position: "absolute",
    right: 0,
  },
  divider: {
    height: 1,
    width: "90%",
    backgroundColor: "#E6EAF1",
    alignSelf: "center",
    marginVertical: scale(10),
  },
  drawerItems: {
    marginTop: scale(5),
    paddingHorizontal: scale(16),
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
  },
  activeDrawerItem: { backgroundColor: "#E8F5E8" },
  drawerItemText: {
    marginLeft: scale(16),
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  activeDrawerItemText: { color: "#017851", fontWeight: "600" },
  bottomContainer: {
    position: "absolute",
    left: scale(35),
    bottom: scale(35),
  },
  languageSelectorContainer: {
    width: scale(77),
    height: scale(38),
  },
  languageSelectorDropdown: {
    bottom: scale(42),
    left: scale(25),
    width: scale(160),
    height: scale(85),
  },
});

export default CustomDrawerContent;
