import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { scale } from "../utils/dimen";
import Header from "../components/Header";
import Qrcode from "../../assets/svg/Qrcode";
import LoyaltyCardBg from "../../assets/svg/LoyaltyCardBg";
import Star from "../../assets/svg/Star";
import RuningTime from "../../assets/svg/RuningTime";
import PointsTwowheelers from "../../assets/svg/PointsTwowheelers";
import GreenBackgroundStar from "../../assets/svg/GreenBackgroundStar";
import RedBackgroundPointsTwpWheeler from "../../assets/svg/RedBackgroundPointsTwpWheeler";
import GreenBackgroundSpoon from "../../assets/svg/GreenBackgroundSpoon";
import GreenBackGroundBirthdayCake from "../../assets/svg/GreenBackGroundBirthdayCake";
import GreenBackgroundWithCart from "../../assets/svg/GreenBackgroundWithCart";
import WelcomeWithGreenBackground from "../../assets/svg/WelcomeWithGreenBackground";
import GreenStar from "../../assets/svg/GreenStar";

interface Props {
  userName?: string;
  points?: number;
  onBackPress?: () => void;
}

type TabType = "transaction" | "tier";
type TierType = "GOLD" | "SILVER" | "DIAMOND";

const LoyaltyScreen = ({
  userName = "Sezen Sayoğlu",
  points = 7381,
  onBackPress,
}: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>("transaction");
  const [currentTier, setCurrentTier] = useState<TierType>("DIAMOND");

  const currentTierProps = useMemo(() => {
    switch (currentTier) {
      case "GOLD":
        return { gradient: ["#F6B01F", "#E19100"], title: "Legend" };
      case "SILVER":
        return { gradient: ["#CAD3D3", "#A7B5B6"], title: "Icon" };
      case "DIAMOND":
        return { gradient: ["#009463", "#007851"], title: "Star" };
      default:
        return { gradient: ["#F6B01F", "#E19100"], title: "Legend" };
    }
  }, [currentTier]);

  const getTierProgress = () => {
    const progress = 75;
    const indicatorPos = (scale(116 - 12) * progress) / 100;

    if (currentTier === "GOLD") {
      return (
        <View style={styles.progressRow}>
          <View style={styles.progressWrapper}>
            <View
              style={[
                styles.progressActive,
                { backgroundColor: "#F6B01F", width: `${progress}%` },
              ]}
            />
            <View
              style={[
                styles.indicator,
                { borderColor: "#E19100", left: indicatorPos },
              ]}
            />
          </View>
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>
      );
    }

    if (currentTier === "SILVER") {
      return (
        <View style={styles.progressRow}>
          <View style={styles.progressCompleted} />
          <View style={styles.progressWrapper}>
            <View
              style={[
                styles.progressActive,
                { backgroundColor: "#F6B01F", width: `${progress}%` },
              ]}
            />
            <View
              style={[
                styles.indicator,
                { borderColor: "#E19100", left: indicatorPos },
              ]}
            />
          </View>
          <View style={styles.progressInactive} />
        </View>
      );
    }

    if (currentTier === "DIAMOND") {
      return (
        <View style={styles.progressRow}>
          <View style={styles.progressCompleted} />
          <View style={styles.progressCompleted} />
          <View style={styles.progressWrapper}>
            <View
              style={[
                styles.progressActive,
                { backgroundColor: "#F6B01F", width: `${progress}%` },
              ]}
            />
            <View
              style={[
                styles.indicator,
                { borderColor: "#E19100", left: indicatorPos },
              ]}
            />
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header
        title="Points"
        onBackPress={onBackPress}
        titleStyle={styles.headerTitle}
        containerStyle={undefined}
        image={undefined}
      />

      {/* Gradient Background Section */}
      <LinearGradient
        colors={currentTierProps.gradient}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.cardWrapper}>
          <LoyaltyCardBg />
          <View style={styles.cardContent}>
            <Text style={styles.userName}>{userName}</Text>

            <View style={styles.qrcodeContainer}>
              <Qrcode />
            </View>

            <Text style={styles.pointsText}>{points}</Text>

            <View style={styles.divider} />

            <View style={styles.tierRow}>
              <Text style={styles.tierLabel}>Tier Points</Text>
              <View style={styles.tierValueContainer}>
                <Text style={styles.tierValue}>32,670</Text>
                <Text style={styles.tierSubValue}>1,650 SAR</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.bottomSection, { backgroundColor: "#00000033" }]}>
          <View style={styles.tierHeader}>
            <Star height={scale(20)} width={scale(20)} />
            <Text style={styles.tierTitle}>{currentTierProps.title} Tier</Text>
          </View>
          {getTierProgress()}
          <Text style={styles.tierInfo}>
            You need 10,166 more tier points to reach LEGEND tier
          </Text>
        </View>
      </LinearGradient>

      {/* Bottom Section */}

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("transaction")}
          style={[styles.tab, activeTab === "transaction" && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "transaction" && styles.tabTextActive,
            ]}
          >
            Transaction History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("tier")}
          style={[styles.tab, activeTab === "tier" && styles.tabActive]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "tier" && styles.tabTextActive,
            ]}
          >
            Legend Tier
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === "transaction" ? (
        <View style={styles.contentBox}>
          <View style={styles.warningBox}>
            <RuningTime />
            <Text numberOfLines={2} style={styles.warningText}>
              15.679 Loyalty Points are due to expire on{"\n"}26th April 2025
            </Text>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 1 */}
          <View style={styles.transactionItem}>
            <PointsTwowheelers />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                Order from Earth Bowlz
              </Text>
              <Text style={styles.transactionTime}>17 min ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+300</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 2 */}
          <View style={styles.transactionItem}>
            <GreenBackgroundStar />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Points Earned</Text>
              <Text style={styles.transactionTime}>18 hours ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+100</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 3 */}
          <View style={styles.transactionItem}>
            <RedBackgroundPointsTwpWheeler />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                Order from Earth Bowlz
              </Text>
              <Text style={styles.transactionTime}>1 day ago</Text>
            </View>
            <View style={[styles.pointsBadge, { backgroundColor: "#faf1eb" }]}>
              <Text style={styles.pointsTextRed}>-300</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 4 */}
          <View style={styles.transactionItem}>
            <GreenBackgroundSpoon />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                Dine-In from Steak Burger
              </Text>
              <Text style={styles.transactionTime}>1 days ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+100</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 5 */}
          <View style={styles.transactionItem}>
            <RedBackgroundPointsTwpWheeler />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                Order from Earth Bowlz
              </Text>
              <Text style={styles.transactionTime}>1 day ago</Text>
            </View>
            <View style={[styles.pointsBadge, { backgroundColor: "#faf1eb" }]}>
              <Text style={styles.pointsTextRed}>-200</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 6 */}
          <View style={styles.transactionItem}>
            <GreenBackgroundSpoon />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                Dine-In from Steak Burger
              </Text>
              <Text style={styles.transactionTime}>1 days ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+100</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 7 */}
          <View style={styles.transactionItem}>
            <GreenBackgroundSpoon />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                Dine-In from Steak Burger
              </Text>
              <Text style={styles.transactionTime}>1 days ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+200</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 8 */}
          <View style={styles.transactionItem}>
            <GreenBackGroundBirthdayCake />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Birthday Gift</Text>
              <Text style={styles.transactionTime}>1 days ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+50</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 9 */}
          <View style={styles.transactionItem}>
            <GreenBackgroundWithCart />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                Pickup from City Fresh Kitchen
              </Text>
              <Text style={styles.transactionTime}>1 days ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+100</Text>
            </View>
          </View>
          <View style={styles.containerDivider} />

          {/* Transaction 10 */}
          <View style={styles.transactionItem}>
            <WelcomeWithGreenBackground />
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>Welcome Gift</Text>
              <Text style={styles.transactionTime}>1 days ago</Text>
            </View>
            <View
              style={[styles.pointsBadge, { backgroundColor: "#0178511a" }]}
            >
              <Text style={styles.pointsTextGreen}>+100</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.contentLegendBox}>
          {/* LEGEND TIER */}
          <View style={styles.tierCardHeader}>
            <View style={styles.tierCardLeft}>
              <View style={styles.starsContainer}>
                <GreenStar />
                <GreenStar />
                <GreenStar />
              </View>
              <Text style={styles.tierCardTitle}>LEGEND TIER</Text>
            </View>
            <Text style={styles.tierCardPoints}>30.000+ Points</Text>
          </View>
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                5 entry tickets for the iPhone raffle
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>10% cashback on orders!</Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                3 Months Netflix subscription as a gift!
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                Get 1 free drink with your order!
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>10% Off Cart</Text>
            </View>
          </View>

          {/* ICON TIER */}
          <View style={styles.tierCardHeader}>
            <View style={styles.tierCardLeft}>
              <View style={styles.starsContainer}>
                <GreenStar />
                <GreenStar />
              </View>
              <Text style={styles.tierCardTitle}>ICON TIER</Text>
            </View>
            <Text style={styles.tierCardPoints}>15.000 - 30.000 Points</Text>
          </View>
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                3 entry tickets for the iPhone raffle
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>5% cashback on orders!</Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                2 Months Netflix subscription as a gift!
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                Get 2 free drink with your order!
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>5% Off Cart</Text>
            </View>
          </View>

          {/* STAR TIER */}
          <View style={styles.tierCardHeader}>
            <View style={styles.tierCardLeft}>
              <View style={styles.starsContainer}>
                <GreenStar />
              </View>
              <Text style={styles.tierCardTitle}>STAR TIER</Text>
            </View>
            <Text style={styles.tierCardPoints}>0 - 15.000 Points</Text>
          </View>
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                1 entry tickets for the iPhone raffle
              </Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>2% cashback on orders!</Text>
            </View>
            <View style={styles.benefitRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.benefitText}>
                1 Months Netflix subscription as a gift!
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default LoyaltyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  headerTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(17),
  },
  gradientContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(16),
  },
  cardContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingHorizontal: scale(24),
    paddingVertical: scale(24),
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
    color: "#000000",
  },
  qrcodeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pointsText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(32),
  },
  divider: {
    borderColor: "#D1D1D1",
    width: "89%",
    height: scale(1),
    borderWidth: scale(1),
    marginTop: scale(10),
    marginBottom: scale(-10),
    borderStyle: "dashed",
    marginVertical: scale(5),
  },
  tierRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: scale(24),
    marginTop: scale(20),
  },
  tierLabel: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  tierValueContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  tierValue: {
    color: "#017851",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(20),
  },
  tierSubValue: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  bottomSection: {
    backgroundColor: "#c38916",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: scale(121),
    padding: scale(16),
  },
  tierHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: scale(10),
  },
  tierTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#ffffff",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: scale(5),
  },
  progressWrapper: {
    position: "relative",
    width: scale(116),
    height: scale(8),
    backgroundColor: "#ffffff",
    borderRadius: scale(20),
    overflow: "hidden",
    justifyContent: "center",
  },
  progressActive: {
    backgroundColor: "#F6B01F",
    height: "100%",
  },
  progressInactive: {
    height: scale(8),
    width: scale(116),
    backgroundColor: "#ffffff",
    borderRadius: scale(20),
  },
  progressCompleted: {
    height: scale(8),
    width: scale(116),
    backgroundColor: "#F6B01F",
    borderRadius: scale(20),
  },
  indicator: {
    position: "absolute",
    width: scale(12),
    height: scale(12),
    borderRadius: scale(16),
    backgroundColor: "#FFFFFF",
    borderWidth: scale(3),
    borderColor: "#E19100",
    opacity: 1,
    transform: [{ rotate: "0deg" }],
  },
  tierInfo: {
    color: "#E6EAF1",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
    marginBottom: scale(10),
  },

  /* Tab Styles */
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: scale(1),
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#ffffff",
  },
  tab: {
    flex: 1,
    paddingVertical: scale(12),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: scale(3),
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#F6B01F",
  },
  tabText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    color: "#9E9E9E",
  },
  tabTextActive: {
    color: "#F6B01F",
    fontWeight: "600",
  },

  /* Content Styles */
  contentBox: {
    padding: scale(16),
    paddingBottom: scale(30),
  },
  contentLegendBox: {
    paddingBottom: scale(30),
  },
  warningBox: {
    backgroundColor: "#E6EAF1",
    height: scale(62),
    width: "100%",
    borderRadius: scale(10),
    paddingHorizontal: scale(16),
    alignItems: "center",
    flexDirection: "row",
    gap: scale(12),
  },
  warningText: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    flexShrink: 1,
    flexGrow: 0,
  },
  containerDivider: {
    borderColor: "#E6EAF1",
    borderWidth: scale(1),
    width: "100%",
    marginVertical: scale(16),
  },
  transactionItem: {
    flexDirection: "row",
    gap: scale(12),
    alignItems: "center",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    color: "#52525B",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  transactionTime: {
    color: "#A1A1AA",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
  },
  pointsBadge: {
    width: scale(75),
    height: scale(30),
    borderRadius: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  pointsTextGreen: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(15),
  },
  pointsTextRed: {
    color: "#D86642",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(15),
  },
  tierCardHeader: {
    width: "100%",
    height: scale(50),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F4F4",
    paddingHorizontal: scale(16),
    flexDirection: "row",
  },
  tierCardLeft: {
    height: scale(50),
    alignItems: "center",
    flexDirection: "row",
  },
  starsContainer: {
    flexDirection: "row",
    gap: scale(5),
    marginRight: scale(12),
  },
  tierCardTitle: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
  },
  tierCardPoints: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    textAlign: "right",
  },
  benefitsContainer: {
    gap: scale(8),
    width: "100%",
    backgroundColor: "#ffffff",
    padding: scale(16),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: scale(12),
    width: "100%",
  },
  bulletPoint: {
    backgroundColor: "#017851",
    height: scale(8),
    width: scale(8),
    borderRadius: scale(4),
  },
  benefitText: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
  },
});
