// App.web.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Logo from "../assets/svg/Logo";
import BellIcon from "../assets/svg/BellIcon";
import SearchIcon from "../assets/svg/SearchIcon";
import Cart from "../assets/svg/Cart.web";
import BrandsContainer from "./components/BrandsContainer";
import DealsSection from "./components/DealsSection.web";
import { scale } from "./utils/dimen";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [activeTab, setActiveTab] = useState("Delivery");

  const dealsData = [
    {
      id: 1,
      image: require("../assets/image/Dealsoftheday1.png"),
      badge: "Online & Dine-in",
      badgeWidth: scale(93),
      title: "Piatto",
      subtitle: "Earn Double Points",
      description: "Pick up your order yourself to earn double points",
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.greenBar}>
        <View style={styles.leftSection}>
          <View style={styles.whiteBox}>
            <View style={styles.dot} />
            <Text style={styles.text}>Open Now!</Text>
          </View>
          <Text style={styles.timeText}>Today 11:00 - 00:00</Text>
        </View>

        <View style={styles.menuContainer}>
          {[
            "Delivery",
            "Dine-in",
            "Deals",
            "Book Catering",
            "Earn Points",
            "Order Tracking",
            "Get Help",
            "English",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setActiveTab(item)}
              style={styles.menuItem}
            >
              <Text
                style={[
                  styles.menuText,
                  activeTab === item && { color: "#FFD700" },
                ]}
              >
                {item}
              </Text>
              {item === "English" && (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color="#fff"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* WHITE BAR */}
      <View style={styles.whiteBar}>
        <Image
          source={require("../assets/image/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Entypo name="location-pin" size={24} color="#017851" />
            <Text>Door Delivery: الشواطئ, 3221</Text>
          </View>
          <AntDesign name="right" size={15} color="#017851" />
        </View>

        <View style={styles.LoginSingupcontainer}>
          <Text style={styles.loginText}>Login/Register</Text>
        </View>

        <View style={styles.circularContainer}>
          <BellIcon />
          <View style={styles.notificationDot} />
        </View>
        <View style={styles.circularContainer}>
          <SearchIcon />
        </View>
        <View style={styles.circularContainer}>
          <Cart />
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.brandsWrapper}>
          <BrandsContainer showViewDeals onBrandPress={() => {}} />
        </View>

        <View style={styles.DealsSection}>
          <DealsSection
            title="Deals of the Day!"
            dealsData={dealsData}
            onDealPress={() => {}}
          />
          <Text style={styles.deliveringText}>Delivering to you</Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View>
        <View style={styles.footer}>
          <Logo />
          <Text style={styles.footerText}>Get the App</Text>
        </View>
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>
            ©2024 Sufra Rewards. All Rights Reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((_, rt) => ({
  container: {
    flex: 1,
    backgroundColor: {
      xs: "#ffffff",
      sm: "#f8f8f8",
      md: "#f5f5f5",
      lg: "#f2f2f2",
      xl: "#eeeeee",
    },
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
  },

  greenBar: {
    backgroundColor: "#007852",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    alignItems: "center",
    justifyContent: "space-between",
    height: {
      xs: 80,
      md: 50,
    },
    paddingHorizontal: {
      xs: 16,
      sm: 24,
      md: 80,
      lg: 140,
      xl: 240,
    },
    flexWrap: "wrap",
  },

  whiteBar: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    alignItems: "center",
    justifyContent: "space-between",
    height: {
      xs: 120,
      md: 90,
    },
    paddingHorizontal: {
      xs: 16,
      sm: 24,
      md: 80,
      lg: 140,
      xl: 240,
    },
    gap: {
      xs: 8,
      md: 0,
    },
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  whiteBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#337654",
  },

  text: {
    fontWeight: "500",
    fontSize: 14,
    color: "#337654",
  },

  timeText: {
    fontWeight: "400",
    fontSize: 14,
    color: "#FFFFFF",
  },

  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: {
      xs: 8,
      md: 16,
    },
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  menuText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  logoImage: { height: 60, aspectRatio: 1 },

  locationContainer: {
    width: {
      xs: "90%",
      md: 636,
    },
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 6,
    backgroundColor: "#F7F7F8",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  LoginSingupcontainer: {
    borderWidth: 1,
    borderColor: "#017851",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: {
      xs: 12,
      md: 24,
    },
    height: 46,
  },

  loginText: {
    color: "#017851",
    fontWeight: "600",
    fontSize: 16,
  },

  circularContainer: {
    width: 46,
    height: 46,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  brandsWrapper: {
    marginHorizontal: {
      xs: 16,
      md: 100,
      lg: 180,
      xl: 240,
    },
  },

  DealsSection: {
    marginHorizontal: {
      xs: 16,
      md: 100,
      lg: 180,
      xl: 240,
    },
  },

  deliveringText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#4A4A4A",
    marginTop: {
      xs: 16,
      md: 32,
    },
  },

  footer: {
    backgroundColor: "#017851",
    paddingHorizontal: {
      xs: 16,
      md: 100,
      lg: 180,
      xl: 240,
    },
    paddingVertical: 24,
    flexDirection: {
      xs: "column",
      md: "row",
    },
    alignItems: "center",
    justifyContent: "space-between",
    gap: {
      xs: 8,
      md: 0,
    },
  },

  footerText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  copyrightSection: {
    backgroundColor: "#2B6749",
    paddingHorizontal: {
      xs: 16,
      md: 100,
      lg: 180,
      xl: 240,
    },
    height: 34,
    justifyContent: "center",
  },

  copyrightText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 12,
  },

  notificationDot: {
    backgroundColor: "#F6B01F",
    width: scale(10),
    height: scale(10),
    borderRadius: 5,
    position: "absolute",
    right: 0,
    top: 0,
  },

  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 20 },
}));
