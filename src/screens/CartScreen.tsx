import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RootStackParamList } from "../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Trash from "../../assets/svg/Trash";
import YellowStar from "../../assets/svg/YellowStar";
import ToggleSwitch from "../components/ToggleSwitch";

type Props = {};

const CartScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [burgerQuantity, setBurgerQuantity] = useState(1);
  const [pieQuantity, setPieQuantity] = useState(1);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleBurgerIncrement = () => {
    setBurgerQuantity(burgerQuantity + 1);
  };

  const handleBurgerDecrement = () => {
    if (burgerQuantity > 1) {
      setBurgerQuantity(burgerQuantity - 1);
    }
  };

  const handlePieIncrement = () => {
    setPieQuantity(pieQuantity + 1);
  };

  const handlePieDecrement = () => {
    if (pieQuantity > 1) {
      setPieQuantity(pieQuantity - 1);
    }
  };

  const allIngredients = [
    "Organic Black Beans",
    "Roasted Chipotle",
    "White Rice",
    "Chicken",
    "Chips",
    "Ketchup",
  ];

  const displayedIngredients = showAllIngredients
    ? allIngredients
    : allIngredients.slice(0, 2);

  const popularItems = [
    {
      id: 1,
      name: "Chickster Chicken B...",
      price: "15 SR",
      originalPrice: "18 SR",
      image: require("../../assets/image/Burger.png"),
    },
    {
      id: 2,
      name: "Burgster & Fryster M...",
      price: "14 SR",
      originalPrice: "16 SR",
      image: require("../../assets/image/BurgsterBurgsterMenu.png"),
    },
    {
      id: 3,
      name: "Chickster Chicken B...",
      price: "15 SR",
      originalPrice: "18 SR",
      image: require("../../assets/image/BurgsterFryster.png"),
    },
    {
      id: 4,
      name: "Chickster Chicken B...",
      price: "15 SR",
      originalPrice: "18 SR",
      image: require("../../assets/image/ChickenFryster.png"),
    },
    {
      id: 5,
      name: "Burgster & Fryster M...",
      price: "14 SR",
      originalPrice: "16 SR",
      image: require("../../assets/image/MacCheeseBalls.png"),
    },
    {
      id: 6,
      name: "Chickster Chicken B...",
      price: "15 SR",
      originalPrice: "18 SR",
      image: require("../../assets/image/OnionRings.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
            <Ionicons name="close" size={scale(30)} color="#017851" />
          </TouchableOpacity>
          <View style={styles.subHeader}>
            <Text style={styles.cartTitle}>Cart</Text>
            <Text style={styles.restaurantName}>Fire Grill Restaurant</Text>
          </View>
        </View>
        <View style={styles.contentBox}>
          <View style={styles.progressContainer}>
            {[
              { label: "Menu", active: true },
              { label: "Cart", active: true },
              { label: "Checkout", active: false },
            ].map((step, index) => (
              <View key={index} style={styles.progressStep}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: step.active ? "#FBAA19" : "#979797" },
                  ]}
                />
                <Text
                  style={[
                    styles.progressLabel,
                    { color: step.active ? "#FBAA19" : "#979797" },
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.divider} />

          {/* Alien Burger Item */}
          <View style={styles.orderItem}>
            <Image
              source={require("../../assets/image/Burger.png")}
              style={styles.orderImage}
            />
            <View style={styles.orderDetails}>
              <View style={styles.orderRow}>
                <View style={styles.orderInfo}>
                  <Text style={styles.itemName}>Alien Burger</Text>
                  {displayedIngredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredientText}>
                      + {ingredient}
                    </Text>
                  ))}
                  <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={() => setShowAllIngredients(!showAllIngredients)}
                  >
                    <FontAwesome
                      name={
                        showAllIngredients ? "minus-square-o" : "plus-square-o"
                      }
                      size={scale(16)}
                      color="#99A1B7"
                      style={styles.showMoreIcon}
                    />
                    <Text style={styles.showMoreText}>
                      {showAllIngredients ? "Show Less" : "Show More"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemPrice}>80 SR</Text>
              </View>
              <View style={styles.quantityContainerAbsolute}>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity
                    onPress={handleBurgerDecrement}
                    activeOpacity={0.7}
                  >
                    {burgerQuantity >= 2 ? (
                      <AntDesign
                        name="minus"
                        size={scale(15)}
                        color="#017851"
                      />
                    ) : (
                      <Trash />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{burgerQuantity}</Text>
                  <TouchableOpacity
                    onPress={handleBurgerIncrement}
                    activeOpacity={0.7}
                  >
                    <AntDesign name="plus" size={scale(15)} color="#017851" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Sweet Potato Pie Item */}
          <View style={styles.orderItem}>
            <Image
              source={require("../../assets/image/SweetPotatoPie.jpg")}
              style={styles.orderImage}
            />
            <View style={styles.orderDetails}>
              <View style={styles.orderRow}>
                <Text style={styles.itemName}>Sweet Potato Pie</Text>
                <Text style={styles.itemPrice}>50 SR</Text>
              </View>
              <View style={styles.quantityContainer}>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity
                    onPress={handlePieDecrement}
                    activeOpacity={0.7}
                  >
                    {pieQuantity >= 2 ? (
                      <AntDesign
                        name="minus"
                        size={scale(15)}
                        color="#017851"
                      />
                    ) : (
                      <Trash />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{pieQuantity}</Text>
                  <TouchableOpacity
                    onPress={handlePieIncrement}
                    activeOpacity={0.7}
                  >
                    <AntDesign name="plus" size={scale(15)} color="#017851" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />
          <TouchableOpacity>
            <Text style={styles.addMoreText}>+ Add More Items</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* Popular with Your Order Section */}
        <View style={styles.popularSection}>
          <Text style={styles.popularTitle}>Popular with Your Order</Text>
          <Text style={styles.popularSubtitle}>
            Based on what other customers bought together
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {popularItems.map((item) => (
              <View key={item.id} style={styles.popularCard}>
                <Image source={item.image} style={styles.popularImage} />
                <View style={styles.popularCardContent}>
                  <Text style={styles.popularItemName}>{item.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.popularPrice}>{item.price}</Text>
                    <Text style={styles.popularOriginalPrice}>
                      {item.originalPrice}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.addButton}>
                    <AntDesign name="plus" size={scale(18)} color="#017851" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.separator} />
        <View style={styles.cutlerySection}>
          <View>
            <Text style={styles.cutleryTitle}>Plastic Cutlery Choice</Text>
            <Text style={styles.cutlerySubtitle}>
              No plastic is best plastic
            </Text>
          </View>
          <ToggleSwitch />
        </View>
        <View style={styles.bigSeparator} />
      </ScrollView>
      <View>
        <View style={styles.loyaltySection}>
          <YellowStar />
          <Text style={styles.loyaltyText}>Loyalty Points you will earn</Text>
          <Text style={styles.loyaltyPoints}>10 Points</Text>
        </View>

        {showPriceBreakdown && (
          <View>
            <View style={styles.summaryRowFirst}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>230 SR</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.deliveryFreeValue}>FREE</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {"{Promo Name}"}
                <Text style={styles.removeText}>{"  "}- Remove</Text>
              </Text>
              <Text style={styles.discountValue}>-10 SR</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Sufra Points
                <Text style={styles.removeText}>{"  "}- Remove</Text>
              </Text>
              <Text style={styles.discountValue}>-70 SR</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Gift Card
                <Text style={styles.removeText}>{"  "}- Remove</Text>
              </Text>
              <Text style={styles.discountValue}>-100 SR</Text>
            </View>
            <View style={styles.dividerNoPadding} />
          </View>
        )}
        <View style={styles.totalSection}>
          <TouchableOpacity
            style={styles.totalRow}
            onPress={() => setShowPriceBreakdown(!showPriceBreakdown)}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.totalLabel}>
                Total{" "}
                <Text style={styles.totalSubtext}>(incl. fees and tax)</Text>
              </Text>
            </View>
            <View style={styles.priceGroup}>
              <Text style={styles.strikePrice}>230 SR</Text>
              <Text style={styles.finalPrice}>50 SR</Text>

              <MaterialIcons
                name={
                  showPriceBreakdown
                    ? "keyboard-arrow-up"
                    : "keyboard-arrow-down"
                }
                size={24}
                color="#017851"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => setShowConfirmModal(true)}
          >
            <Text style={styles.confirmButtonText}>Confirm Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowConfirmModal(false)}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <Ionicons name="close" size={scale(20)} color="#ffffff" />
              </TouchableOpacity>
              <Image
                source={require("../../assets/image/Carts.png")}
                style={styles.modalCartImage}
              />
              <Text style={styles.modalTitle}>
                Are you sure you want to {"\n"}remove this product?
              </Text>

              <TouchableOpacity
                style={styles.modalRemoveButton}
                onPress={() => {
                  navigation.navigate("Payment", {
                    deliveryAddress: undefined,
                  }),
                    setShowConfirmModal(false);
                }}
              >
                <Text style={styles.modalRemoveButtonText}>Yes, Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalKeepButton}
                onPress={() => {
                  navigation.navigate("Payment", {
                    deliveryAddress: undefined,
                  }),
                    setShowConfirmModal(false);
                }}
              >
                <Text style={styles.modalKeepButtonText}>No, Keep it</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollViewContent: {
    paddingBottom: scale(20),
  },
  header: {
    marginStart: scale(24),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: scale(16),
    marginTop: scale(10),
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    marginStart: scale(8),
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cartTitle: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  restaurantName: {
    color: "#000000",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  contentBox: {
    marginHorizontal: scale(16),
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressStep: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: scale(2),
  },
  progressBar: {
    width: "100%",
    height: scale(3),
    borderRadius: scale(10),
  },
  progressLabel: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
    marginTop: scale(4),
  },
  sectionTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    marginTop: scale(16),
  },
  divider: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginVertical: scale(16),
  },
  dividerNoPadding: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginVertical: scale(0),
    marginTop: scale(16),
  },
  orderItem: {
    flexDirection: "row",
  },
  orderImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
  },
  orderDetails: {
    marginStart: scale(16),
    flex: 1,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderInfo: {
    flex: 1,
  },
  itemName: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
  },
  itemPrice: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  ingredientText: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(4),
  },
  showMoreIcon: {
    marginRight: scale(4),
  },
  showMoreText: {
    color: "#4B5675",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
  },
  quantityContainer: {
    alignItems: "flex-end",
    marginTop: scale(8),
  },
  quantityContainerAbsolute: {
    position: "absolute",
    bottom: scale(0),
    right: scale(0),
    alignItems: "flex-end",
    marginTop: scale(8),
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: scale(20),
    width: scale(98),
    height: scale(34),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    paddingHorizontal: scale(10),
  },
  quantityText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    marginHorizontal: scale(8),
    minWidth: scale(20),
    textAlign: "center",
  },
  addMoreText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  separator: {
    height: scale(8),
    width: "100%",
    backgroundColor: "#f5f5f5",
    marginVertical: scale(10),
  },
  bigSeparator: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  popularSection: {
    paddingStart: scale(16),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  popularTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  popularSubtitle: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    marginTop: scale(4),
  },
  horizontalScrollContent: {
    paddingVertical: scale(10),
  },
  popularCard: {
    marginRight: scale(16),
    width: scale(153),
  },
  popularImage: {
    width: scale(153),
    height: scale(153),
    borderRadius: scale(12),
  },
  popularCardContent: {
    marginTop: scale(8),
  },
  popularItemName: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(4),
  },
  popularPrice: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(16),
    color: "#017851",
  },
  popularOriginalPrice: {
    color: "#717171",
    marginStart: scale(8),
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    textDecorationLine: "line-through",
  },
  addButton: {
    position: "absolute",
    right: scale(6),
    bottom: scale(55),
    backgroundColor: "#ffffff",
    borderRadius: scale(20),
    width: scale(32),
    height: scale(32),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cutlerySection: {
    height: scale(88),
    width: "100%",
    padding: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cutleryTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  cutlerySubtitle: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#717171",
    marginTop: scale(5),
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  summaryRowFirst: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
    marginTop: scale(16),
  },
  summaryLabel: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  summaryValue: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  deliveryFreeValue: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  discountValue: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  removeText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    color: "#FF617E",
  },
  totalSection: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: scale(16),
    paddingBottom: scale(10),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  totalLabel: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  totalSubtext: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  priceGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  strikePrice: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    textDecorationLine: "line-through",
  },
  finalPrice: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  confirmButton: {
    backgroundColor: "#F6B01F",
    width: "100%",
    height: scale(48),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    textAlign: "center",
    fontSize: scale(18),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    height: scale(462),
    backgroundColor: "#ffffff",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    padding: scale(16),
  },
  closeButton: {
    backgroundColor: "#A5ACBD",
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "flex-end",
  },
  modalCartImage: {
    height: scale(106),
    width: scale(106),
    alignSelf: "center",
    marginTop: scale(50),
  },
  modalTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(22),
    textAlign: "center",
    alignSelf: "center",
    marginTop: scale(20),
  },
  modalRemoveButton: {
    borderRadius: scale(5),
    backgroundColor: "#017851",
    height: scale(52),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(20),
  },
  modalRemoveButtonText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
  },
  modalKeepButton: {
    borderRadius: scale(5),
    backgroundColor: "#F6B01F",
    height: scale(52),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(10),
  },
  modalKeepButtonText: {
    color: "#000000",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
  },
});
