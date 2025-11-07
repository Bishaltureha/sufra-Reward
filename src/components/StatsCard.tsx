import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import FrontArrow from "../../assets/svg/FrontArrow";
import Star from "../../assets/svg/Star";
import SmallStar from "../../assets/svg/SmallStar";
import { scale, screenWidth } from "../utils/dimen";

interface StatsCardProps {
  type: "rewards" | "tier" | "tierSmall";
  onPress: () => void;
  width?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ type, onPress, width }) => {
  const renderRewardsCard = () => (
    <TouchableOpacity
      style={[styles.statsCard, styles.rewardsCard, width ? { width } : {}]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>My Rewards</Text>
        <FrontArrow width={scale(12)} height={scale(12)} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.pointsText}>32.101 Pt</Text>
        <Text style={styles.conversionText}> / 160 SR</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTierCard = () => (
    <TouchableOpacity
      style={[styles.statsCard, styles.tierCard, width ? { width } : {}]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>My Tier</Text>
        <FrontArrow width={scale(12)} height={scale(12)} />
      </View>

      <View style={styles.tierContent}>
        <Star width={scale(16)} height={scale(16)} style={styles.starIcon} />
        <Star width={scale(16)} height={scale(16)} style={styles.starIcon} />
        <Star width={scale(16)} height={scale(16)} style={styles.starIcon} />
        <Text style={styles.tierText}>Legend</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTierSmallCard = () => (
    <TouchableOpacity
      style={[styles.statsCard, styles.tierCard, width ? { width } : {}]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>My Tier</Text>
        <FrontArrow width={scale(12)} height={scale(12)} />
      </View>

      <View style={styles.tierContent}>
        <Star width={scale(16)} height={scale(16)} style={styles.starIcon} />
        <SmallStar width={scale(14)} height={scale(14)} style={styles.starIcon} />
        <SmallStar width={scale(14)} height={scale(14)} style={styles.starIcon} />
        <Text style={styles.tierText}>Star</Text>
      </View>
    </TouchableOpacity>
  );

  if (type === "rewards") return renderRewardsCard();
  if (type === "tier") return renderTierCard();
  return renderTierSmallCard();
};

const styles = StyleSheet.create({
  statsCard: {
    width: screenWidth * 0.5 - scale(24),
    maxWidth: scale(200),
    backgroundColor: "#017851",
    borderRadius: 6,
    paddingVertical: scale(8),
    paddingHorizontal: scale(10),
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: Platform.OS === "ios" ? 2 : 1,
  },
  pointsText: {
    fontFamily: "Rubik-Bold",
    fontSize: 15,
    color: "#ffffff",
    lineHeight: 18,
  },
  conversionText: {
    fontFamily: "Rubik-Bold",
    fontSize: 13,
    color: "#ffffff",
    textAlign: "left",
    lineHeight: 16,
  },
  tierContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: Platform.OS === "ios" ? 4 : 2,
  },
  starIcon: {
    marginRight: scale(4), // ✅ proper gap between stars
  },
  tierText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 15,
    color: "#ffffff",
    lineHeight: 18,
  },
  rewardsCard: {
    backgroundColor: "#017851",
  },
  tierCard: {
    backgroundColor: "#017851",
  },
});

export default StatsCard;
