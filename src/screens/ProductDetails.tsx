import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { scale } from "../utils/dimen";
import { MainStackParamList, RootStackParamList } from "../types";
import YellowStar from "../../assets/svg/YellowStar";
import Regular from "../../assets/svg/Regular";
import Double from "../../assets/svg/Double";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slice/cart";

type ProductDetailsRouteProp = RouteProp<MainStackParamList, "ProductDetails">;

const ProductDetails = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();
  const { productData } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProtein, setSelectedProtein] = useState<number | null>(0);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [selectedDifferent, setSelectedDifferent] = useState<number[]>([]);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [proteinSizeConfirmed, setProteinSizeConfirmed] = useState(false);
  const [selectedProteinSize, setSelectedProteinSize] = useState<number | null>(
    null
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const proteinSectionY = useRef(0);
  const extraSectionY = useRef(0);
  const differentSectionY = useRef(0);

  const tabs = ["Pick a Protein*", "Extras", "Different Choice*"];

  const proteinOptions = [
    { id: 0, name: "Chicken Per-Peri", price: "(+10 SR)" },
    { id: 1, name: "Penne Arabiata", price: "(+6 SR)" },
    { id: 2, name: "Penne Arabiata", price: "(+6 SR)" },
  ];
  const Extra = [
    { id: 0, name: "Mayonez", price: "(+6 SR)" },
    { id: 1, name: "Ketchup", price: "(+10 SR)" },
    { id: 2, name: "Mushroom & Chicken Alfredo", price: "(+6 SR)" },
  ];
  const Different = [
    { id: 0, name: "Chicken Per-Peri", price: "(+10 SR)" },
    { id: 1, name: "Pepperoni", price: "(+6 SR)" },
    { id: 2, name: "Mushroom & Chicken Alfredo", price: "(+6 SR)" },
    { id: 3, name: "Penne Arrabiata", price: "(+6 SR)" },
    { id: 4, name: "Penne Arrabiata", price: "(+6 SR)" },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Share logic
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleExtra = (id: number) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((item) => item !== id));
    } else {
      if (selectedExtras.length < 2) {
        setSelectedExtras([...selectedExtras, id]);
      }
    }
  };

  const toggleDifferent = (id: number) => {
    if (selectedDifferent.includes(id)) {
      setSelectedDifferent(selectedDifferent.filter((item) => item !== id));
    } else {
      setSelectedDifferent([...selectedDifferent, id]);
    }
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowStickyHeader(scrollY > scale(420));
  };

  const scrollToTab = (index: number) => {
    setActiveTab(index);
    let yOffset = 0;

    if (index === 0) {
      yOffset = proteinSectionY.current;
    } else if (index === 1) {
      yOffset = extraSectionY.current;
    } else if (index === 2) {
      yOffset = differentSectionY.current;
    }

    scrollViewRef.current?.scrollTo({
      y: yOffset - scale(-250),
      animated: true,
    });
  };

  const handleAddToCart = () => {
    // Only open modal if basic requirements are met (protein + extras + different)
    if (
      selectedProtein !== null &&
      selectedExtras.length >= 1 &&
      selectedDifferent.length >= 1
    ) {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProteinSize(null);
  };

  const handleDone = () => {
    if (selectedProteinSize !== null) {
      setProteinSizeConfirmed(true);
      closeModal();

      // Get selected protein, extras, and different options
      const selectedProteinData = proteinOptions.find(
        (p) => p.id === selectedProtein
      );
      const selectedExtrasData = selectedExtras
        .map((id) => Extra.find((e) => e.id === id))
        .filter(Boolean);
      const selectedDifferentData = selectedDifferent
        .map((id) => Different.find((d) => d.id === id))
        .filter(Boolean);

      // Add to cart with full customization
      dispatch(
        addToCart({
          product: {
            id: productData.id,
            name: productData.name,
            image: productData.image,
            price: productData.price,
            originalPrice: productData.originalPrice,
            quantity: quantity,
          },
          customization: {
            protein: selectedProteinData
              ? {
                  id: selectedProteinData.id,
                  name: selectedProteinData.name,
                  price: selectedProteinData.price,
                }
              : undefined,
            extras: selectedExtrasData.map((e) => ({
              id: e!.id,
              name: e!.name,
              price: e!.price,
            })),
            different: selectedDifferentData.map((d) => ({
              id: d!.id,
              name: d!.name,
              price: d!.price,
            })),
            proteinSize: selectedProteinSize === 0 ? "Regular" : "Double",
            proteinSizePrice: selectedProteinSize === 0 ? 10 : 16,
          },
        })
      );

      navigation.navigate("Recommendation");
    }
  };

  const isAddToCartEnabled = () => {
    const hasProtein = selectedProtein !== null;
    const hasExtras = selectedExtras.length === 2; // Requires exactly 2
    const hasDifferent = selectedDifferent.length === 5; // Requires exactly 5
    return hasProtein && hasExtras && hasDifferent;
  };
  const getSubtitleColor = (
    sectionType: "protein" | "extras" | "different"
  ) => {
    if (sectionType === "protein") {
      return selectedProtein !== null ? "#017851" : "#EF4444";
    } else if (sectionType === "extras") {
      return selectedExtras.length === 2 ? "#017851" : "#EF4444";
    } else if (sectionType === "different") {
      return selectedDifferent.length === 5 ? "#017851" : "#EF4444";
    }
    return "#717171";
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={showStickyHeader ? "dark-content" : "light-content"}
        backgroundColor="transparent"
        translucent
      />

      {/* Floating Action Buttons - Hide when sticky header shows */}
      {!showStickyHeader && (
        <View style={styles.floatingButtons}>
          <TouchableOpacity style={styles.floatingButton} onPress={handleBack}>
            <Ionicons name="close" size={scale(24)} color="#017851" />
          </TouchableOpacity>

          <View style={styles.rightButtons}>
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={handleFavorite}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={scale(24)}
                color="#017851"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.floatingButton}
              onPress={handleShare}
            >
              <Entypo
                name="share-alternative"
                size={scale(22)}
                color="#017851"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Sticky Top Header - Show when scrolled */}
      {showStickyHeader && (
        <View style={styles.stickyTopHeader}>
          <TouchableOpacity
            style={styles.stickyIconButton}
            onPress={handleBack}
          >
            <Ionicons name="close" size={scale(24)} color="#017851" />
          </TouchableOpacity>

          <Text style={styles.stickyHeaderTitle} numberOfLines={1}>
            {productData.name}
          </Text>

          <View style={styles.stickyRightButtons}>
            <TouchableOpacity
              style={styles.stickyIconButton}
              onPress={handleFavorite}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={scale(24)}
                color="#017851"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stickyIconButton}
              onPress={handleShare}
            >
              <Entypo
                name="share-alternative"
                size={scale(22)}
                color="#017851"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Sticky Tab Bar - Shows below sticky header when scrolled */}
      {showStickyHeader && (
        <View style={styles.absoluteTabHeader}>
          <View style={styles.tabHeader}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tab}
                onPress={() => scrollToTab(index)}
              >
                <Text
                  style={[
                    styles.inActiveTabText,
                    activeTab === index && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === index && (
                  <View style={styles.activeTabIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          showStickyHeader && styles.scrollContentWithStickyTab,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={showStickyHeader ? [] : [2]}
      >
        <Image
          resizeMode="cover"
          source={productData.image}
          style={styles.productImage}
        />

        {/* Product Info Section */}
        <View style={styles.productInfo}>
          <View style={styles.priceRow}>
            <Text style={styles.productName}>{productData.name}</Text>
            <Text style={styles.price}>{productData.price} SR</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#717171",
                fontFamily: "Rubik-Regular",
                fontWeight: "400",
                fontSize: scale(13),
              }}
            >
              900-1100 cal
            </Text>
            <Text
              style={{
                color: "#717171",
                fontFamily: "Rubik-Regular",
                fontWeight: "400",
                fontSize: scale(12),
              }}
            >
              incl. VAT
            </Text>
          </View>
          <View style={styles.divider} />
          <Text
            style={{
              color: "#71717A",
              fontFamily: "Rubik-Regular",
              fontWeight: "400",
              fontSize: scale(14),
              lineHeight: scale(22),
            }}
          >
            Your selection of any 2 Pizza or Pasta, 2 soups, 1 Appetizer & 1
            Choice of Drinks. Your selection of any 2 Pizza or Pasta, 1
            Appetizer & 1 Choice of Drinks.
          </Text>
        </View>

        {/* Tab Header Inside ScrollView - only when sticky header is off */}
        {!showStickyHeader && (
          <View style={styles.stickyTabHeader}>
            <View style={styles.tabHeader}>
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tab}
                  onPress={() => scrollToTab(index)}
                >
                  <Text
                    style={[
                      styles.inActiveTabText,
                      activeTab === index && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                  {activeTab === index && (
                    <View style={styles.activeTabIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {/* Pick a Protein Section */}
          <View
            onLayout={(event) => {
              proteinSectionY.current = event.nativeEvent.layout.y;
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Pick a Protein
                <Text
                  style={[
                    styles.sectionSubtitle,
                    { color: getSubtitleColor("protein") },
                  ]}
                >
                  {" "}
                  - 1 selection
                </Text>
                {/* <Text style={styles.sectionSubtitle}> - 1 selection</Text> */}
              </Text>
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>Required</Text>
              </View>
            </View>
            <View style={styles.optionsContainer}>
              {proteinOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={() => setSelectedProtein(option.id)}
                >
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionName}>{option.name}</Text>
                    <Text style={styles.optionPrice}>{option.price}</Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedProtein === option.id &&
                        styles.radioButtonSelected,
                    ]}
                  >
                    {selectedProtein === option.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Extras Section */}
          <View
            onLayout={(event) => {
              extraSectionY.current = event.nativeEvent.layout.y;
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Extras
                <Text
                  style={[
                    styles.sectionSubtitle,
                    { color: getSubtitleColor("extras") },
                  ]}
                >
                  {" "}
                  - up to 2 selections
                </Text>
              </Text>
              <View style={styles.optionalBadge}>
                <Text
                  style={[
                    styles.optionalText,
                    { color: getSubtitleColor("extras") },
                  ]}
                >
                  Optional
                </Text>
              </View>
            </View>
            <View style={styles.optionsContainer}>
              {Extra.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={() => toggleExtra(option.id)}
                >
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionName}>{option.name}</Text>
                    <Text style={styles.optionPrice}>{option.price}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      selectedExtras.includes(option.id) &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {selectedExtras.includes(option.id) && (
                      <Ionicons
                        name="checkmark"
                        size={scale(18)}
                        color="#fff"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Different Section */}
          <View
            onLayout={(event) => {
              differentSectionY.current = event.nativeEvent.layout.y;
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Different
                <Text
                  style={[
                    styles.sectionSubtitle,
                    { color: getSubtitleColor("different") },
                  ]}
                >
                  {" "}
                  - up to 5 selections
                </Text>
              </Text>
              <View style={styles.optionalBadge}>
                <Text
                  style={[
                    styles.optionalText,
                    { color: getSubtitleColor("different") },
                  ]}
                >
                  Optional
                </Text>
              </View>
            </View>
            <View style={styles.optionsContainer}>
              {Different.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={() => toggleDifferent(option.id)}
                >
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionName}>{option.name}</Text>
                    <Text style={styles.optionPrice}>{option.price}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      selectedDifferent.includes(option.id) &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {selectedDifferent.includes(option.id) && (
                      <Ionicons
                        name="checkmark"
                        size={scale(18)}
                        color="#fff"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Cart Section */}
      <View
        style={{
          width: "100%",
          height: scale(144),
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: scale(0),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: scale(38),
            backgroundColor: "#E6EAF1",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: scale(16),
          }}
        >
          <YellowStar />
          <Text
            style={{
              color: "#4A4A4A",
              fontFamily: "Rubik-SemiBold",
              fontWeight: "600",
              fontSize: scale(14),
              marginStart: scale(10),
            }}
          >
            Loyalty Points you will earn
          </Text>
          <Text
            style={{
              color: "#4A4A4A",
              fontFamily: "Rubik-SemiBold",
              fontWeight: "600",
              fontSize: scale(14),
              marginStart: scale(100),
              textAlign: "right",
            }}
          >
            10 Points
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#ffffff",
            height: scale(106),
            width: "100%",
            padding: scale(16),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: scale(130),
              height: scale(48),
              borderWidth: scale(1),
              borderColor: "#E6E6E6",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: scale(5),
                overflow: "hidden",
                borderWidth: scale(1),
                borderColor: "#E6E6E6",
              }}
            >
              <TouchableOpacity
                style={{
                  width: scale(40),
                  height: scale(48),
                  backgroundColor: "#F4F4F4",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={decrementQuantity}
              >
                <Text style={{ fontSize: scale(20), color: "#000000" }}>−</Text>
              </TouchableOpacity>

              <View
                style={{
                  width: scale(50),
                  height: scale(48),
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Rubik-SemiBold",
                    fontWeight: "600",
                    fontSize: scale(20),
                    color: "#000000",
                  }}
                >
                  {quantity}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  width: scale(40),
                  height: scale(48),
                  backgroundColor: "#F4F4F4",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={incrementQuantity}
              >
                <Text style={{ fontSize: scale(20), color: "#000000" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: scale(220),
              height: scale(48),
              borderRadius: scale(5),
              backgroundColor: isAddToCartEnabled() ? "#F6B01F" : "#E5E7EB",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={isAddToCartEnabled() ? handleAddToCart : undefined}
            disabled={!isAddToCartEnabled()}
          >
            <Text
              style={{
                fontFamily: "Rubik-SemiBold",
                fontWeight: "600",
                fontSize: scale(18),
                textAlign: "center",
                color: isAddToCartEnabled() ? "#000000" : "#9CA3AF",
              }}
            >
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              {/* Modal Header with Close Button */}
              <View style={styles.modalHeader}>
                <View style={styles.dragIndicator} />
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={closeModal}
                >
                  <Ionicons name="close" size={scale(24)} color="#4A4A4A" />
                </TouchableOpacity>
              </View>

              {/* Modal Body */}
              <View style={styles.modalBody}>
                <Text style={styles.modalTitle}>
                  Would you like your {"\n"}protein double or regular?
                </Text>
                <View style={styles.divider} />

                {/* Regular Option */}
                <TouchableOpacity
                  style={styles.modalOptionRow}
                  onPress={() => setSelectedProteinSize(0)}
                >
                  <View style={styles.modalOptionContent}>
                    <Regular />
                    <View style={styles.modalOptionTextContainer}>
                      <Text style={styles.modalOptionName}>Regular</Text>
                      <Text style={styles.modalOptionPrice}>(+10 SR)</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedProteinSize === 0 && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedProteinSize === 0 && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Double Option */}
                <TouchableOpacity
                  style={styles.modalOptionRow}
                  onPress={() => setSelectedProteinSize(1)}
                >
                  <View style={styles.modalOptionContent}>
                    <Double />
                    <View style={styles.modalOptionTextContainer}>
                      <Text style={styles.modalOptionName}>Double</Text>
                      <Text style={styles.modalOptionPrice}>(+16 SR)</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedProteinSize === 1 && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedProteinSize === 1 && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Done Button */}
                <TouchableOpacity
                  style={[
                    styles.doneButton,
                    selectedProteinSize === null && styles.doneButtonDisabled,
                  ]}
                  onPress={handleDone}
                  disabled={selectedProteinSize === null}
                >
                  <Text
                    style={[
                      styles.doneButtonText,
                      selectedProteinSize === null &&
                        styles.doneButtonTextDisabled,
                    ]}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: scale(160),
  },
  scrollContentWithStickyTab: {
    paddingTop: scale(60),
  },
  productImage: {
    width: "100%",
    height: scale(365),
    resizeMode: "cover",
  },
  productInfo: {
    padding: scale(16),
    backgroundColor: "#fff",
  },
  productName: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(20),
    color: "#4A4A4A",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  price: {
    fontFamily: "Rubik-Bold",
    fontSize: scale(20),
    fontWeight: "700",
    color: "#017851",
  },
  floatingButtons: {
    position: "absolute",
    top: scale(50),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    zIndex: 10,
  },
  rightButtons: {
    flexDirection: "row",
    gap: scale(12),
  },
  floatingButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  divider: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginVertical: scale(16),
  },
  stickyTabHeader: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF1",
  },
  tabHeader: {
    flexDirection: "row",
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  tab: {
    flex: 1,
    paddingVertical: scale(10),
    alignItems: "center",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    height: scale(4),
    width: "100%",
    backgroundColor: "#F6B01F",
    borderTopLeftRadius: scale(2),
    borderTopRightRadius: scale(2),
  },
  inActiveTabText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    color: "#71717A",
    fontSize: scale(14),
  },
  activeTabText: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    color: "#3F3F46",
    fontSize: scale(14),
  },
  tabContent: {
    width: "100%",
  },
  sectionHeader: {
    height: scale(51),
    width: "100%",
    backgroundColor: "#F9F8F8",
    paddingHorizontal: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  sectionSubtitle: {
    color: "#717171",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  requiredBadge: {
    paddingHorizontal: scale(12),
    height: scale(26),
    borderRadius: scale(30),
    backgroundColor: "#C5DED7",
    justifyContent: "center",
    alignItems: "center",
  },
  requiredText: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  optionalBadge: {
    paddingHorizontal: scale(12),
    height: scale(26),
    borderRadius: scale(30),
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  optionalText: {
    color: "#6B7280",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  optionsContainer: {
    backgroundColor: "#ffffff",
    padding: scale(16),
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(12),
  },
  optionInfo: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  optionName: {
    color: "#52525B",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(16),
    marginBottom: scale(2),
  },
  optionPrice: {
    color: "#A1A1AA",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  radioButton: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    borderWidth: scale(2),
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#017851",
  },
  radioButtonInner: {
    width: scale(23),
    height: scale(23),
    borderRadius: scale(12.5),
    borderWidth: scale(4),
    borderColor: "#017851",
  },
  checkbox: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(4),
    borderWidth: scale(2),
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    borderColor: "#017851",
    backgroundColor: "#017851",
  },
  stickyTopHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: scale(100),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingTop: scale(50),
    zIndex: 9999,
  },
  stickyHeaderTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: scale(18),
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    marginHorizontal: scale(8),
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
  stickyRightButtons: {
    flexDirection: "row",
    gap: scale(10),
  },
  absoluteTabHeader: {
    position: "absolute",
    top: scale(100),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 9998,
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF1",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    height: scale(384),
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: scale(12),
    position: "relative",
  },
  dragIndicator: {
    width: scale(40),
    height: scale(4),
    backgroundColor: "#E5E7EB",
    borderRadius: scale(2),
  },
  modalCloseButton: {
    position: "absolute",
    right: scale(16),
    top: scale(12),
    width: scale(32),
    height: scale(32),
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    flex: 1,
    padding: scale(16),
  },
  modalTitle: {
    fontSize: scale(20),
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    color: "#4A4A4A",
  },
  modalOptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginStart: scale(10),
  },
  modalOptionName: {
    color: "#52525B",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(16),
  },
  modalOptionPrice: {
    color: "#A1A1AA",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  doneButton: {
    width: "100%",
    backgroundColor: "#F6B01F",
    borderRadius: scale(5),
    height: scale(52),
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  doneButtonText: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
  },
  doneButtonTextDisabled: {
    color: "#9CA3AF",
  },
});
