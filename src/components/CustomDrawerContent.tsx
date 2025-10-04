// import React, { useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { DrawerContentComponentProps } from "@react-navigation/drawer";
// import { scale } from "../utils/dimen";
// import BellIcon from "../../assets/svg/BellIcon";
// import DrawerStar from "../../assets/svg/DrawerStar";
// import FrontArrow from "../../assets/svg/FrontArrow";

// // Import your custom SVG logos
// import BookCateringLogo from "../../assets/svg/drawer/BookCateringLogo";
// import DealsLogo from "../../assets/svg/drawer/DealsLogo";
// import DeliveryLogo from "../../assets/svg/drawer/DeliveryLogo";
// import DineInLogo from "../../assets/svg/drawer/DineInLogo";
// import FAQLogo from "../../assets/svg/drawer/FAQLogo";
// import GetHelpLogo from "../../assets/svg/drawer/GetHelpLogo";
// import HomeLogo from "../../assets/svg/drawer/HomeLogo";
// import MyAddressesLogo from "../../assets/svg/drawer/MyAddressesLogo";
// import MyFavoritesLogo from "../../assets/svg/drawer/MyFavoritesLogo";
// import MyOrdersLogo from "../../assets/svg/drawer/MyOrdersLogo";
// import MyPaymentMethodsLogo from "../../assets/svg/drawer/MyPaymentMethodsLogo";
// import GiftCardsLogo from "../../assets/svg/drawer/GiftCardsLogo";
// import { MaterialIcons } from "@expo/vector-icons";
// import Thick from "../../assets/svg/drawer/Thick";
// import { getJSON } from "../utils/storage";

// interface DrawerItem {
//   name: string;
//   label: string;
//   icon: string;
// }

// const drawerItems: DrawerItem[] = [
//   { name: "Home", label: "Home", icon: "HomeLogo" },
//   { name: "GiftCards", label: "Gift Cards", icon: "GiftCardsLogo" },
//   {
//     name: "Delivery",
//     label: "Delivery & Pickup",
//     icon: "DeliveryLogo",
//   },
//   {
//     name: "DineIn",
//     label: "Dine-in",
//     icon: "DineInLogo",
//   },
//   {
//     name: "Deals",
//     label: "Deals",
//     icon: "DealsLogo",
//   },
//   {
//     name: "BookCatering",
//     label: "Book Catering",
//     icon: "BookCateringLogo",
//   },
//   {
//     name: "MyFavorites",
//     label: "My Favorites",
//     icon: "MyFavoritesLogo",
//   },
//   {
//     name: "MyOrders",
//     label: "My Orders",
//     icon: "MyOrdersLogo",
//   },
//   {
//     name: "MyAddresses",
//     label: "My Addresses",
//     icon: "MyAddressesLogo",
//   },
//   {
//     name: "MyPaymentMethods",
//     label: "My Payment Methods",
//     icon: "MyPaymentMethodsLogo",
//   },
//   {
//     name: "GetHelp",
//     label: "Get Help",
//     icon: "GetHelpLogo",
//   },
//   {
//     name: "FAQ",
//     label: "FAQ",
//     icon: "FAQLogo",
//   },
// ];

// const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
//   const [userName, setUserName] = React.useState<string>("");
//   const { navigation, state } = props;
//   const [languageDropdownOpen, setLanguageDropdownOpen] = React.useState(false);
//   const [selectedLanguage, setSelectedLanguage] = React.useState<"EN" | "AR">(
//     "EN"
//   );
//   useEffect(() => {
//     // Load user data from MMKV
//     const userData = getJSON<{
//       firstName?: string;
//       lastName?: string;
//     }>("user.profile");

//     if (userData?.firstName && userData?.lastName) {
//       setUserName(`${userData.firstName} ${userData.lastName}`);
//     } else {
//       setUserName(`Click to Login or \nRegister`);
//     }
//   }, []);

//   const toggleLanguageDropdown = () => {
//     setLanguageDropdownOpen(!languageDropdownOpen);
//   };

//   const renderIcon = (item: DrawerItem, isActive: boolean) => {
//     const iconColor = isActive ? "#F6B01F" : "#6D6D6D";
//     const iconSize = 20;

//     // Map icon names to components
//     const iconComponents = {
//       HomeLogo: HomeLogo,
//       GiftCardsLogo: GiftCardsLogo,
//       DeliveryLogo: DeliveryLogo,
//       DineInLogo: DineInLogo,
//       DealsLogo: DealsLogo,
//       BookCateringLogo: BookCateringLogo,
//       MyFavoritesLogo: MyFavoritesLogo,
//       MyOrdersLogo: MyOrdersLogo,
//       MyAddressesLogo: MyAddressesLogo,
//       MyPaymentMethodsLogo: MyPaymentMethodsLogo,
//       GetHelpLogo: GetHelpLogo,
//       FAQLogo: FAQLogo,
//     };

