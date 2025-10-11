// export default CustomDrawerContent;
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { scale } from "../utils/dimen";
import BellIcon from "../../assets/svg/BellIcon";
import DrawerStar from "../../assets/svg/DrawerStar";
import FrontArrow from "../../assets/svg/FrontArrow";

// Import your custom SVG logos
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
import { getJSON } from "../utils/storage";
import OrderTrackingLogo from "../../assets/svg/drawer/OrderTrackingLogo";
import { useLocalization } from "../context/LocalizationContext";
import LanguageSelector from "./LanguageSelector";

interface DrawerItem {
  name: string;
  translationKey: string;
  icon: string;
  requiresAuth?: boolean;
  showOnlyWhenLoggedOut?: boolean;
}

const drawerItems: DrawerItem[] = [
  { name: "Home", translationKey: "drawer.home", icon: "HomeLogo" },
  {
    name: "GiftCards",
    translationKey: "drawer.giftCards",
    icon: "GiftCardsLogo",
  },
  {
    name: "Delivery",
    translationKey: "drawer.delivery",
    icon: "DeliveryLogo",
  },
  {
    name: "DineIn",
    translationKey: "drawer.dineIn",
    icon: "DineInLogo",
  },
  {
    name: "Deals",
    translationKey: "drawer.deals",
    icon: "DealsLogo",
  },
  {
    name: "BookCatering",
    translationKey: "drawer.bookCatering",
    icon: "BookCateringLogo",
  },
  {
    name: "OrderTracking",
    translationKey: "drawer.orderTracking",
    icon: "OrderTrackingLogo",
    showOnlyWhenLoggedOut: true,
  },
  {
    name: "MyFavorites",
    translationKey: "drawer.myFavorites",
    icon: "MyFavoritesLogo",
    requiresAuth: true,
  },
  {
    name: "MyOrders",
    translationKey: "drawer.myOrders",
    icon: "MyOrdersLogo",
    requiresAuth: true,
  },
  {
    name: "MyAddresses",
    translationKey: "drawer.myAddresses",
    icon: "MyAddressesLogo",
    requiresAuth: true,
  },
  {
    name: "MyPaymentMethods",
    translationKey: "drawer.myPaymentMethods",
    icon: "MyPaymentMethodsLogo",
    requiresAuth: true,
  },
  {
    name: "GetHelp",
    translationKey: "drawer.getHelp",
    icon: "GetHelpLogo",
  },
  {
    name: "FAQ",
    translationKey: "drawer.faq",
    icon: "FAQLogo",
  },
];

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [userName, setUserName] = React.useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const { navigation, state } = props;
  const { t } = useLocalization();

  useEffect(() => {
    // Load user data from MMKV
    const userData = getJSON<{
      firstName?: string;
      lastName?: string;
    }>("user.profile");

    if (userData?.firstName && userData?.lastName) {
      setUserName(`${userData.firstName} ${userData.lastName}`);
      setIsLoggedIn(true);
    } else {
      setUserName(t("drawer.loginOrRegister"));
      setIsLoggedIn(false);
    }
  }, []);

  const renderIcon = (item: DrawerItem, isActive: boolean) => {
    const iconColor = isActive ? "#F6B01F" : "#6D6D6D";
    const iconSize = 20;

    // Map icon names to components
    const iconComponents = {
      HomeLogo: HomeLogo,
      GiftCardsLogo: GiftCardsLogo,
      DeliveryLogo: DeliveryLogo,
      DineInLogo: DineInLogo,
      DealsLogo: DealsLogo,
      BookCateringLogo: BookCateringLogo,
      OrderTrackingLogo: OrderTrackingLogo,
      MyFavoritesLogo: MyFavoritesLogo,
      MyOrdersLogo: MyOrdersLogo,
      MyAddressesLogo: MyAddressesLogo,
      MyPaymentMethodsLogo: MyPaymentMethodsLogo,
      GetHelpLogo: GetHelpLogo,
      FAQLogo: FAQLogo,
    };

    const IconComponent = iconComponents[item.icon];

    if (IconComponent) {
      return (
        <IconComponent
          width={iconSize}
          height={iconSize}
          color={iconColor}
          fill={iconColor}
        />
      );
    }

    return null;
  };

  const renderDrawerItem = (item: DrawerItem, index: number) => {
    // Skip rendering if item requires authentication and user is not logged in
    if (item.requiresAuth && !isLoggedIn) {
      return null;
    }

    // Skip rendering if item should only show when logged out and user is logged in
    if (item.showOnlyWhenLoggedOut && isLoggedIn) {
      return null;
    }

    // Get the current route name and params
    const currentRoute = state.routes[state.index];
    const currentRouteName = currentRoute.name;
    const currentParams = currentRoute.params as
      | { screen?: string }
      | undefined;

    // Determine if this item is active
    let isActive = false;

    if (item.name === "Delivery" || item.name === "DineIn") {
      // For Delivery and DineIn, check if we're on TopTabScreen with matching params
      isActive =
        currentRouteName === "TopTabScreen" &&
        currentParams?.screen === item.name;
    } else if (item.name === "GiftCards") {
      // For GiftCards, check if current route is GiftCards
      isActive = currentRouteName === "GiftCards";
    } else {
      // For other items, check if the route name matches
      isActive = currentRouteName === item.name;
    }

    const handlePress = () => {
      if (item.name === "Delivery") {
        navigation.navigate("TopTabScreen", { screen: "Delivery" });
      } else if (item.name === "DineIn") {
        navigation.navigate("TopTabScreen", { screen: "DineIn" });
      } else if (item.name === "GiftCards") {
        navigation.navigate("GiftCards", { screen: "GiftCardsMain" });
      } else {
        navigation.navigate(item.name as never);
      }
    };

    return (
      <TouchableOpacity
        key={item.name}
        style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
        onPress={handlePress}
      >
        <View style={styles.iconContainer}>{renderIcon(item, isActive)}</View>
        <View style={styles.textContainer}>
          <View style={styles.textWithBadgeContainer}>
            <Text
              style={[
                styles.drawerItemText,
                isActive && styles.activeDrawerItemText,
              ]}
            >
              {t(item.translationKey)}
            </Text>
            {(item.name === "BookCatering" || item.name === "GiftCards") && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>{t("drawer.new")}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/image/logo.png")} />
        <View style={styles.buttonWithBadge}>
          <TouchableOpacity
            style={styles.circularButton}
            onPress={() => {
              console.log("Button pressed");
              navigation.navigate("Notification");
            }}
          >
            <BellIcon />
          </TouchableOpacity>
          {/* Notification dot */}
          <View style={styles.notificationDot} />
        </View>
      </View>
      {/* userInfo */}
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => {
          // Check if user is logged in
          const userData = getJSON<{
            firstName?: string;
            lastName?: string;
          }>("user.profile");

          if (userData?.firstName && userData?.lastName) {
            // User is logged in - go to Profile
            navigation.navigate("Profile");
          } else {
            // User is not logged in - go to AuthStack Register
            navigation.navigate("AuthStack", { screen: "Register" });
          }
        }}
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
      {/* Navigation Items */}
      <View style={styles.drawerItems}>
        {drawerItems.map((item, index) => renderDrawerItem(item, index))}
      </View>
      <View style={styles.divider} />
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingStart: 16,
    paddingEnd: 16,
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
  buttonWithBadge: {
    position: "relative",
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
    marginStart: 19,
    marginEnd: 19,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  Logintext: {
    flexDirection: "column",
    marginStart: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  userName: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(18),
    color: "#017851",
    textAlign: "left",
  },
  userDetails: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: 13,
    textAlign: "left",
  },
  arrowBox: {
    width: 6,
    height: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
  },
  divider: {
    height: scale(1),
    width: "90%",
    backgroundColor: "#E6EAF1",
    marginTop: scale(10),
    marginStart: scale(16),
  },
  drawerItems: {
    marginTop: scale(15),
    paddingHorizontal: scale(16),
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginVertical: scale(2),
  },
  activeDrawerItem: {
    backgroundColor: "#E8F5E8",
  },
  iconContainer: {
    width: scale(24),
    height: scale(24),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(16),
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textWithBadgeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  drawerItemText: {
    fontSize: scale(17),
    fontFamily: "Rubik-Regular",
    color: "#4A4A4A",
    flexShrink: 1,
  },
  activeDrawerItemText: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
  },
  newBadgeText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(12),
    color: "#017851",
    textAlign: "center",
    lineHeight: scale(11),
  },
  newBadge: {
    backgroundColor: "transparent",
    paddingHorizontal: scale(2),
    paddingVertical: scale(1),
    marginLeft: scale(0),
    marginTop: scale(-2),
    alignItems: "center",
    justifyContent: "center",
    minHeight: scale(12),
  },
  bottomContainer: {
    position: "absolute",
    left: scale(35),
    bottom: scale(110),
  },
  languageSelectorContainer: {
    width: scale(77),
    height: scale(38),
  },
  languageSelectorDropdown: {
    bottom: scale(45),
    left: scale(25),
    width: scale(160),
    height: scale(85),
  },
});

export default CustomDrawerContent;
