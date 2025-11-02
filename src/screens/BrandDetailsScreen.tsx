import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "../hooks/useLocation";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  RouteProp,
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { scale } from "../utils/dimen";
import { MainStackParamList } from "../types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Error from "../../assets/svg/Error";
import LocationModal from "../components/LocationModal";
import YourPastOrders from "../components/BrandDetailsScreen/YourPastOrders";
import BrandDetailsDeliveryBox from "../components/BrandDetailsScreen/BrandDetailsDeliveryBox";
import CollectYourOrderContainer from "../components/BrandDetailsScreen/CollectYourOrderContainer";
import RedBoxLocationPermission from "../components/BrandDetailsScreen/RedBoxLocationpermission";
import ProductCard from "../components/BrandDetailsScreen/ProductCard";
import NewBadge from "../../assets/svg/NewBadge";
import MultiBrandModalLogo from "../components/MultiBrandModal";

type BrandDetailsRouteProp = RouteProp<MainStackParamList, "BrandDetails">;

const categories = [
  "Bestsellers",
  "Meals",
  "Limited Time Offer!",
  "Sufra Offer",
  "Build Your Own",
  "Lifestyle Bowls",
  "Combos",
  "Kids Menu",
  "Baja California",
  "Party side",
  "Tortilla chips",
  "Soups",
  "Chips & Dips",
  "Desserts",
  "Beverages",
];
const BestsellersmenuItems = [
  {
    id: "1",
    name: "Chickster Chicken Burger",
    image: require("../../assets/image/Burger.png"),
    price: 15,
    originalPrice: 18,
  },
  {
    id: "2",
    name: "Burgster & Fryster Menu",
    image: require("../../assets/image/BurgsterFryster.png"),
    price: 14,
    originalPrice: 16,
  },
  {
    id: "3",
    name: "Chicken Fryster Menu",
    image: require("../../assets/image/ChickenFryster.png"),
    price: 15,
    originalPrice: 18,
  },
  {
    id: "4",
    name: "Onion Rings",
    image: require("../../assets/image/OnionRings.png"),
    price: 14,
    originalPrice: 16,
  },
  {
    id: "5",
    name: "Mac 'N' Cheese Balls",
    image: require("../../assets/image/MacCheeseBalls.png"),
    price: 15,
    originalPrice: 18,
  },
  {
    id: "6",
    name: "Burgster & Burgster Menu",
    image: require("../../assets/image/BurgsterBurgsterMenu.png"),
    price: 14,
    originalPrice: 16,
  },
];

const MealsmenuItems = [
  {
    id: "7",
    name: "Chickster Chicken Burger",
    image: require("../../assets/image/Burger.png"),
    price: 15,
    originalPrice: 18,
  },
  {
    id: "8",
    name: "Burgster & Fryster Menu",
    image: require("../../assets/image/BurgsterFryster.png"),
    price: 14,
    originalPrice: 16,
  },
  {
    id: "9",
    name: "Chicken Fryster Menu",
    image: require("../../assets/image/ChickenFryster.png"),
    price: 15,
    originalPrice: 18,
  },
  {
    id: "10",
    name: "Onion Rings",
    image: require("../../assets/image/OnionRings.png"),
    price: 14,
    originalPrice: 16,
  },
  {
    id: "11",
    name: "Mac 'N' Cheese Balls",
    image: require("../../assets/image/MacCheeseBalls.png"),
    price: 15,
    originalPrice: 18,
  },
  {
    id: "12",
    name: "Burgster & Burgster Menu",
    image: require("../../assets/image/BurgsterBurgsterMenu.png"),
    price: 14,
    originalPrice: 16,
  },
];

