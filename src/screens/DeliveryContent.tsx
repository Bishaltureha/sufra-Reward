import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { scale } from "../utils/dimen";
import StatsCard from "../components/StatsCard";
import BrandsContainer from "../components/BrandsContainer";
import DealsSection from "../components/DealsSection";
import OrderAgainSection from "../components/OrderAgainSection";
import DeliveringToYouSection from "../components/DeliveringToYouSection";
import EarnMorePointsSection from "../components/EarnMorePointsSection";
import { useNavigation } from "@react-navigation/native";
import GiftCardCarousel from "../components/GiftCardCarousel";
import GiftCard2 from "../../assets/svg/giftCards/GiftCard2";
import GiftCard3 from "../../assets/svg/giftCards/GiftCard3";
import GiftCard4 from "../../assets/svg/giftCards/GiftCard4";
import GiftCard5 from "../../assets/svg/giftCards/GiftCard5";
import GreenTimer from "../../assets/svg/GreenTimer";
import DeliveryPointer from "../components/DeliveryPointer";

const DeliveryContent = () => {
  const navigation = useNavigation<any>();

  const [orderStatus, setOrderStatus] = useState(2);
  const [hasActiveOrder, setHasActiveOrder] = useState(true);

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

  const orderAgainData = [
    {
      id: 1,
      image: require("../../assets/image/OrderAgain.png"),
      restaurantName: "City Fresh Kitchen",
      distance: "2.7 km",
      cuisine: "Tacos, Burritos, Quesadillas...",
      hasFreeDelivery: true,
      isFavorite: false,
    },
    {
      id: 2,
      image: require("../../assets/image/OrderAgain.png"),
      restaurantName: "City Fresh Kitchen",
      distance: "2.7 km",
      cuisine: "Tacos, Burritos, Quesadillas...",
      hasFreeDelivery: true,
      isFavorite: false,
    },
    {
      id: 3,
      image: require("../../assets/image/OrderAgain.png"),
      restaurantName: "City Fresh Kitchen",
      distance: "2.7 km",
      cuisine: "Tacos, Burritos, Quesadillas...",
      hasFreeDelivery: true,
      isFavorite: false,
    },
    {
      id: 4,
      image: require("../../assets/image/OrderAgain.png"),
      restaurantName: "City Fresh Kitchen",
      distance: "2.7 km",
      cuisine: "Tacos, Burritos, Quesadillas...",
      hasFreeDelivery: true,
      isFavorite: false,
    },
  ];

  const deliveringData = [
    {
      id: 1,
      image: require("../../assets/image/DeliveryContentImg1.png"),
      restaurantName: "Fire Grill",
      distance: "2.7",
      cuisine: "Tacos, Burritos, Quesadillas...",
      delivery: "Free Delivery",
      isFavorite: false,
      deliveryTime: "15-25",
      hasDoublePoints: true,
      isOpeningSoon: false,
    },
    {
      id: 2,
      image: require("../../assets/image/DeliveryContentImg2.png"),
      restaurantName: "Steak House",
      distance: "3.5",
      cuisine: "Pizza, Pasta, Italian...",
      delivery: "SAR 5 Delivery fee",
      isFavorite: true,
      deliveryTime: "Opens at 9 am",
      hasDoublePoints: false,
      isOpeningSoon: true,
    },
  ];

  const giftCards = [
    { key: "1", comp: GiftCard2 },
    { key: "2", comp: GiftCard3 },
    { key: "3", comp: GiftCard4 },
    { key: "4", comp: GiftCard5 },
    { key: "5", comp: GiftCard2 },
  ];

  const orderStages = [
    { label: "Preparing", status: 0 },
    { label: "On the Way", status: 1 },
    { label: "At the Address", status: 2 },
    { label: "Delivered", status: 3 },
  ];

  const handleDealPress = (deal, index) => {
    console.log("Deal pressed:", deal.title, "at index:", index);
  };

  const handleViewAllPress = () => {
    console.log("View All deals pressed");
    navigation.navigate("Deals");
  };

  const handleFavoritePress = (id, isFavorite) => {
    console.log(`Restaurant ${id} favorite status:`, isFavorite);
  };

  const handleCardPress = (item) => {
    console.log("Card pressed:", item.restaurantName);
  };

  const handleDeliveringCardPress = (item) => {
    console.log("Delivering card pressed:", item.restaurantName);
  };

  const handleDeliveringFavoritePress = (id) => {
    console.log("Delivering favorite pressed:", id);
  };

  const handleRewardsPress = () => {
    console.log("Rewards card tapped!");
    navigation.navigate("Loyalty", { initialTab: "transaction" });
  };

  const handleTierPress = () => {
    console.log("Tier card tapped!");
    navigation.navigate("Loyalty", { initialTab: "tier" });
  };

  const handleGiftCardPress = (index: number) => {
    console.log("Card pressed at index:", index);
    navigation.navigate("GiftCards");
  };

  const handleBrandPress = (brandIndex: any) => {
    console.log(`Brand ${brandIndex} tapped!`);
  };

  const handleTrackOrder = () => {
    console.log("Track order pressed");
    navigation.navigate("YourOrder");
  };

  return (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.statsContainer}>
        <StatsCard type="rewards" onPress={handleRewardsPress} />
        <StatsCard type="tierSmall" onPress={handleTierPress} />
      </View>

      {hasActiveOrder && (
        <View style={styles.activeOrderWrapper}>
          <View style={styles.deliveryContainer}>
            <View style={styles.orderHeader}>
              <Text style={styles.activeOrderTitle}>Active Order</Text>
              <View style={styles.orderHeaderRight}>
                <Image
                  source={require("../../assets/image/box1.png")}
                  style={styles.brandLogo}
                />
                <Image
                  source={require("../../assets/image/box2.png")}
                  style={styles.brandLogo}
                />
                <View style={styles.timerContainer}>
                  <GreenTimer />
                  <Text style={styles.timerText}>28 Min</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.progressContainer}>
              {orderStages.map((stage) => (
                <View key={stage.status} style={styles.stageContainer}>
                  {orderStatus === stage.status && (
                    <View style={styles.pointerContainer}>
                      <DeliveryPointer width={scale(25)} height={scale(30)} />
                    </View>
                  )}

                  <View
                    style={[
                      styles.progressBar,
                      orderStatus >= stage.status && styles.progressBarActive,
                    ]}
                  />

                  <Text
                    style={[
                      styles.stageLabel,
                      orderStatus >= stage.status && styles.stageLabelActive,
                      orderStatus === stage.status &&
                        styles.stageLabelWithPointer,
                    ]}
                  >
                    {stage.label}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.trackButton}
              activeOpacity={0.8}
              onPress={handleTrackOrder}
            >
              <Text style={styles.trackButtonText}>Track Your Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <BrandsContainer
        onBrandPress={handleBrandPress}
        onViewDealsPress={() => console.log("View Deals pressed")}
        showViewDeals={false}
      />
      <DealsSection
        title="Deals of the Day!"
        showViewAll={true}
        dealsData={dealsData}
        onDealPress={handleDealPress}
        onViewAllPress={handleViewAllPress}
        containerStyle={styles.sectionMargin}
      />
      <OrderAgainSection
        title="Order Again"
        data={orderAgainData}
        onCardPress={handleCardPress}
        containerStyle={styles.sectionMargin}
      />
      <DeliveringToYouSection
        title="Delivering to you"
        data={deliveringData}
        onCardPress={handleDeliveringCardPress}
        onManualAddressPress={undefined}
      />
      <EarnMorePointsSection containerStyle={undefined} />
      <GiftCardCarousel cards={giftCards} onCardPress={handleGiftCardPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: scale(16),
    justifyContent: "space-between",
    marginTop: scale(16),
    width: "100%",
    marginBottom: scale(16),
  },
  activeOrderWrapper: {
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
  },
  deliveryContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: scale(16),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(12),
  },
  activeOrderTitle: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(15),
  },
  orderHeaderRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(8),
  },
  brandLogo: {
    width: scale(26),
    height: scale(26),
  },
  timerContainer: {
    backgroundColor: "#F4F4F4",
    width: scale(85),
    height: scale(26),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: scale(8),
  },
  timerText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  divider: {
    height: 1,
    backgroundColor: "#E6EAF1",
    marginHorizontal: scale(-16),
    marginBottom: scale(16),
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: scale(12),
    marginTop: scale(32),
  },
  stageContainer: {
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  pointerContainer: {
    position: "absolute",
    top: scale(-32),
    zIndex: 10,
  },
  progressBar: {
    backgroundColor: "#DBDBDB",
    width: scale(78),
    height: scale(8),
    borderRadius: scale(20),
    marginBottom: scale(4),
  },
  progressBarActive: {
    backgroundColor: "#F6B01F",
  },
  stageLabel: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(10),
    textAlign: "center",
    maxWidth: scale(78), // Add this
    flexWrap: "wrap", // Add this
  },
  stageLabelActive: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
  },
  stageLabelWithPointer: {
    // marginTop: scale(18),
  },
  trackButton: {
    width: "100%",
    height: scale(40),
    backgroundColor: "#F6B01F",
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(8),
  },
  trackButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    lineHeight: scale(14),
    textAlign: "center",
    color: "#000000",
  },
  sectionMargin: {
    marginTop: scale(16),
  },
});

export default DeliveryContent;
