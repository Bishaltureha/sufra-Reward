// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import FrontArrow from "../../assets/svg/FrontArrow";
// import Star from "../../assets/svg/Star";
// import SmallStar from "../../assets/svg/SmallStar";
// import { scale, screenWidth } from "../utils/dimen";

// interface StatsCardProps {
//   type: "rewards" | "tier" | "tierSmall";
//   onPress: () => void;
//   width?: number;
// }

// const StatsCard: React.FC<StatsCardProps> = ({ type, onPress, width }) => {
//   const renderRewardsCard = () => (
//     <TouchableOpacity
//       style={[styles.statsCard, styles.rewardsCard, width ? { width } : {}]}
//       onPress={onPress}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardTitle}>My Rewards</Text>
//         <FrontArrow />
//       </View>
//       <View style={styles.cardContent}>
//         <Text style={styles.pointsText}>32.101 Pt</Text>
//         <Text style={styles.conversionText}> / 160 SR</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderTierCard = () => (
//     <TouchableOpacity
//       style={[styles.statsCard, styles.tierCard, width ? { width } : {}]}
//       onPress={onPress}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardTitle}>My Tier</Text>
//         <FrontArrow />
//       </View>
//       <View style={styles.tierContent}>
//         <Star />
//         <Star />
//         <Star />
//         <Text style={styles.tierText}>Legend</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderTierSmallCard = () => (
//     <TouchableOpacity
//       style={[styles.statsCard, styles.tierCard, width ? { width } : {}]}
//       onPress={onPress}
//       activeOpacity={0.8}
//     >
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardTitle}>My Tier</Text>
//         <FrontArrow />
//       </View>
//       <View style={styles.tierContent}>
//         <Star />
//         <SmallStar />
//         <SmallStar />
//         <Text style={styles.tierText}>Star</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   if (type === "rewards") return renderRewardsCard();
//   if (type === "tier") return renderTierCard();
//   return renderTierSmallCard();
// };

// const styles = StyleSheet.create({
//   statsCard: {
//     height: scale(55),
//     width: screenWidth * 0.5 - scale(24),
//     maxWidth: scale(200),
//     backgroundColor: "#017851",
//     borderRadius: 6,
//     padding: 10,
//     gap: 2,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   cardTitle: {
//     fontWeight: "400",
//     fontFamily: "Rubik-Regular",
//     color: "#ffffff",
//   },
//   cardContent: { flexDirection: "row", alignItems: "flex-end", marginTop: 2 },
//   pointsText: {
//     fontFamily: "Rubik-Bold",
//     fontWeight: "700",
//     fontSize: 15,
//     color: "#ffffff",
//   },
//   conversionText: {
//     fontFamily: "Rubik-Bold",
//     fontWeight: "700",
//     fontSize: 13,
//     color: "#ffffff",
//     textAlign: "justify",
//   },
//   tierContent: {
//     flexDirection: "row",
//     gap: 4,
//     marginTop: 2,
//     alignSelf: "flex-start",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   tierText: {
//     fontFamily: "Rubik-SemiBold",
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#ffffff",
//     alignSelf: "center",
//   },
//   rewardsCard: {
//     backgroundColor: "#017851",
//   },
//   tierCard: {
//     backgroundColor: "#017851",
//   },
// });

// export default StatsCard;
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
        <Star width={scale(16)} height={scale(16)} style={{ marginRight: 4 }} />
        <Star width={scale(16)} height={scale(16)} style={{ marginRight: 4 }} />
        <Star width={scale(16)} height={scale(16)} style={{ marginRight: 4 }} />
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
        <Star width={scale(16)} height={scale(16)} style={{ marginRight: 4 }} />
        <SmallStar
          width={scale(14)}
          height={scale(14)}
          style={{ marginRight: 4 }}
        />
        <SmallStar
          width={scale(14)}
          height={scale(14)}
          style={{ marginRight: 4 }}
        />
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
    height: scale(55),
    width: screenWidth * 0.5 - scale(24),
    maxWidth: scale(200),
    backgroundColor: "#017851",
    borderRadius: 6,
    padding: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontFamily: "Rubik-Regular",
    color: "#ffffff",
    fontSize: 14,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 2,
  },
  pointsText: {
    fontFamily: "Rubik-Bold",
    fontSize: 15,
    color: "#ffffff",
  },
  conversionText: {
    fontFamily: "Rubik-Bold",
    fontSize: 13,
    color: "#ffffff",
    textAlign: "left",
  },
  tierContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 4,
  },
  tierText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 15,
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
