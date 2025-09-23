import React from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import Thick from "../../assets/svg/drawer/Thick";

interface DrawerItem {
  name: string;
  label: string;
  icon: string;
}

const drawerItems: DrawerItem[] = [
  { name: "Home", label: "Home", icon: "HomeLogo" },
  {
    name: "DeliveryScreen",
    label: "Delivery & Pickup",
    icon: "DeliveryLogo",
  },
  {
    name: "DineInScreen",
    label: "Dine-in",
    icon: "DineInLogo",
  },
  {
    name: "Deals",
    label: "Deals",
    icon: "DealsLogo",
  },
  {
    name: "BookCatering",
    label: "Book Catering",
    icon: "BookCateringLogo",
  },
  {
    name: "MyFavorites",
    label: "My Favorites",
    icon: "MyFavoritesLogo",
  },
  {
    name: "MyOrders",
    label: "My Orders",
    icon: "MyOrdersLogo",
  },
  {
    name: "MyAddresses",
    label: "My Addresses",
    icon: "MyAddressesLogo",
  },
  {
    name: "MyPaymentMethods",
    label: "Payment Methods",
    icon: "MyPaymentMethodsLogo",
  },
  {
    name: "GetHelp",
    label: "Get Help",
    icon: "GetHelpLogo",
  },
  {
    name: "FAQ",
    label: "FAQ",
    icon: "FAQLogo",
  },
];

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation, state } = props;
  const [languageDropdownOpen, setLanguageDropdownOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<"EN" | "AR">(
    "EN"
  );
  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const renderIcon = (item: DrawerItem, isActive: boolean) => {
    const iconColor = isActive ? "#F6B01F" : "#6D6D6D";
    const iconSize = 20;

    // Map icon names to components
    const iconComponents = {
      HomeLogo: HomeLogo,
      DeliveryLogo: DeliveryLogo,
      DineInLogo: DineInLogo,
      DealsLogo: DealsLogo,
      BookCateringLogo: BookCateringLogo,
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
    const isActive = state.index === index;

    return (
      <TouchableOpacity
        key={item.name}
        style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
        onPress={() => navigation.navigate(item.name)}
      >
        <View style={styles.iconContainer}>{renderIcon(item, isActive)}</View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.drawerItemText,
              isActive && styles.activeDrawerItemText,
            ]}
          >
            {item.label}
          </Text>
          {item.name === "BookCatering" && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW!</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/image/logo.png")} />
        <View style={styles.buttonWithBadge}>
          <TouchableOpacity style={styles.circularButton}>
            <BellIcon />
          </TouchableOpacity>
          {/* Notification dot */}
          <View style={styles.notificationDot} />
        </View>
      </View>
      {/* userInfo */}
      <View style={styles.userInfo}>
        <DrawerStar />
        <View style={styles.Logintext}>
          <Text style={styles.userName}>Gokhan Demirel</Text>
          {/* <Text style={styles.userName}>Click to Login or {"\n"}Register </Text> */}
          <Text style={styles.userDetails}>Click to see account details</Text>
        </View>
        <View style={styles.arrowBox}>
          <FrontArrow color="#017851" width={6} height={10} />
        </View>
      </View>
      <View style={styles.divider} />

      {/* Navigation Items */}
      <View style={styles.drawerItems}>
        {drawerItems.map((item, index) => renderDrawerItem(item, index))}
      </View>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.bottomContainer}
        onPress={toggleLanguageDropdown}
      >
        <Image
          source={
            selectedLanguage === "EN"
              ? require("../../assets/image/Usa.png")
              : require("../../assets/image/Saudi.png")
          }
          style={styles.flag}
        />
        <Text style={styles.languageText}>{selectedLanguage}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={scale(24)}
          color="#000"
        />
      </TouchableOpacity>
      {/* Language Dropdown */}
      {languageDropdownOpen && (
        <View style={styles.languageDropdown}>
          {/* English Option */}
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              setSelectedLanguage("EN");
              setLanguageDropdownOpen(false);
            }}
          >
            {selectedLanguage === "EN" && <Thick style={styles.checkIcon} />}
            <Image
              source={require("../../assets/image/Usa.png")}
              style={styles.flag}
            />
            <Text style={styles.languageOptionText}>English</Text>
          </TouchableOpacity>

          <View style={styles.dropdowndivider} />

          {/* Arabic Option */}
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              setSelectedLanguage("AR");
              setLanguageDropdownOpen(false);
            }}
          >
            {selectedLanguage === "AR" && <Thick style={styles.checkIcon} />}
            <Image
              source={require("../../assets/image/Saudi.png")}
              style={styles.flag}
            />
            <Text style={styles.languageOptionText}>العربية</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginTop: scale(20),
    paddingHorizontal: scale(16),
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(8),
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
    justifyContent: "space-between",
  },
  drawerItemText: {
    fontSize: scale(17),
    fontFamily: "Rubik-Regular",
    color: "#4A4A4A",
    flex: 1,
  },
  activeDrawerItemText: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
  },
  newBadgeText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: 14,
    color: "#017851",
    textAlign: "center",
  },
  newBadge: { position: "absolute", right: 95, bottom: 7 },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 35,
    bottom: 110,
    width: 77,
    height: 38,
    backgroundColor: "#E6EAF1",
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  languageText: {
    marginStart: scale(3),
    fontSize: 12,
    color: "#4A4A4A",
    fontWeight: "500",
  },
  flag: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    resizeMode: "cover",
    overflow: "hidden",
  },
  languageDropdown: {
    position: "absolute",
    bottom: 155,
    left: 60,
    width: 160,
    height: 85,
    backgroundColor: "#E6EAF1",
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    paddingVertical: scale(8),
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
  },
  languageOptionText: {
    fontSize: scale(14),
    fontFamily: "Rubik-Regular",
    color: "#4A4A4A",
    fontWeight: "500",
    marginLeft: scale(8),
  },
  checkIcon: {
    marginStart: -15,
    marginEnd: 10,
  },
  dropdowndivider: {
    backgroundColor: "#D1D1D1",
    width: "100%",
    height: 0.5,
  },
});

export default CustomDrawerContent;
