// //src/components/BrandsContainer.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { scale } from "../utils/dimen";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { MainStackParamList } from "../types";

// type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

// interface BrandsContainerProps {
//   onBrandPress?: (index: number) => void;
//   onViewDealsPress?: () => void;
//   showViewDeals?: boolean;
// }

// const BrandsContainer: React.FC<BrandsContainerProps> = ({
//   onBrandPress,
//   onViewDealsPress,
//   showViewDeals = true,
// }) => {
//   const navigation = useNavigation<NavigationProp>();

//   const brands = [
//     {
//       id: 1,
//       image: require("../../assets/image/box1.png"),
//       name: "Fire Grill",
//     },
//     { id: 2, image: require("../../assets/image/box2.png"), name: "Piatto" },
//     {
//       id: 3,
//       image: require("../../assets/image/box3.png"),
//       name: "Steak House Burgers",
//     },
//     {
//       id: 4,
//       image: require("../../assets/image/box4.png"),
//       name: "Steak House",
//     },
//     {
//       id: 5,
//       image: require("../../assets/image/box5.png"),
//       name: "Earth Bowlz",
//     },
//     {
//       id: 6,
//       image: require("../../assets/image/box6.png"),
//       name: "Curry Club",
//     },
//     {
//       id: 7,
//       image: require("../../assets/image/box7.png"),
//       name: "Uncle Moe's",
//     },
//     {
//       id: 8,
//       image: require("../../assets/image/box8.png"),
//       name: "City Fresh Kitchen",
//     },
//   ];

//   const handleBrandPress = (index: number) => {
//     const selectedBrand = brands[index];

//     // Navigate to BrandDetails screen with brand data
//     navigation.navigate("BrandDetails", {
//       brandImage: selectedBrand.image,
//       brandName: selectedBrand.name,
//       brandId: selectedBrand.id,
//     });

//     // Optional: Call the parent onBrandPress if provided
//     if (onBrandPress) {
//       onBrandPress(index);
//     }
//   };

//   const renderBrandItem = (brand: (typeof brands)[0], index: number) => (
//     <TouchableOpacity
//       key={brand.id}
//       style={styles.brandItem}
//       onPress={() => handleBrandPress(index)}
//       activeOpacity={0.8}
//       accessibilityLabel={`${brand.name} brand`}
//       accessibilityHint="Tap to view brand details"
//     >
//       <Image source={brand.image} style={styles.brandImage} />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Brands Header */}
//       <View style={styles.brandsHeader}>
//         <Text style={styles.brandsTitle}>Our Brands</Text>
//         {showViewDeals && onViewDealsPress && (
//           <TouchableOpacity
//             onPress={onViewDealsPress}
//             activeOpacity={0.8}
//             accessibilityLabel="View deals"
//             accessibilityHint="Tap to view all deals"
//           >
//             <Text style={styles.viewDealsText}>View Deals</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Brands Grid */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.brandsContainer}
//       >
//         {brands.map(renderBrandItem)}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: scale(0),
//   },
//   brandsHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: scale(16),
//     marginBottom: scale(16),
//   },
//   brandsTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#4A4A4A",
//     fontFamily: "Rubik-SemiBold",
//   },
//   viewDealsText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#017851",
//     textDecorationLine: "underline",
//     fontFamily: "Rubik-SemiBold",
//   },
//   brandsContainer: {
//     paddingHorizontal: scale(16),
//     gap: scale(7),
//   },
//   brandItem: {
//     width: scale(75),
//     height: scale(75),
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 6,
//   },
//   brandImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     borderRadius: 6,
//   },
// });

// export default BrandsContainer;

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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types";

// 🔹 Type for navigation prop
type NavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "BrandDetails"
>;

// 🔹 Type for brand data
interface Brand {
  id: number;
  image: any;
  name: string;
}

// 🔹 Props accepted by the component
interface BrandsContainerProps {
  onBrandPress?: (brand: Brand) => void;
  onViewDealsPress?: () => void;
  showViewDeals?: boolean;
}

const BrandsContainer: React.FC<BrandsContainerProps> = ({
  onBrandPress,
  onViewDealsPress,
  showViewDeals = true,
}) => {
  const navigation = useNavigation<NavigationProp>();

  // 🔹 Static data (could later come from API)
  const brands: Brand[] = [
    {
      id: 1,
      image: require("../../assets/image/box1.png"),
      name: "Fire Grill",
    },
    { id: 2, image: require("../../assets/image/box2.png"), name: "Piatto" },
    {
      id: 3,
      image: require("../../assets/image/box3.png"),
      name: "Steak House Burgers",
    },
    {
      id: 4,
      image: require("../../assets/image/box4.png"),
      name: "Steak House",
    },
    {
      id: 5,
      image: require("../../assets/image/box5.png"),
      name: "Earth Bowlz",
    },
    {
      id: 6,
      image: require("../../assets/image/box6.png"),
      name: "Curry Club",
    },
    {
      id: 7,
      image: require("../../assets/image/box7.png"),
      name: "Uncle Moe's",
    },
    {
      id: 8,
      image: require("../../assets/image/box8.png"),
      name: "City Fresh Kitchen",
    },
  ];

  // 🔹 Handle Brand Selection
  const handleBrandPress = (brand: Brand) => {
    // Navigate to BrandDetails screen with brand data
    navigation.navigate("BrandDetails", {
      brandImage: brand.image,
      brandName: brand.name,
      brandId: brand.id,
    });

    // Optional: trigger parent callback if provided
    onBrandPress?.(brand);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Horizontal Brand List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.brandsContainer}
      >
        {brands.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            style={styles.brandItem}
            onPress={() => handleBrandPress(brand)}
            activeOpacity={0.8}
            accessibilityLabel={`${brand.name} brand`}
            accessibilityHint="Tap to view brand details"
          >
            <Image source={brand.image} style={styles.brandImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// --- 💅 Styles ---
const styles = StyleSheet.create({
  container: {
    marginBottom: scale(0),
  },
  brandsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
  },
  brandsTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
  },
  viewDealsText: {
    fontSize: scale(16),
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
