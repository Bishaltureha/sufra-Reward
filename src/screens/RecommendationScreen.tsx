import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { scale } from "../utils/dimen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../types";
import YellowStar from "../../assets/svg/YellowStar";

type Props = {};

const recommendedItems = [
  {
    id: 1,
    name: "Burger",
    price: "20 SR",
    image: require("../../assets/image/Burger.png"),
  },
  {
    id: 2,
    name: "Sweet Potato Pie",
    price: "25 SR",
    image: require("../../assets/image/SweetPotatoPie.jpg"),
  },
  {
    id: 3,
    name: "Coca Cola",
    price: "15 SR",
    image: require("../../assets/image/cocacola.png"),
  },
];

const RecommendationScreen = (props: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

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

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAddToCartEnabled = () => {
    return quantity > 0 && selectedItems.length > 0;
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", { quantity, selectedItems });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleNoThanks = () => {
    closeModal();
    navigation.navigate("CartScreen");
  };

  const handleAddToCartFromModal = () => {
    if (selectedItems.length > 0) {
      console.log("Modal items added:", selectedItems);
      closeModal();
      navigation.navigate("CartScreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.floatingButton} onPress={handleBack}>
          <Ionicons name="close" size={scale(30)} color="#017851" />
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

          <TouchableOpacity style={styles.floatingButton} onPress={handleShare}>
            <Entypo name="share-alternative" size={scale(22)} color="#017851" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: scale(160) }}>
        <Image
          resizeMode="cover"
          source={require("../../assets/image/productImage/Cookie.png")}
          style={{ width: "100%", height: scale(390) }}
        />
        <View style={styles.productInfo}>
          <View style={styles.priceRow}>
            <Text style={styles.productName}>Cookie Tart</Text>
            <Text style={styles.price}>12 SR</Text>
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
            Chocolate butter cookie tart with cocoa hazelnut {"\n"}cream
            filling.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#f5f5f5",
            padding: scale(16),
          }}
        >
          <Text
            style={{
              fontFamily: "Rubik-SemiBold",
              fontWeight: "600",
              fontSize: scale(16),
              color: "#4A4A4A",
            }}
          >
            Would you like to add any of these?
          </Text>
          <Text
            style={{
              color: "#717171",
              fontFamily: "Rubik-Regular",
              fontWeight: "400",
              fontSize: scale(14),
              marginBottom: scale(16),
            }}
          >
            Recommended with your selection
          </Text>
          <View style={styles.divider} />

          {recommendedItems.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.orderRow}
                onPress={() => toggleItemSelection(item.id)}
              >
                <Image source={item.image} style={styles.orderImage} />
                <View style={styles.nameAndPriceRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    selectedItems.includes(item.id) && styles.checkboxSelected,
                  ]}
                >
                  {selectedItems.includes(item.id) && (
                    <Ionicons name="checkmark" size={scale(18)} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
              {index < recommendedItems.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.loyaltySection}>
          <YellowStar />
          <Text style={styles.loyaltyText}>Loyalty Points you will earn</Text>
          <Text style={styles.loyaltyPoints}>10 Points</Text>
        </View>
        <View style={styles.cartSection}>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>

              <View style={styles.quantityDisplay}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              !isAddToCartEnabled() && styles.addToCartButtonDisabled,
            ]}
            onPress={isAddToCartEnabled() ? handleAddToCart : undefined}
            disabled={!isAddToCartEnabled()}
          >
            <Text
              style={[
                styles.addToCartText,
                !isAddToCartEnabled() && styles.addToCartTextDisabled,
              ]}
            >
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()} // Modal content pe click karne se modal close nahi hoga
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeModal}
              >
                <Ionicons name="close" size={scale(24)} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>
              Would you like to add any of these?
            </Text>
            <Text style={styles.modalSubtitle}>
              Recommended with your selection
            </Text>
            <View style={styles.divider} />
            {recommendedItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.orderRow}
                  onPress={() => toggleItemSelection(item.id)}
                >
                  <Image source={item.image} style={styles.orderImage} />
                  <View style={styles.nameAndPriceRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      selectedItems.includes(item.id) &&
                        styles.checkboxSelected,
                    ]}
                  >
                    {selectedItems.includes(item.id) && (
                      <Ionicons
                        name="checkmark"
                        size={scale(18)}
                        color="#fff"
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {index < recommendedItems.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
            <View style={styles.divider} />
            <View style={{ flexDirection: "row", gap: scale(8) }}>
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: scale(52),
                  borderRadius: scale(5),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#017851",
                  borderWidth: scale(1),
                  borderStyle: "solid",
                }}
                onPress={handleNoThanks}
              >
                <Text
                  style={{
                    fontFamily: "Rubik-SemiBold",
                    fontWeight: "600",
                    fontSize: scale(18),
                    color: "#017851",
                  }}
                >
                  No, Thanks
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: scale(52),
                  borderRadius: scale(5),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F6B01F",
                }}
                onPress={handleAddToCartFromModal}
                disabled={selectedItems.length === 0}
              >
                <Text
                  style={{
                    fontFamily: "Rubik-SemiBold",
                    fontWeight: "600",
                    fontSize: scale(18),
                    color: "#000000",
                  }}
                >
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default RecommendationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rightButtons: {
    flexDirection: "row",
    gap: scale(12),
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
  divider: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginVertical: scale(16),
  },
  orderRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  orderImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    marginRight: scale(12),
  },
  nameAndPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginRight: scale(12),
  },
  itemName: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
    flex: 1,
  },
  itemPrice: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
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
  bottomContainer: {
    width: "100%",
    height: scale(144),
    position: "absolute",
    bottom: 0,
  },
  loyaltySection: {
    flexDirection: "row",
    width: "100%",
    height: scale(38),
    backgroundColor: "#E6EAF1",
    alignItems: "center",
    paddingHorizontal: scale(16),
  },
  loyaltyText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    marginStart: scale(10),
    flex: 1,
  },
  loyaltyPoints: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  cartSection: {
    backgroundColor: "#ffffff",
    height: scale(106),
    width: "100%",
    padding: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    width: scale(130),
    height: scale(48),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    borderRadius: scale(5),
    overflow: "hidden",
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  quantityButton: {
    width: scale(40),
    height: "100%",
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: scale(20),
    color: "#000000",
  },
  quantityDisplay: {
    width: scale(50),
    height: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(20),
    color: "#000000",
  },
  addToCartButton: {
    width: scale(220),
    height: scale(48),
    borderRadius: scale(5),
    backgroundColor: "#F6B01F",
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  addToCartText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    textAlign: "center",
    color: "#000000",
  },
  addToCartTextDisabled: {
    color: "#9CA3AF",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: scale(483),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    padding: scale(20),
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: scale(6),
    position: "relative",
  },
  modalCloseButton: {
    position: "absolute",
    right: 0,
    top: scale(8),
    width: scale(32),
    height: scale(32),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A5ACBD",
    borderRadius: scale(16),
  },
  modalTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
  },
  modalSubtitle: {
    color: "#717171",
    fontWeight: "400",
    fontFamily: "Rubik-Regular",
    fontSize: scale(14),
  },
});