//     const IconComponent = iconComponents[item.icon];

//     if (IconComponent) {
//       return (
//         <IconComponent
//           width={iconSize}
//           height={iconSize}
//           color={iconColor}
//           fill={iconColor}
//         />
//       );
//     }

//     return null;
//   };

//   const renderDrawerItem = (item: DrawerItem, index: number) => {
//     // Get the current route name and params
//     const currentRoute = state.routes[state.index];
//     const currentRouteName = currentRoute.name;
//     const currentParams = currentRoute.params as
//       | { screen?: string }
//       | undefined;

//     // Determine if this item is active
//     let isActive = false;

//     if (item.name === "Delivery" || item.name === "DineIn") {
//       // For Delivery and DineIn, check if we're on TopTabScreen with matching params
//       isActive =
//         currentRouteName === "TopTabScreen" &&
//         currentParams?.screen === item.name;
//     } else if (item.name === "GiftCards") {
//       // For GiftCards, check if current route is GiftCards
//       isActive = currentRouteName === "GiftCards";
//     } else {
//       // For other items, check if the route name matches
//       isActive = currentRouteName === item.name;
//     }

//     const handlePress = () => {
//       if (item.name === "Delivery") {
//         navigation.navigate("TopTabScreen", { screen: "Delivery" });
//       } else if (item.name === "DineIn") {
//         navigation.navigate("TopTabScreen", { screen: "DineIn" });
//       } else if (item.name === "GiftCards") {
//         navigation.navigate("GiftCards", { screen: "GiftCardsMain" });
//       } else {
//         navigation.navigate(item.name as never);
//       }
//     };
//     // const renderDrawerItem = (item: DrawerItem, index: number) => {
//     //   const isActive = state.index === index;

//     //   const handlePress = () => {
//     //     if (item.name === "Delivery") {
//     //       navigation.navigate("TopTabScreen", { screen: "Delivery" });
//     //     } else if (item.name === "DineIn") {
//     //       navigation.navigate("TopTabScreen", { screen: "DineIn" });
//     //     } else if (item.name === "GiftCards") {
//     //       navigation.navigate("GiftCards", { screen: "GiftCardsMain" });
//     //     } else {
//     //       navigation.navigate(item.name as never);
//     //     }
//     //   };

//     return (
//       <TouchableOpacity
//         key={item.name}
//         style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
//         onPress={handlePress}
//       >
//         <View style={styles.iconContainer}>{renderIcon(item, isActive)}</View>
//         <View style={styles.textContainer}>
//           <View style={styles.textWithBadgeContainer}>
//             <Text
//               style={[
//                 styles.drawerItemText,
//                 isActive && styles.activeDrawerItemText,
//               ]}
//             >
//               {item.label}
//             </Text>
//             {(item.name === "BookCatering" || item.name === "GiftCards") && (
//               <View style={styles.newBadge}>
//                 <Text style={styles.newBadgeText}>NEW!</Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require("../../assets/image/logo.png")} />
//         <View style={styles.buttonWithBadge}>
//           <TouchableOpacity
//             style={styles.circularButton}
//             onPress={() => {
//               console.log("Button pressed");
//               navigation.navigate("Notification");
//             }}
//           >
//             <BellIcon />
//           </TouchableOpacity>
//           {/* Notification dot */}
//           <View style={styles.notificationDot} />
//         </View>
//       </View>
//       {/* userInfo */}
//       <TouchableOpacity
//         style={styles.userInfo}
//         onPress={() => {
//           // Check if user is logged in
//           const userData = getJSON<{
//             firstName?: string;
//             lastName?: string;
//           }>("user.profile");

