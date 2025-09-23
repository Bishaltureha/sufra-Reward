import { StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "../utils/dimen";
import StatsCard from "../components/StatsCard";
import BrandsContainer from "../components/BrandsContainer";

const DeliveryContent = () => {
  const handleRewardsPress = () => {
    console.log("Rewards card tapped!");
    // TODO: Add navigation to rewards page
  };

  const handleTierSmallPress = () => {
    console.log("Tier card tapped!");
    // TODO: Add navigation to tier page
  };

  return (
    <View style={styles.tabContent}>
      <View style={styles.statsContainer}>
        <StatsCard type="rewards" onPress={handleRewardsPress} />
        <StatsCard type="tierSmall" onPress={handleTierSmallPress} />
      </View>
      <BrandsContainer
        onBrandPress={(index) => console.log("Brand pressed:", index)}
        onViewDealsPress={() => console.log("View Deals pressed")}
        showViewDeals={false}
      />
    </View>
  );
};

export default DeliveryContent;

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: scale(16),
    justifyContent: "space-between",
    marginTop: scale(16),
    width: "100%",
    marginBottom: scale(16),
  },
  contentText: {
    fontSize: 18,
    fontWeight: "500",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
});
