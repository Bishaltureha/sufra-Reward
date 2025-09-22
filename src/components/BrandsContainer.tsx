import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import {
  scaleSpacing,
  scaleWidthSize,
  scaleHeightSize,
} from "../utils/responsive";

const BrandsContainer = ({ onBrandPress, onViewDealsPress }) => {
  // Mock brand data - replace with actual data
  const brands = [
    {
      id: 1,
      image: require("../../assets/image/box1.png"),
      name: "Brand 1",
    },
    {
      id: 2,
      image: require("../../assets/image/box2.png"),
      name: "Brand 2",
    },
    {
      id: 3,
      image: require("../../assets/image/box3.png"),
      name: "Brand 3",
    },
    {
      id: 4,
      image: require("../../assets/image/box4.png"),
      name: "Brand 4",
    },
    {
      id: 5,
      image: require("../../assets/image/box5.png"),
      name: "Brand 5",
    },
    {
      id: 6,
      image: require("../../assets/image/box6.png"),
      name: "Brand 6",
    },
    {
      id: 7,
      image: require("../../assets/image/box7.png"),
      name: "Brand 7",
    },
    {
      id: 8,
      image: require("../../assets/image/box8.png"),
      name: "Brand 8",
    },
  ];
  const renderBrandItem = (brand, index) => (
    <TouchableOpacity
      key={brand.id}
      style={styles.brandItem}
      onPress={() => onBrandPress(index)}
      activeOpacity={0.8}
      accessibilityLabel={`${brand.name} brand`}
      accessibilityHint="Tap to view brand details"
    >
      <Image source={brand.image} style={styles.brandImage} />
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Brands Header */}
      <View style={styles.brandsHeader}>
        <Text style={styles.brandsTitle}>Our Brands</Text>
        <TouchableOpacity
          onPress={onViewDealsPress}
          activeOpacity={0.8}
          accessibilityLabel="View deals"
          accessibilityHint="Tap to view all deals"
        >
          <Text style={styles.viewDealsText}>View Deals</Text>
        </TouchableOpacity>
      </View>

      {/* Brands Grid */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.brandsContainer}
      >
        {brands.map(renderBrandItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  brandsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleSpacing(16),
    marginBottom: scaleSpacing(16),
  },
  brandsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
  },
  viewDealsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#017851",
    textDecorationLine: "underline",
    fontFamily: "Rubik-SemiBold",
  },
  brandsContainer: {
    paddingHorizontal: scaleSpacing(16),
    gap: scaleSpacing(5),
  },
  brandItem: {
    width: scaleWidthSize(75),
    height: scaleHeightSize(75),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  brandImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
});

export default BrandsContainer;
