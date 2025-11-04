import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import BackArrow from "../../assets/svg/BackArrow";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { DrawerParamList, MainStackParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GreenStar from "../../assets/svg/GreenStar";
import WhiteStar from "../../assets/svg/WhiteStar";
import Entypo from "@expo/vector-icons/Entypo";

type TierscreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MainStackParamList, "Tiers">,
  NativeStackNavigationProp<MainStackParamList>
>;

interface TierCardProps {
  tierName: string;
  tierRequirement: string;
  starCount: number;
  benefits: string[];
  onSeeMore?: () => void;
}

const TierCard: React.FC<TierCardProps> = ({
  tierName,
  tierRequirement,
  starCount,
  benefits,
  onSeeMore,
}) => {
  const renderStars = () => {
    return Array.from({ length: 3 }, (_, index) =>
      index < starCount ? <GreenStar key={index} /> : <WhiteStar key={index} />
    );
  };

  return (
    <View style={styles.tierDetailsCard}>
      <View style={styles.tierHeader}>
        <View>
          <Text style={styles.tierName}>{tierName}</Text>
          <Text style={styles.tierRequirement}>{tierRequirement}</Text>
        </View>
        <View style={styles.starsContainer}>{renderStars()}</View>
      </View>
      <View style={styles.divider} />

      {benefits.map((benefit, index) => (
        <View key={index} style={styles.benefitItem}>
          <Entypo
            name="dot-single"
            size={24}
            color="#52525B"
            style={styles.bulletIcon}
          />
          <Text style={styles.benefitText}>{benefit}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.seeMoreButton} onPress={onSeeMore}>
        <Text style={styles.seeMoreText}>See More</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tiers = () => {
  const navigation = useNavigation<TierscreenNavigationProp>();

  // User's current tier points
  const currentTierPoints = 46.921;

  const tierData = [
    {
      tierName: "LEGEND TIER",
      tierRequirement: "60.000+ Tier Points",
      starCount: 3,
      minPoints: 60.0,
      maxPoints: null,
      benefits: [
        "Tempor commodo eiusmod consectetur proident aute tempor ullamco reprehenderit irure.",
        "Non incididunt veniam incididunt nostrud consequat in sint exercitation enim.",
        "Irure amet in dolore velit aliquip qui dolore.",
      ],
    },
    {
      tierName: "ICON TIER",
      tierRequirement: "15.000 - 60.000 Tier Points",
      starCount: 2,
      minPoints: 15.0,
      maxPoints: 60.0,
      benefits: [
        "Quis dolore sunt dolor ex sint.",
        "Ut anim laboris nostrud anim aliqua exercitation qui.",
        "Velit eu magna aute magna adipisicing dolor irure labore voluptate cupidatat cillum culpa.",
      ],
    },
    {
      tierName: "STAR TIER",
      tierRequirement: "0 - 15.000 Tier Points",
      starCount: 1,
      minPoints: 0,
      maxPoints: 15.0,
      benefits: [
        "Eu sint ex cupidatat ut sit sint exercitation adipisicing magna aliquip nulla duis sint.",
        "Aliquip ut non fugiat proident excepteur ea eiusmod amet cupidatat sint.",
        "Aliquip ut non fugiat proident excepteur ea eiusmod amet cupidatat sint.",
      ],
    },
  ];

  // Find current tier and next tier
  const getCurrentTier = () => {
    return tierData.find(
      (tier) =>
        currentTierPoints >= tier.minPoints &&
        (tier.maxPoints === null || currentTierPoints < tier.maxPoints)
    );
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    if (!currentTier) return null;
    const currentIndex = tierData.indexOf(currentTier);
    return currentIndex > 0 ? tierData[currentIndex - 1] : null;
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNextTier = nextTier
    ? nextTier.minPoints - currentTierPoints
    : 0;
  const isMaxTier = !nextTier;

  const handleSeeMore = (tierName: string) => {
    console.log(`See more for ${tierName}`);
    // Add your navigation or modal logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Tiers</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {currentTier && (
          <View style={styles.currentTierCard}>
            <View style={styles.starsContainer}>
              {Array.from({ length: 3 }, (_, index) =>
                index < currentTier.starCount ? (
                  <GreenStar key={index} />
                ) : (
                  <WhiteStar key={index} />
                )
              )}
            </View>
            <Text style={styles.currentTierTitle}>{currentTier.tierName}</Text>
            <View style={styles.divider} />
            <View style={styles.tierPointsRow}>
              <Text style={styles.tierPointsLabel}>Tier Points</Text>
              <Text style={styles.tierPointsValue}>
                {currentTierPoints.toFixed(3)}
                {!isMaxTier && currentTier.maxPoints && (
                  <Text style={styles.tierPointsTotal}>
                    /{currentTier.maxPoints.toFixed(3)}
                  </Text>
                )}
              </Text>
            </View>
            {!isMaxTier && currentTier.maxPoints && (
              <>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${
                          ((currentTierPoints - currentTier.minPoints) /
                            (currentTier.maxPoints - currentTier.minPoints)) *
                          100
                        }%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.tierInfoText}>
                  You need{" "}
                  <Text style={styles.tierInfoBold}>
                    {pointsToNextTier.toFixed(3)}
                  </Text>{" "}
                  more tier points to reach the{" "}
                  <Text style={styles.tierInfoBold}>{nextTier?.tierName}</Text>.
                </Text>
              </>
            )}
          </View>
        )}

        {tierData.map((tier, index) => (
          <TierCard
            key={index}
            tierName={tier.tierName}
            tierRequirement={tier.tierRequirement}
            starCount={tier.starCount}
            benefits={tier.benefits}
            onSeeMore={() => handleSeeMore(tier.tierName)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tiers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: scale(16),
  },
  scrollContent: {
    gap: scale(24),
    paddingBottom: scale(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    backgroundColor: "#ffffff",
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
  },
  backButton: {
    padding: scale(4),
    marginRight: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(24),
    color: "#747474",
  },
  spacer: {
    width: scale(36),
  },
  currentTierCard: {
    marginTop: scale(24),
    width: "100%",
    padding: scale(12),
    gap: scale(8),
    backgroundColor: "#F1EDE5",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: scale(16),
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: scale(3),
  },
  currentTierTitle: {
    color: "#017851",
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
  },
  divider: {
    width: "100%",
    height: scale(1),
    backgroundColor: "#D8664233",
  },
  tierPointsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  tierPointsLabel: {
    color: "#747474",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(14),
  },
  tierPointsValue: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(20),
    color: "#017851",
  },
  tierPointsTotal: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
    color: "#747474",
  },
  progressBarContainer: {
    width: "100%",
    height: scale(12),
    borderRadius: scale(32),
    backgroundColor: "#EADDAA",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: scale(32),
    backgroundColor: "#017851",
  },
  tierInfoText: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(11),
    color: "#017851",
    textAlign: "center",
  },
  tierInfoBold: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(11),
    color: "#017851",
  },
  tierDetailsCard: {
    borderRadius: scale(16),
    gap: scale(8),
  },
  tierHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tierName: {
    color: "#017851",
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
  },
  tierRequirement: {
    color: "#747474",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  bulletIcon: {
    marginTop: scale(-4),
  },
  benefitText: {
    flex: 1,
    color: "#52525B",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    lineHeight: scale(20),
  },
  seeMoreButton: {
    backgroundColor: "#EADDAA",
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(28),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  seeMoreText: {
    color: "#017851",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
  },
});
