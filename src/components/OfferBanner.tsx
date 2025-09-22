import React, { useState } from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import {
  scaleHeightSize,
  scaleSpacing,
  scaleWidthSize,
} from "../utils/responsive";

const OfferBanner = ({ onOfferPress }) => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  // Mock offers data - replace with actual data
  const offers = [
    { id: 0, image: require("../../assets/image/offer.png") },
    { id: 1, image: require("../../assets/image/offer.png") },
    { id: 2, image: require("../../assets/image/offer.png") },
    { id: 3, image: require("../../assets/image/offer.png") },
  ];

  const handleOfferScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const screenWidth = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.round(scrollPosition / screenWidth);
    setActiveOfferIndex(currentIndex);
  };

  return (
    <View style={styles.offerSection}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleOfferScroll}
        style={styles.offerScrollView}
      >
        {offers.map((offer) => (
          <View key={offer.id} style={styles.offerContainer}>
            <Image
              style={styles.offerImage}
              source={offer.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots Overlay */}
      <View style={styles.paginationContainer}>
        {offers.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeOfferIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  offerSection: {
    marginBottom: scaleSpacing(16),
    position: "relative",
  },
  offerScrollView: {
    height: scaleHeightSize(201),
  },
  offerContainer: {
    paddingHorizontal: scaleSpacing(16),
    width: scaleWidthSize(390),
  },
  offerImage: {
    width: "100%",
    height: scaleHeightSize(201),
    borderRadius: scaleSpacing(10),
  },
  paginationContainer: {
    position: "absolute",
    bottom: scaleSpacing(10),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scaleSpacing(4),
  },
  paginationDot: {
    width: 18,
    height: 2,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
  },
  paginationDotActive: {
    backgroundColor: "#F6B01F",
  },
});

export default OfferBanner;