//           if (userData?.firstName && userData?.lastName) {
//             // User is logged in - go to Profile
//             navigation.navigate("Profile");
//           } else {
//             // User is not logged in - go to Register
//             navigation.navigate("Register" as never);
//           }
//         }}
//       >
//         <DrawerStar />
//         <View style={styles.Logintext}>
//           <Text style={styles.userName}>{userName}</Text>
//           {userName && userName !== `Click to Login or \nRegister` && (
//             <Text style={styles.userDetails}>Click to see account details</Text>
//           )}
//         </View>
//         <View style={styles.arrowBox}>
//           <FrontArrow color="#017851" width={6} height={10} />
//         </View>
//       </TouchableOpacity>
//       <View style={styles.divider} />
//       {/* Navigation Items */}
//       <View style={styles.drawerItems}>
//         {drawerItems.map((item, index) => renderDrawerItem(item, index))}
//       </View>
//       <View style={styles.divider} />
//       <TouchableOpacity
//         style={styles.bottomContainer}
//         onPress={toggleLanguageDropdown}
//       >
//         <Image
//           source={
//             selectedLanguage === "EN"
//               ? require("../../assets/image/Usa.png")
//               : require("../../assets/image/Saudi.png")
//           }
//           style={styles.flag}
//         />
//         <Text style={styles.languageText}>{selectedLanguage}</Text>
//         <MaterialIcons
//           name="keyboard-arrow-down"
//           size={scale(24)}
//           color="#000"
//         />
//       </TouchableOpacity>
//       {/* Language Dropdown */}
//       {languageDropdownOpen && (
//         <View style={styles.languageDropdown}>
//           {/* English Option */}
//           <TouchableOpacity
//             style={styles.languageOption}
//             onPress={() => {
//               setSelectedLanguage("EN");
//               setLanguageDropdownOpen(false);
//             }}
//           >
//             {selectedLanguage === "EN" && <Thick style={styles.checkIcon} />}
//             <Image
//               source={require("../../assets/image/Usa.png")}
//               style={styles.flag}
//             />
//             <Text style={styles.languageOptionText}>English</Text>
//           </TouchableOpacity>

//           <View style={styles.dropdowndivider} />

//           {/* Arabic Option */}
//           <TouchableOpacity
//             style={styles.languageOption}
//             onPress={() => {
//               setSelectedLanguage("AR");
//               setLanguageDropdownOpen(false);
//             }}
//           >
//             {selectedLanguage === "AR" && <Thick style={styles.checkIcon} />}
//             <Image
//               source={require("../../assets/image/Saudi.png")}
//               style={styles.flag}
//             />
//             <Text style={styles.languageOptionText}>العربية</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     paddingStart: 16,
//     paddingEnd: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   circularButton: {
//     width: scale(40),
//     height: scale(40),
//     borderWidth: 1,
//     borderColor: "#E6E6E6",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonWithBadge: {
//     position: "relative",
//   },
//   notificationDot: {
//     backgroundColor: "#F6B01F",
//     width: scale(10),
//     height: scale(10),
//     borderRadius: 5,
//     position: "absolute",
//     right: 3,
//     top: -2,
//   },
//   userInfo: {
//     marginTop: 20,
//     marginStart: 19,
//     marginEnd: 19,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   Logintext: {
//     flexDirection: "column",
//     marginStart: 16,
//     justifyContent: "center",
//     alignItems: "flex-start",
//     flex: 1,
//   },
//   userName: {
//     fontFamily: "Rubik-Bold",
//     fontWeight: "700",
//     fontSize: scale(18),
//     color: "#017851",
//     textAlign: "left",
//   },
//   userDetails: {
//     color: "#717171",
//     fontFamily: "Rubik-Regular",
//     fontWeight: "400",
//     fontSize: 13,
//     textAlign: "left",
//   },
//   arrowBox: {
//     width: 6,
//     height: 10,
//     justifyContent: "flex-end",
//     alignItems: "flex-end",
//     position: "absolute",
//     right: 0,
//   },
//   divider: {
//     height: scale(1),
//     width: "90%",
//     backgroundColor: "#E6EAF1",
//     marginTop: scale(10),
//     marginStart: scale(16),
//   },
//   drawerItems: {
//     marginTop: scale(15),
//     paddingHorizontal: scale(16),
//   },
//   drawerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: scale(6),
//     paddingHorizontal: scale(16),
//     borderRadius: scale(8),
//     marginVertical: scale(2),
//   },
//   activeDrawerItem: {
//     backgroundColor: "#E8F5E8",
//   },
//   iconContainer: {
//     width: scale(24),
//     height: scale(24),
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: scale(16),
//   },
//   textContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   textWithBadgeContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "flex-start",
//     flexWrap: "wrap",
//   },
//   drawerItemText: {
//     fontSize: scale(17),
//     fontFamily: "Rubik-Regular",
//     color: "#4A4A4A",
//     flexShrink: 1,
//   },
//   activeDrawerItemText: {
//     color: "#017851",
//     fontFamily: "Rubik-Medium",
//   },
//   newBadgeText: {
//     fontFamily: "Rubik-SemiBold",
//     fontWeight: "600",
//     fontSize: scale(12),
//     color: "#017851",
//     textAlign: "center",
//     lineHeight: scale(11),
//   },
//   newBadge: {
//     backgroundColor: "transparent",
//     paddingHorizontal: scale(2),
//     paddingVertical: scale(1),
//     marginLeft: scale(0),
//     marginTop: scale(-2),
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: scale(12),
//   },
//   bottomContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     left: scale(35), // Made responsive
//     bottom: scale(110), // Made responsive
//     width: scale(77), // Made responsive
//     height: scale(38), // Made responsive
//     backgroundColor: "#E6EAF1",
//     borderRadius: scale(12), // Made responsive
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 4,
//   },
//   languageText: {
//     marginStart: scale(3),
//     fontSize: scale(12), // Made responsive
//     color: "#4A4A4A",
//     fontWeight: "500",
//   },
//   flag: {
//     height: scale(20),
//     width: scale(20),
//     borderRadius: scale(10),
//     resizeMode: "cover",
//     overflow: "hidden",
//   },
//   languageDropdown: {
//     position: "absolute",
//     bottom: scale(155), // Made responsive
//     left: scale(60), // Made responsive
//     width: scale(160), // Made responsive
//     height: scale(85), // Made responsive
//     backgroundColor: "#E6EAF1",
//     borderRadius: scale(12), // Made responsive
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 4,
//     paddingVertical: scale(8),
//   },
//   languageOption: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: scale(12),
//     paddingVertical: scale(8),
//   },
//   languageOptionText: {
//     fontSize: scale(14),
//     fontFamily: "Rubik-Regular",
//     color: "#4A4A4A",
//     fontWeight: "500",
//     marginLeft: scale(8),
//   },
//   checkIcon: {
//     marginStart: scale(-15), // Made responsive
//     marginEnd: scale(10), // Made responsive
//   },
//   dropdowndivider: {
//     backgroundColor: "#D1D1D1",
//     width: "100%",
//     height: 0.5,
//   },
// });

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
import { MaterialIcons } from "@expo/vector-icons";
import Thick from "../../assets/svg/drawer/Thick";
import { getJSON } from "../utils/storage";
import OrderTrackingLogo from "../../assets/svg/drawer/OrderTrackingLogo";

