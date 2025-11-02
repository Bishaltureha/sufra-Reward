import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBox from "../components/HeaderBox";
import StatsCard from "../components/StatsCard";
import BrandsContainer from "../components/BrandsContainer";
import OfferBanner from "../components/OfferBanner";
import { scale, screenWidth } from "../utils/dimen";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { DrawerParamList, MainStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, "Home">,
  DrawerNavigationProp<DrawerParamList>
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDeliveryPress = () => {
    console.log("Delivery tapped!");
    navigation.navigate("TopTabScreen", { screen: "Delivery" });
  };

  const handleDineInPress = () => {
    console.log("Dine-in tapped!");

    navigation.navigate("TopTabScreen", { screen: "DineIn" });
  };

  const handleRewardsPress = () => {
    console.log("Rewards card tapped!");
    navigation.navigate("Loyalty", { initialTab: "transaction" });
  };

  const handleTierPress = () => {
    console.log("Tier card tapped!");
    navigation.navigate("Loyalty", { initialTab: "tier" });
  };

  const handleViewDealsPress = () => {
    console.log("View Deals tapped!");
    navigation.navigate("Deals");
  };

  const handleBrandPress = (brandIndex: any) => {
    console.log(`Brand ${brandIndex} tapped!`);
  };

  const handleOfferPress = (offerIndex: any) => {
    console.log(`Offer ${offerIndex} tapped!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#fff" }}>
        <HeaderBox
          boxshadow={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        />
        <View
          style={{
            height: Platform.OS === "android" ? 0 : 0,
            backgroundColor: "rgba(0,0,0,1)",
          }}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "#f5f5f5",
            paddingTop: scale(16),
            paddingBottom: scale(16),
          }}
        >
          <View style={styles.statsContainer}>
            <StatsCard type="rewards" onPress={handleRewardsPress} />
            <StatsCard type="tier" onPress={handleTierPress} />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.imgButton}
              onPress={handleDeliveryPress}
              activeOpacity={0.8}
              accessibilityLabel="Delivery option"
              accessibilityHint="Tap to select delivery service"
            >
              <Image
                style={styles.buttonImage}
                source={require("../../assets/image/delivery_en.png")}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imgButton}
              onPress={handleDineInPress}
              activeOpacity={0.8}
              accessibilityLabel="Dine-in option"
              accessibilityHint="Tap to select dine-in service"
            >
              <Image
                style={styles.buttonImage}
                source={require("../../assets/image/dinein_en.png")}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <OfferBanner onOfferPress={handleOfferPress} />

          <BrandsContainer
            onBrandPress={handleBrandPress}
            onViewDealsPress={handleViewDealsPress}
            showViewDeals={true}
          />
        </View>
      </ScrollView>

      {/* Bottom buttons with shadow - same structure as header */}
      <View style={{}}>
        <View
          style={{
            height: Platform.OS === "android" ? 0 : 0,
            backgroundColor: "rgba(0,0,0,1)",
          }}
        />
        <View style={styles.bottomButtonsContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <TouchableOpacity
              style={styles.dineInButton}
              onPress={() => navigation.navigate("FindStores")}
            >
              <Text style={styles.dineInButtonText}>Find Dine-in Spots</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dineInButton}
              onPress={() => navigation.navigate("GiftCards")}
            >
              <Text style={styles.dineInButtonText}>Buy Gift Cards</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loyaltyButton}
            onPress={() => navigation.navigate("Loyalty")}
          >
            <Text style={styles.loyaltyButtonText}>Show Loyalty ID</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: scale(160),
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: scale(16),
    justifyContent: "space-between",
    marginBottom: scale(20),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
  },
  imgButton: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  buttonImage: {
    width: screenWidth * 0.5 - scale(24),
    height: screenWidth * 0.5 - scale(24),
    maxHeight: scale(200),
    maxWidth: scale(200),
  },
  bottomButtonsContainer: {
    width: "100%",
    height: scale(138),
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dineInButton: {
    width: (screenWidth - scale(50)) / 2,
    height: scale(52),
    borderRadius: 5,
    backgroundColor: "#017851",
    justifyContent: "center",
    alignItems: "center",
  },
  dineInButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Rubik-Medium",
    textAlign: "center",
  },
  loyaltyButton: {
    width: screenWidth - scale(40),
    height: scale(52),
    borderRadius: 5,
    backgroundColor: "#f5b01f",
    justifyContent: "center",
    alignItems: "center",
  },
  loyaltyButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Rubik-Medium",
    textAlign: "center",
  },
});
