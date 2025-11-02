//App.web.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Logo from "./assets/svg/Logo";
import BrandsContainer from "./src/components/BrandsContainer";
import SearchIcon from "./assets/svg/SearchIcon";
import Cart from "./assets/svg/Cart.web";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { scale } from "./src/utils/dimen";
import DealsSection from "./src/components/DealsSection.web";
import BellIcon from "./assets/svg/BellIcon";
const { width, height } = Dimensions.get("window");

export default function App() {
  const [activeTab, setActiveTab] = useState("Delivery");

  const dealsData = [
    {
      id: 1,
      image: require("./assets/image/Dealsoftheday1.png"),
      badge: "Online & Dine-in",
      badgeWidth: scale(93),
      title: "Piatto",
      subtitle: "Earn Double Points",
      description: "Pick up your order yourself to earn double points",
    },
    {
      id: 2,
      image: require("./assets/image/Dealsoftheday2.png"),
      badge: "Online Only",
      badgeWidth: scale(74),
      title: "Piatto Restaurant",
      subtitle: "Weekday Lunch Specials",
      description: "Choice of main course with free Soup & Sala... ",
    },
    {
      id: 3,
      image: require("./assets/image/Dealsoftheday3.png"),
      badge: "Online Only",
      badgeWidth: scale(74),
      title: "Piatto",
      subtitle: "Earn Double Points",
      description: "Pick up your order yourself to earn double points",
    },
    {
      id: 4,
      image: require("./assets/image/Dealsoftheday4.png"),
      badge: "Online Only",
      badgeWidth: scale(74),
      title: "Piatto",
      subtitle: "Earn Double Points",
      description: "Pick up your order yourself to earn double points",
    },
  ];

  function handleBrandPress(index: number): void {
    console.log("Brand pressed at index:", index);
    // TODO: implement your logic here
  }
  const handleDealPress = (deal, index) => {
    console.log("Deal pressed:", deal.title, "at index:", index);
  };

  const handleViewAllPress = () => {
    // console.log("View All deals pressed");
    // navigation.navigate("Deals");
  };
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.greenBar}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <View style={styles.whiteBox}>
            <View style={styles.dot} />
            <Text style={styles.text}>Open Now!</Text>
          </View>
          <Text style={styles.timeText}>Today 11:00 - 00:00</Text>
        </View>

        {/* Right Section */}
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
              style={styles.menuItem}
              onPress={() => setActiveTab(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.menuText,
                  activeTab === item && {
                    color: "#FFD700",
                  },
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

      {/* WHITE BAR BELOW HEADER */}
      <View style={styles.whiteBar}>
        <Image
          source={require("./assets/image/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View style={styles.locationContainer}>
          <View
            style={{
              flexDirection: "row",
              gap: width * (40 / 1728),
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Entypo name="location-pin" size={24} color="#017851" />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Door Delivery: </Text>
              <Text>الشواطئ</Text>
              <Text>, 3221</Text>
            </View>
          </View>
          <AntDesign name="right" size={15} color="#017851" />
        </View>
        <View style={styles.LoginSingupcontainer}>
          <Text
            style={{
              color: "#017851",
              fontFamily: "Rubik-Medium",
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            Login/Register
          </Text>
        </View>
        <View style={styles.circularContainer}>
          <BellIcon />
          <View style={styles.notificationDot} />
        </View>
        <View
          style={[
            styles.circularContainer,
            { marginStart: width * (8 / 1728) },
          ]}
        >
          <SearchIcon />
        </View>
        <View
          style={[
            styles.circularContainer,
            { marginStart: width * (8 / 1728) },
          ]}
        >
          <Cart />
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* BRANDS CONTAINER */}
        <View style={styles.brandsWrapper}>
          <BrandsContainer
            onBrandPress={handleBrandPress}
            showViewDeals={true}
          />
        </View>
        <View style={styles.DealsSection}>
          <DealsSection
            title="Deals of the Day!"
            showViewAll={false}
            dealsData={dealsData}
            onDealPress={handleDealPress}
            onViewAllPress={handleViewAllPress}
            containerStyle={{ marginTop: scale(16) }}
          />
          <Text
            style={{
              fontFamily: "Rubik-SemiBold",
              fontWeight: "600",
              fontSize: 20,
              color: "#4A4A4A",
              marginTop: height * (32 / 1523),
            }}
          >
            Delivering to you
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER AND COPYRIGHT - Connected without gap */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  greenBar: {
    backgroundColor: "#007852",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: width * 0.143,
  },
  whiteBar: {
    width: "100%",
    height: 90,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: width * 0.143,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: height * (24 / 1523),
  },
  logoImage: {
    height: 60,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  LoginSingupcontainer: {
    width: width * (167 / 1728),
    height: 55,
    borderWidth: 1,
    borderColor: "#017851",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    marginStart: width * (104 / 1728),
  },
  locationContainer: {
    width: 636,
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 6,
    backgroundColor: "#F7F7F8",
    marginStart: width * (61 / 1728),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: width * (16 / 1728),
    justifyContent: "space-between",
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
    marginHorizontal: width * 0.143,
  },
  DealsSection: { marginHorizontal: width * 0.143 },
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
    gap: 16,
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
  footer: {
    height: (height * 190) / 1523,
    width: width,
    backgroundColor: "#017851",
    paddingHorizontal: width * (146 / 1728),
    paddingVertical: height * (28 / 1523),
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  footerText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: 14,
  },
  copyrightSection: {
    paddingHorizontal: width * (146 / 1728),
    backgroundColor: "#2B6749",
    width: width,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: height * (34 / 1523),
  },
  copyrightText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Regular",
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
});
