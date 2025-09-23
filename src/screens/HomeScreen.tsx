import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBox from "../components/HeaderBox";
import StatsCard from "../components/StatsCard";
import BrandsContainer from "../components/BrandsContainer";
import OfferBanner from "../components/OfferBanner";
import { scale, screenWidth } from "../utils/dimen";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDeliveryPress = () => {
    console.log("Delivery tapped!");
    navigation.navigate("TopTabScreen");
    // Add navigation or other logic here
  };

  const handleDineInPress = () => {
    console.log("Dine-in tapped!");
    navigation.navigate("TopTabScreen");

    // Add navigation or other logic here
  };

  const handleRewardsPress = () => {
    console.log("Rewards card tapped!");
    // Add navigation to rewards page
  };

  const handleTierPress = () => {
    console.log("Tier card tapped!");
    // Add navigation to tier page
  };

  const handleViewDealsPress = () => {
    console.log("View Deals tapped!");
    // Add navigation to deals page
  };

  const handleBrandPress = (brandIndex) => {
    console.log(`Brand ${brandIndex} tapped!`);
    // Add navigation to specific brand
  };

  const handleOfferPress = (offerIndex) => {
    console.log(`Offer ${offerIndex} tapped!`);
    // Add navigation to specific offer
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderBox
        boxshadow={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4, // Android
        }}
      />

      <View style={{ backgroundColor: "#f5f5f5", marginTop: scale(16) }}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatsCard type="rewards" onPress={handleRewardsPress} />
          <StatsCard type="tier" onPress={handleTierPress} />
        </View>

        {/* Main Action Buttons */}
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

        {/* Offer Banner with Pagination */}
        <OfferBanner onOfferPress={handleOfferPress} />

        {/* Our Brands Section */}
        <BrandsContainer
          onBrandPress={handleBrandPress}
          onViewDealsPress={handleViewDealsPress}
          showViewDeals={true}
        />
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.dineInButton}>
          <Text style={styles.dineInButtonText}>Find Dine-in Spots</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loyaltyButton}>
          <Text style={styles.loyaltyButtonText}>Show Loyalty ID</Text>
        </TouchableOpacity>
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
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 4,
  },
  dineInButton: {
    width: screenWidth - scale(40),
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