interface DrawerItem {
  name: string;
  label: string;
  icon: string;
  requiresAuth?: boolean;
  showOnlyWhenLoggedOut?: boolean;
}

const drawerItems: DrawerItem[] = [
  { name: "Home", label: "Home", icon: "HomeLogo" },
  { name: "GiftCards", label: "Gift Cards", icon: "GiftCardsLogo" },
  {
    name: "Delivery",
    label: "Delivery & Pickup",
    icon: "DeliveryLogo",
  },
  {
    name: "DineIn",
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
    name: "OrderTracking",
    label: "Order Tracking",
    icon: "OrderTrackingLogo",
    showOnlyWhenLoggedOut: true,
  },
  {
    name: "MyFavorites",
    label: "My Favorites",
    icon: "MyFavoritesLogo",
    requiresAuth: true,
  },
  {
    name: "MyOrders",
    label: "My Orders",
    icon: "MyOrdersLogo",
    requiresAuth: true,
  },
  {
    name: "MyAddresses",
    label: "My Addresses",
    icon: "MyAddressesLogo",
    requiresAuth: true,
  },
  {
    name: "MyPaymentMethods",
    label: "My Payment Methods",
    icon: "MyPaymentMethodsLogo",
    requiresAuth: true,
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
  const [userName, setUserName] = React.useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const { navigation, state } = props;
  const [languageDropdownOpen, setLanguageDropdownOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<"EN" | "AR">(
    "EN"
  );
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
      setUserName(`Click to Login or \nRegister`);
      setIsLoggedIn(false);
    }
  }, []);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

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
              {item.label}
            </Text>
            {(item.name === "BookCatering" || item.name === "GiftCards") && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW!</Text>
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
            // User is not logged in - go to Register
            navigation.navigate("Register" as never);
          }
        }}
      >
        <DrawerStar />
        <View style={styles.Logintext}>
          <Text style={styles.userName}>{userName}</Text>
          {userName && userName !== `Click to Login or \nRegister` && (
            <Text style={styles.userDetails}>Click to see account details</Text>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: scale(35),
    bottom: scale(110),
    width: scale(77),
    height: scale(38),
    backgroundColor: "#E6EAF1",
    borderRadius: scale(12),
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
    fontSize: scale(12),
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
    bottom: scale(155),
    left: scale(60),
    width: scale(160),
    height: scale(85),
    backgroundColor: "#E6EAF1",
    borderRadius: scale(12),
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
    marginStart: scale(-15),
    marginEnd: scale(10),
  },
  dropdowndivider: {
    backgroundColor: "#D1D1D1",
    width: "100%",
    height: 0.5,
  },
});

export default CustomDrawerContent;
