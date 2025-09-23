import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { scale } from "../utils/dimen";

interface BrandsContainerProps {
  onBrandPress: (index: number) => void;
  onViewDealsPress?: () => void;
  showViewDeals?: boolean; // 👈 new prop
}

const BrandsContainer: React.FC<BrandsContainerProps> = ({
  onBrandPress,
  onViewDealsPress,
  showViewDeals = true, // default true
}) => {
  const brands = [
    { id: 1, image: require("../../assets/image/box1.png"), name: "Brand 1" },
    { id: 2, image: require("../../assets/image/box2.png"), name: "Brand 2" },
    { id: 3, image: require("../../assets/image/box3.png"), name: "Brand 3" },
    { id: 4, image: require("../../assets/image/box4.png"), name: "Brand 4" },
    { id: 5, image: require("../../assets/image/box5.png"), name: "Brand 5" },
    { id: 6, image: require("../../assets/image/box6.png"), name: "Brand 6" },
    { id: 7, image: require("../../assets/image/box7.png"), name: "Brand 7" },
    { id: 8, image: require("../../assets/image/box8.png"), name: "Brand 8" },
  ];

  const renderBrandItem = (brand: (typeof brands)[0], index: number) => (
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
        {showViewDeals && onViewDealsPress && (
          <TouchableOpacity
            onPress={onViewDealsPress}
            activeOpacity={0.8}
            accessibilityLabel="View deals"
            accessibilityHint="Tap to view all deals"
          >
            <Text style={styles.viewDealsText}>View Deals</Text>
          </TouchableOpacity>
        )}
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
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
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
    paddingHorizontal: scale(16),
    gap: scale(7),
  },
  brandItem: {
    width: scale(75),
    height: scale(75),
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
