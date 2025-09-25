import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import EarnMorePointsSection from "../components/EarnMorePointsSection";
import DealsSection from "../components/DealsSection";
import StatsCard from "../components/StatsCard";
import QrCode from "../components/QrCode";
import { scale } from "../utils/dimen";
import NearbyDineInCard from "../components/NearbyDineInCard";

const DineInContent = () => {
  const dealsData = [
    {
      id: 1,
      image: require("../../assets/image/Dealsoftheday1.png"),
      badge: "Online & Dine-in",
      badgeWidth: scale(93),
      title: "Piatto",
      subtitle: "Earn Double Points",
      description: "Pick up your order yourself to earn double points",
    },
    {
      id: 2,
      image: require("../../assets/image/Dealsoftheday2.png"),
      badge: "Online Only",
      badgeWidth: scale(74),
      title: "Piatto Restaurant",
      subtitle: "Weekday Lunch Specials",
      description: "Choice of main course with free Soup & Sala... ",
    },
    {
      id: 3,
      image: require("../../assets/image/Dealsoftheday3.png"),
      badge: "Online Only",
      badgeWidth: scale(74),
      title: "Piatto",
      subtitle: "Earn Double Points",
      description: "Pick up your order yourself to earn double points",
    },
    {
      id: 4,
      image: require("../../assets/image/Dealsoftheday4.png"),
      badge: "Online Only",
      badgeWidth: scale(74),
      title: "Piatto",
      subtitle: "Earn Double Points",
      description: "Pick up your order yourself to earn double points",
    },
  ];

  const nearbyDineInData = [
    {
      id: 1,
      image: require("../../assets/image/NearbyDine-inSpots.png"),
      badgeText: "Weekday Lunch Specials",
      openTime: "9 pm",
      title: "Etoile Center",
      distance: "0.8 km away",
      address: "Al Naim District,\nPrince Sultan Rd, Al Naem, Jeddah",
      cuisines: "Piatto, Fire Grill, Uncle Moe's",
    },
    {
      id: 2,
      image: require("../../assets/image/NearbyDine-inSpots.png"),
      badgeText: "Weekday Lunch Specials",
      openTime: "9 pm",
      title: "Etoile Center",
      distance: "0.8 km away",
      address: "Al Naim District,\nPrince Sultan Rd, Al Naem, Jeddah",
      cuisines: "Piatto, Fire Grill, Uncle Moe's",
    },
    {
      id: 3,
      image: require("../../assets/image/NearbyDine-inSpots.png"),
      badgeText: "Weekday Lunch Specials",
      openTime: "9 pm",
      title: "Etoile Center",
      distance: "0.8 km away",
      address: "Al Naim District,\nPrince Sultan Rd, Al Naem, Jeddah",
      cuisines: "Piatto, Fire Grill, Uncle Moe's",
    },
    {
      id: 4,
      image: require("../../assets/image/NearbyDine-inSpots.png"),
      badgeText: "Weekday Lunch Specials",
      openTime: "9 pm",
      title: "Etoile Center",
      distance: "0.8 km away",
      address: "Al Naim District,\nPrince Sultan Rd, Al Naem, Jeddah",
      cuisines: "Piatto, Fire Grill, Uncle Moe's",
    },
    {
      id: 5,
      image: require("../../assets/image/NearbyDine-inSpots.png"),
      badgeText: "Weekday Lunch Specials",
      openTime: "9 pm",
      title: "Etoile Center",
      distance: "0.8 km away",
      address: "Al Naim District,\nPrince Sultan Rd, Al Naem, Jeddah",
      cuisines: "Piatto, Fire Grill, Uncle Moe's",
    },
  ];

  const handleDealPress = (deal, index) => {
    console.log("Deal pressed:", deal.title, "at index:", index);
  };

  const handleViewAllPress = () => {
    console.log("View All deals pressed");
  };

  const handleRewardsPress = () => {
    console.log("Rewards card tapped!");
  };

  const handleLegendPress = () => {
    console.log("Legend card tapped!");
  };

  const handleLoyaltyPress = () => {
    console.log("Loyalty ID tapped!");
  };

  const handleViewMapPress = () => {
    console.log("View Map pressed");
  };

  return (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.statsContainer}>
        <StatsCard
          type="rewards"
          onPress={handleRewardsPress}
          width={scale(140)}
        />
        <StatsCard type="tier" onPress={handleLegendPress} width={scale(140)} />

        <TouchableOpacity
          style={styles.loyaltyBox}
          onPress={handleLoyaltyPress}
        >
          <QrCode />
          <Text style={styles.loyaltyText}>Loyalty ID</Text>
        </TouchableOpacity>
      </View>

      <DealsSection
        title="Deals of the Day!"
        showViewAll={true}
        dealsData={dealsData}
        onDealPress={handleDealPress}
        onViewAllPress={handleViewAllPress}
        containerStyle={{ marginTop: scale(16) }}
      />

      {/* Nearby Dine-in Spots */}
      <View style={styles.nearbySection}>
        <View style={styles.dineInHeader}>
          <Text style={styles.dineInHeaderText}>Nearby Dine-in Spots</Text>
          <TouchableOpacity onPress={handleViewMapPress}>
            <Text style={styles.viewMapText}>View Map</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {nearbyDineInData.map((item) => (
            <NearbyDineInCard
              key={item.id}
              image={item.image}
              badgeText={item.badgeText}
              openTime={item.openTime}
              title={item.title}
              distance={item.distance}
              address={item.address}
              cuisines={item.cuisines}
            />
          ))}
        </ScrollView>
      </View>

      <EarnMorePointsSection containerStyle={undefined} />
    </ScrollView>
  );
};

export default DineInContent;

const styles = StyleSheet.create({
  tabContent: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: scale(16),
    justifyContent: "space-between",
    marginTop: scale(16),
    width: "100%",
    marginBottom: scale(16),
  },
  loyaltyBox: {
    backgroundColor: "#F6B01F",
    width: scale(62),
    height: scale(55),
    borderRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
    gap: scale(5),
  },
  loyaltyText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(10),
  },
  nearbySection: {
    marginTop: scale(20),
    marginHorizontal: scale(16),
  },
  dineInHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dineInHeaderText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
  },
  viewMapText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    textDecorationLine: "underline",
  },
  horizontalScroll: {
    marginTop: scale(16),
  },
});
