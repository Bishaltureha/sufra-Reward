import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { scale } from "../utils/dimen";
import StatsCard from "../components/StatsCard";
import BrandsContainer from "../components/BrandsContainer";
import DealsSection from "../components/DealsSection";
import OrderAgainSection from "../components/OrderAgainSection";
import DeliveringToYouSection from "../components/DeliveringToYouSection";
import EarnMorePointsSection from "../components/EarnMorePointsSection";

const DeliveryContent = () => {
  const handleRewardsPress = () => {
    console.log("Rewards card tapped!");
  };

  const handleTierSmallPress = () => {
    console.log("Tier card tapped!");
  };

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

  // Order Again data
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

  // Delivering to you data
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

  const handleDealPress = (deal, index) => {
    console.log("Deal pressed:", deal.title, "at index:", index);
  };

  const handleViewAllPress = () => {
    console.log("View All deals pressed");
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

  return (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.statsContainer}>
        <StatsCard type="rewards" onPress={handleRewardsPress} />
        <StatsCard type="tierSmall" onPress={handleTierSmallPress} />
      </View>

      <BrandsContainer
        onBrandPress={(index) => console.log("Brand pressed:", index)}
        onViewDealsPress={() => console.log("View Deals pressed")}
        showViewDeals={false}
      />

      <DealsSection
        title="Deals of the Day!"
        showViewAll={true}
        dealsData={dealsData}
        onDealPress={handleDealPress}
        onViewAllPress={handleViewAllPress}
        containerStyle={{ marginTop: scale(16) }}
      />

      <OrderAgainSection
        title="Order Again"
        data={orderAgainData}
        onFavoritePress={handleFavoritePress}
        onCardPress={handleCardPress}
        containerStyle={{ marginTop: scale(16) }}
      />

      <DeliveringToYouSection
        title="Delivering to you"
        data={deliveringData}
        onCardPress={handleDeliveringCardPress}
        onFavoritePress={handleDeliveringFavoritePress}
      />

      <EarnMorePointsSection containerStyle={undefined} />
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
});

export default DeliveryContent;