const categoryData = [
  { name: "Bestsellers", items: BestsellersmenuItems },
  { name: "Meals", items: MealsmenuItems },
  { name: "Limited Time Offer!", items: MealsmenuItems },
  { name: "Sufra Offer", items: MealsmenuItems },
  { name: "Build Your Own", items: MealsmenuItems },
  { name: "Lifestyle Bowls", items: MealsmenuItems },
  { name: "Combos", items: MealsmenuItems },
  { name: "Kids Menu", items: MealsmenuItems },
  { name: "Baja California", items: MealsmenuItems },
  { name: "Party side", items: MealsmenuItems },
  { name: "Tortilla chips", items: MealsmenuItems },
  { name: "Soups", items: MealsmenuItems },
  { name: "Chips & Dips", items: MealsmenuItems },
  { name: "Desserts", items: MealsmenuItems },
  { name: "Beverages", items: MealsmenuItems },
];

const BrandDetailsScreen = () => {
  const route = useRoute<BrandDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { brandImage, brandName, brandId } = route.params;
  const [activeTab, setActiveTab] = useState<"Delivery" | "Pick-up">(
    "Delivery"
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [textWidths, setTextWidths] = useState<{ [key: string]: number }>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const categoryScrollRef = useRef<ScrollView>(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [multiBrandModalVisible, setMultiBrandModalVisible] = useState(false);

  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

  const sectionPositions = useRef<{ [key: string]: number }>({});
  useEffect(() => {
    setMultiBrandModalVisible(true);
  }, []);
  const {
    isEnabled: isLocationEnabled,
    coords: currentLocation,
    isLoading: isLoadingLocation,
    error: locationError,
  } = useLocation();

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowStickyHeader(scrollY > 150);

    let currentSection = categories[0];
    for (const category of categories) {
      const position = sectionPositions.current[category];
      if (position && scrollY >= position - 200) {
        currentSection = category;
      }
    }

    if (currentSection !== activeCategory) {
      setActiveCategory(currentSection);
      scrollCategoryToView(currentSection);
    }
  };

  const scrollCategoryToView = (category: string) => {
    const categoryIndex = categories.indexOf(category);
    if (categoryIndex !== -1 && categoryScrollRef.current) {
      const scrollPosition = Math.max(
        0,
        categoryIndex * scale(100) - scale(40)
      );
      categoryScrollRef.current.scrollTo({
        x: scrollPosition,
        animated: true,
      });
    }
  };

  const handleEnableLocationPress = () => {
    setLocationModalVisible(true);
  };

  // ✅ Distance calculation (if needed)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  // ✅ Get actual distance for Pick-up
  const getPickupDistance = () => {
    if (!currentLocation) return "N/A";

    // Example store coordinates (replace with actual store location)
    const storeLatitude = 15.2048; // Dubai example
    const storeLongitude = 55.2708;

    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      storeLatitude,
      storeLongitude
    );

    return `${distance.toFixed(1)} km`;
  };

  const handleManualAddress = () => {
    setLocationModalVisible(false);
    console.log("Manual address pressed");
  };

  const handleTextLayout = (item: string, width: number) => {
    setTextWidths((prev) => ({ ...prev, [item]: width }));
  };

  const handleAddProduct = (item: any) => {
    setCartItems((prev) => ({
      ...prev,
      [item.id]: 1,
    }));
  };

  const handleIncrement = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId: string) => {
    setCartItems((prev) => {
      const newQuantity = (prev[itemId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: newQuantity,
      };
    });
  };

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
    const position = sectionPositions.current[category];
    if (position && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: position - 100, animated: true });
    }
  };

  const onSectionLayout = (category: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    sectionPositions.current[category] = y;
  };

  const handleCardPress = (item: any) => {
    navigation.navigate("ProductDetails", { productData: item });
    // navigation.navigate("ProductDetailsWithImage", { productData: item });
  };
  const renderProductItem =
    (menuItems: any[]) =>
    ({ item, index }: any) => {
      if (index % 2 !== 0) return null;
      const nextItem = menuItems[index + 1];
      return (
        <View style={styles.productRow}>
          <ProductCard
            item={item}
            onAdd={handleAddProduct}
            quantity={cartItems[item.id] || 0}
            handleCardPress={() => handleCardPress(item)}
          />
          {nextItem ? (
            <ProductCard
              item={nextItem}
              onAdd={handleAddProduct}
              quantity={cartItems[nextItem.id] || 0}
              handleCardPress={() => handleCardPress(nextItem)} // ADD THIS
            />
          ) : (
            <View style={styles.productCard} />
          )}
        </View>
      );
    };

  const renderPickupDistance = () => {
    if (isLoadingLocation) {
      return (
        <View style={styles.distanceContainer}>
          <Text style={styles.deliveryText}>Distance</Text>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (!isLocationEnabled || locationError) {
      return (
        <TouchableOpacity
          style={styles.distanceContainer}
          onPress={handleEnableLocationPress}
        >
          <Text style={styles.deliveryText}>Distance</Text>
          <View style={styles.enableLocationRowInline}>
            <Error />
            <Text style={styles.enableLocationTextSmall}>Enable Location</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <Text style={styles.deliveryText}>
        Distance{"\n"}
        <Text style={styles.deliveryTextBold}>{getPickupDistance()}</Text>
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={showStickyHeader ? "dark-content" : "light-content"}
        backgroundColor="transparent"
        translucent
      />

      {/* Banner (only when sticky is hidden) */}
      {!showStickyHeader && (
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/image/BrandDetails.png")}
            style={styles.brandImage}
          />
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="arrow-back-ios"
                style={styles.backIcon}
                size={scale(24)}
                color="#017851"
              />
            </TouchableOpacity>
            <View style={styles.rightIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFavorite(!isFavorite)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={scale(24)}
                  color="#017851"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {}}
                activeOpacity={0.8}
              >
                <Ionicons name="search" size={scale(24)} color="#017851" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showStickyHeader && (
        <View style={styles.stickyTopHeader}>
          <TouchableOpacity
            style={styles.stickyIconButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="arrow-back-ios"
              style={styles.backIcon}
              size={scale(24)}
              color="#017851"
            />
          </TouchableOpacity>
          <View style={styles.spacer} />
          <Text style={styles.stickyHeaderTitle} numberOfLines={1}>
            {brandName}
          </Text>
          <View style={styles.stickyRightIcons}>
            <TouchableOpacity
              style={styles.stickyIconButton}
              onPress={() => setIsFavorite(!isFavorite)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={scale(24)}
                color="#017851"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stickyIconButton}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <Ionicons name="search" size={scale(24)} color="#017851" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView
        style={[
          styles.contentContainer,
          showStickyHeader && styles.contentContainerExpanded,
        ]}
        ref={scrollViewRef}
        stickyHeaderIndices={[4]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.brandInfoRow}>
          <Image source={brandImage} style={styles.brandLogo} />
          <View style={styles.brandTextContainer}>
            <Text style={styles.brandTitle}>{brandName}</Text>
            <Text style={styles.brandDescription}>
              Tacos, Burritos, Quesadillas...
            </Text>
            <TouchableOpacity>
              <Text style={styles.branchInfoText}>Branch Info &gt;</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabBarContainer}>
          <TouchableOpacity
            style={
              activeTab === "Delivery"
                ? styles.tabButton
                : styles.tabButtonInactive
            }
            activeOpacity={0.8}
            onPress={() => setActiveTab("Delivery")}
          >
            <Text
              style={
                activeTab === "Delivery"
                  ? styles.tabButtonText
                  : styles.tabButtonTextInactive
              }
            >
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === "Pick-up"
                ? styles.tabButton
                : styles.tabButtonInactive
            }
            activeOpacity={0.8}
            onPress={() => setActiveTab("Pick-up")}
          >
            <Text
              style={
                activeTab === "Pick-up"
                  ? styles.tabButtonText
                  : styles.tabButtonTextInactive
              }
            >
              Pick-up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContent}>
          {activeTab === "Delivery" ? (
            <View>
              <View style={styles.deliveryInfoRow}>
                <Text style={styles.deliveryText}>
                  Min. Order{"\n"}
                  <Text style={styles.deliveryTextBold}>15 SR</Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.deliveryText}>
                  Delivery Time{"\n"}
                  <Text style={styles.deliveryTextBold}>15-20 min</Text>
                </Text>
                <View style={styles.divider} />
                <Text style={styles.deliveryText}>
                  Delivery Fee{"\n"}
                  <Text style={styles.deliveryTextBold}>18 SR</Text>
                </Text>
              </View>
              <BrandDetailsDeliveryBox />
            </View>
          ) : (
            <View>
              <View
                style={[
                  styles.deliveryInfoRow,
                  { justifyContent: "space-evenly" },
                ]}
              >
                {renderPickupDistance()}
                <View style={styles.divider} />
                <Text style={styles.deliveryText}>
                  Prep Time{"\n"}
                  <Text style={styles.deliveryTextBold}>15-20 min</Text>
                </Text>
              </View>
              <CollectYourOrderContainer />
            </View>
          )}
        </View>

        <View style={{ height: 0 }} />

        <View
          style={[
            styles.tabcontainer,
            showStickyHeader && styles.tabcontainerSticky,
          ]}
        >
          <YourPastOrders style={{}} />

          <ScrollView
            ref={categoryScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tabItem}
                activeOpacity={0.7}
                onPress={() => handleCategoryPress(item)}
              >
                <View style={styles.tabInner}>
                  <Text
                    onLayout={(e) =>
                      handleTextLayout(item, e.nativeEvent.layout.width)
                    }
                    style={
                      activeCategory === item
                        ? styles.activeCategoryText
                        : styles.inactiveCategoryText
                    }
                  >
                    {item}
                  </Text>
                  {activeCategory === item && (
                    <View
                      style={[
                        styles.activeIndicator,
                        { width: textWidths[item] || 0 },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.contentArea}>
          {!isLocationEnabled && <RedBoxLocationPermission />}
          {categoryData.map((category) => (
            <View
              key={category.name}
              onLayout={(e) => onSectionLayout(category.name, e)}
            >
              <Text style={styles.contentPlaceholder}>{category.name}</Text>
              <FlatList
                data={category.items}
                renderItem={renderProductItem(category.items)}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.productsContainer}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <MultiBrandModalLogo
        visible={multiBrandModalVisible}
        onClose={() => setMultiBrandModalVisible(false)}
      />
      <LocationModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
      />
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeftRow}>
          <NewBadge />
          <Text style={styles.bottomText}>Add Items from Other Brands</Text>
        </View>
        <View style={styles.bottomArrowContainer}>
          <AntDesign name="up" size={12} color="#6D6D6D" />
        </View>
      </View>
    </View>
  );
};

export default BrandDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: scale(40),
  },
  brandImage: {
    width: "100%",
    height: scale(220),
    resizeMode: "cover",
  },
  productCard: {
    width: scale(173),
    marginBottom: scale(10),
  },
  productsContainer: {
    paddingTop: scale(10),
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(3),
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: scale(220),
  },
  headerIcons: {
    position: "absolute",
    top: scale(50),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
  },
  iconButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  backIcon: {
    marginLeft: scale(8),
  },
  rightIcons: {
    flexDirection: "row",
    gap: scale(10),
  },
  stickyRightIcons: {
    flexDirection: "row",
    gap: scale(10),
  },
  spacer: {
    width: scale(45),
  },

  contentContainer: {
    flex: 1,
    marginTop: scale(-20),
    backgroundColor: "#fff",
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: scale(16),
  },
  contentContainerExpanded: {
    marginTop: scale(-80),
  },
  brandInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandLogo: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(8),
    resizeMode: "cover",
  },
  brandTextContainer: {
    marginStart: scale(16),
    flex: 1,
  },
  brandTitle: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(18),
    color: "#4A4A4A",
    marginBottom: scale(4),
  },
  brandDescription: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#717171",
    lineHeight: scale(20),
    marginBottom: scale(6),
  },
  branchInfoText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(13),
  },
  tabBarContainer: {
    width: "100%",
    height: scale(44),
    backgroundColor: "#F4F4F4",
    marginTop: scale(16),
    borderRadius: scale(10),
    flexDirection: "row",
    padding: scale(5),
  },
  tabButton: {
    flex: 1,
    height: scale(34),
    backgroundColor: "#017851",
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonInactive: {
    flex: 1,
    height: scale(34),
    backgroundColor: "transparent",
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  tabButtonTextInactive: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  tabContent: {
    marginTop: scale(10),
    backgroundColor: "#ffffff",
  },
  deliveryInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(16),
  },
  deliveryText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#4A4A4A",
    textAlign: "center",
  },
  deliveryTextBold: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#4A4A4A",
    textAlign: "center",
  },
  divider: {
    height: scale(39),
    width: scale(2),
    backgroundColor: "#E6EAF1",
  },
  distanceContainer: {
    alignItems: "center",
    gap: scale(4),
  },
  enableLocationRowInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    justifyContent: "center",
    marginStart: scale(-10),
  },
  enableLocationTextSmall: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#FF617E",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  loadingText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#4A4A4A",
    textAlign: "center",
  },
  tabcontainer: {
    backgroundColor: "#ffffff",
    paddingTop: scale(16),
    paddingBottom: scale(10),
    marginHorizontal: scale(-16),
    marginTop: scale(0),
  },
  tabcontainerSticky: {
    // marginTop: scale(-110),
  },
  contentArea: {
    padding: scale(16),
    minHeight: scale(1000),
    backgroundColor: "#f4f4f4",
    marginHorizontal: scale(-16),
    marginTop: scale(0),
    marginBottom: scale(50),
    paddingTop: scale(16),
  },
  contentPlaceholder: {
    fontSize: scale(16),
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    marginTop: scale(16),
  },
  scrollContainer: {
    height: scale(53),
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    flexGrow: 0,
  },
  tabItem: {
    marginRight: scale(16),
  },
  activeCategoryText: {
    fontFamily: "Rubik",
    fontWeight: "700",
    fontSize: scale(14),
    lineHeight: scale(16),
    color: "#4A4A4A",
  },
  inactiveCategoryText: {
    fontFamily: "Rubik",
    fontWeight: "400",
    fontSize: scale(14),
    lineHeight: scale(16),
    color: "#4A4A4A",
  },
  tabInner: {
    alignItems: "center",
  },
  activeIndicator: {
    marginTop: scale(10),
    height: scale(5),
    backgroundColor: "#F6B01F",
    borderRadius: scale(3),
  },

  /* ---------- Sticky header styles (fixed) ---------- */
  stickyTopHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    // height: scale(100),
    backgroundColor: "#F6B01F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    paddingTop: scale(50),
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 999,
  },
  // absolutely center the title so it's unaffected by left/right icons
  stickyHeaderTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: scale(18),
    fontWeight: "600",
    color: "#000000",
    fontFamily: "Rubik-Bold",
  },

  leftContainer: {
    position: "absolute",
    left: scale(12),
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: scale(4),
  },
  rightContainer: {
    position: "absolute",
    right: scale(12),
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  stickyIconButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  bottomBar: {
    width: "100%",
    height: scale(54),
    backgroundColor: "#F4F4F4",
    position: "absolute",
    bottom: 0,
    padding: scale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // iOS Shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android Shadow
    elevation: 4,
  },
  bottomLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(16),
  },
  bottomText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  bottomArrowContainer: {
    backgroundColor: "#E6EAF1",
    width: scale(30),
    height: scale(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(15),
  },
});
