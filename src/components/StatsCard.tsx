import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { scaleHeightSize, scaleWidthSize } from "../utils/responsive";
import FrontArrow from "../../assets/svg/FrontArrow";
import Star from "../../assets/svg/Star";

const StatsCard = ({ type, onPress }) => {
  const renderRewardsCard = () => (
    <TouchableOpacity
      style={styles.statsCard}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel="My Rewards card"
      accessibilityHint="Tap to view rewards details"
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>My Rewards</Text>
        <FrontArrow />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.pointsText}>32.101 Pt</Text>
        <Text style={styles.conversionText}>{"  "}/ 160 SR</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTierCard = () => (
    <TouchableOpacity
      style={styles.statsCard}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel="My Tier card"
      accessibilityHint="Tap to view tier details"
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>My Tier</Text>
        <FrontArrow />
      </View>
      <View style={styles.tierContent}>
        <Star />
        <Star />
        <Star />
        <Text style={styles.tierText}>Legend</Text>
      </View>
    </TouchableOpacity>
  );

  return type === "rewards" ? renderRewardsCard() : renderTierCard();
};

const styles = StyleSheet.create({
  statsCard: {
    height: scaleHeightSize(55),
    width: scaleWidthSize(173),
    backgroundColor: "#017851",
    borderRadius: 6,
    padding: 10,
    gap: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontWeight: "400",
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 2,
  },
  pointsText: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: 15,
    color: "#ffffff",
  },
  conversionText: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: 13,
    color: "#ffffff",
    textAlign: "justify",
  },
  tierContent: {
    flexDirection: "row",
    gap: 5,
    marginTop: 2,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tierText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    alignSelf: "center",
  },
});

export default StatsCard;
