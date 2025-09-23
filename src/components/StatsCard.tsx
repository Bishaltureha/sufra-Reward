import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FrontArrow from "../../assets/svg/FrontArrow";
import Star from "../../assets/svg/Star";
import SmallStar from "../../assets/svg/SmallStar";
import { scale, screenWidth } from "../utils/dimen";

interface StatsCardProps {
  type: "rewards" | "tier" | "tierSmall";
  onPress: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ type, onPress }) => {
  const renderRewardsCard = () => (
    <TouchableOpacity
      style={[styles.statsCard, styles.rewardsCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>My Rewards</Text>
        <FrontArrow />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.pointsText}>32.101 Pt</Text>
        <Text style={styles.conversionText}> / 160 SR</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTierCard = () => (
    <TouchableOpacity
      style={[styles.statsCard, styles.tierCard]}
      onPress={onPress}
      activeOpacity={0.8}
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

  const renderTierSmallCard = () => (
    <TouchableOpacity
      style={[styles.statsCard, styles.tierCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>My Tier</Text>
        <FrontArrow />
      </View>
      <View style={styles.tierContent}>
        <Star />
        <SmallStar />
        <SmallStar />
        <Text style={styles.tierText}>Star</Text>
      </View>
    </TouchableOpacity>
  );

  if (type === "rewards") return renderRewardsCard();
  if (type === "tier") return renderTierCard();
  return renderTierSmallCard(); // "tierSmall"
};
const styles = StyleSheet.create({
  statsCard: {
    height: scale(55),
    width: screenWidth * 0.5 - scale(24),
    maxWidth: scale(200),
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
  cardContent: { flexDirection: "row", alignItems: "flex-end", marginTop: 2 },
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
    gap: 4,
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
  rewardsCard: {
    backgroundColor: "#017851",
  },
  tierCard: {
    backgroundColor: "#017851",
  },
});
export default StatsCard;
