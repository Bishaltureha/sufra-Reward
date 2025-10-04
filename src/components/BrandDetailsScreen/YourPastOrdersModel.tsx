import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { scale } from "../../utils/dimen";
import ShowMorePlusLogo from "../../../assets/svg/ShowMorePlusLogo";
import Trash from "../../../assets/svg/Trash";
import { AntDesign } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface YourPastOrdersModelProps {
  visible: boolean;
  onClose;
  onReviewOrder;
}

const YourPastOrdersModel: React.FC<YourPastOrdersModelProps> = ({
  visible,
  onClose,
  onReviewOrder,
}) => {
  // State for quantities
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 0, // Not available
    item3: 1,
  });

  // Handler to increment quantity
  const handleIncrement = (itemKey: string) => {
    setQuantities((prev) => ({
      ...prev,
      [itemKey]: prev[itemKey] + 1,
    }));
  };

  // Handler to decrement quantity
  const handleDecrement = (itemKey: string) => {
    setQuantities((prev) => ({
      ...prev,
      [itemKey]: Math.max(0, prev[itemKey] - 1),
    }));
  };

  // Calculate total
  const calculateTotal = () => {
    return quantities.item1 * 80 + quantities.item3 * 20;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Icon name="close" size={scale(18)} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.modalTitle}>Select Items</Text>
          {/* Modal Content */}
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Order Item 1 */}
            <View style={styles.divider} />
            <View style={styles.orderRow}>
              <Image
                source={require("../../../assets/image/Burger.png")}
                style={styles.orderImage}
              />
              <View style={styles.orderDetails}>
                <View style={styles.nameAndPriceRow}>
                  <Text style={styles.itemName}>Alien Burger</Text>
                  <Text style={styles.itemPrice}>80 SR</Text>
                </View>
                <Text style={styles.itemExtra}>+ Organic Black Beans</Text>
                <Text style={styles.itemExtra}>+ Roasted Chipotle</Text>

                <View style={styles.bottomRow}>
                  <View style={styles.showMoreRow}>
                    <ShowMorePlusLogo width={scale(20)} height={scale(20)} />
                    <Text style={styles.showMoreText}>Show More</Text>
                  </View>
                  <View style={styles.quantityBox}>
                    <TouchableOpacity
                      onPress={() => handleDecrement("item1")}
                      activeOpacity={0.7}
                    >
                      {quantities.item1 >= 2 ? (
                        <AntDesign
                          name="minus"
                          size={scale(15)}
                          color="#017851"
                        />
                      ) : (
                        <Trash width={scale(20)} height={scale(20)} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantities.item1}</Text>
                    <TouchableOpacity
                      onPress={() => handleIncrement("item1")}
                      activeOpacity={0.7}
                    >
                      <AntDesign name="plus" size={scale(15)} color="#017851" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Order Item 2 */}
            <View style={styles.divider} />
            <View style={styles.orderRow}>
              <Image
                source={require("../../../assets/image/SweetPotatoPie.jpg")}
                style={styles.orderImage}
              />
              <View style={styles.orderDetails}>
                <View style={styles.nameAndPriceRow}>
                  <Text style={styles.itemName}></Text>
                  <Text style={styles.notAvailableText}></Text>
                </View>
                <View style={styles.nameAndPriceRow}>
                  <Text style={styles.itemName}>Sweet Potato Pie</Text>
                  <Text style={styles.notAvailableText}>
                    Not {"\n"}Available
                  </Text>
                </View>

                <View style={styles.bottomRow}>
                  <View style={styles.showMoreRow}>
                    <ShowMorePlusLogo width={scale(20)} height={scale(20)} />
                    <Text style={styles.showMoreText}>Show Less</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Order Item 3 */}
            <View style={styles.divider} />
            <View style={styles.orderRow}>
              <Image
                source={require("../../../assets/image/cocacola.png")}
                style={[
                  styles.orderImage,
                  { borderWidth: scale(1), borderColor: "#E6EAF1" },
                ]}
              />
              <View style={styles.orderDetails}>
                <View style={styles.nameAndPriceRow}>
                  <Text style={styles.itemName}></Text>
                  <Text style={styles.itemPrice}></Text>
                </View>
                <View style={styles.nameAndPriceRow}>
                  <Text style={styles.itemName}>Coca Cola</Text>
                  <Text style={styles.itemPrice}>20 SR</Text>
                </View>

                <View style={styles.bottomRow}>
                  <View style={styles.showMoreRow}>
                    <Text style={styles.showMoreText}></Text>
                  </View>
                  <View style={styles.quantityBox}>
                    <TouchableOpacity
                      onPress={() => handleDecrement("item3")}
                      activeOpacity={0.7}
                    >
                      {quantities.item3 >= 2 ? (
                        <AntDesign
                          name="minus"
                          size={scale(15)}
                          color="#017851"
                        />
                      ) : (
                        <Trash width={scale(20)} height={scale(20)} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantities.item3}</Text>
                    <TouchableOpacity
                      onPress={() => handleIncrement("item3")}
                      activeOpacity={0.7}
                    >
                      <AntDesign name="plus" size={scale(15)} color="#017851" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer with Total and Add to Cart */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>{calculateTotal()} SR</Text>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              activeOpacity={0.8}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ReviewYourOrderButton}
              activeOpacity={0.8}
              onPress={onReviewOrder}
            >
              <Text style={styles.ReviewYourOrderText}>Review Your Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default YourPastOrdersModel;

// ... styles remain the same

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    height: scale(586),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    paddingHorizontal: scale(16),
    paddingTop: scale(20),
  },
  closeButton: {
    position: "absolute",
    top: scale(20),
    right: scale(20),
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#A5ACBD",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modalTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
    marginBottom: scale(8),
    textAlign: "left",
  },
  modalContent: {
    flex: 1,
    marginBottom: scale(8),
  },
  divider: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginVertical: scale(12),
  },
  orderRow: {
    flexDirection: "row",
    width: "100%",
  },
  orderImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    marginRight: scale(12),
  },

  orderDetails: {
    flex: 1,
  },
  nameAndPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: scale(0),
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
    marginLeft: scale(8),
    textAlign: "center",
    marginEnd: scale(25),
  },
  notAvailableText: {
    color: "#FF617E",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    textAlign: "center",
    lineHeight: scale(18),
    marginLeft: scale(8),
  },
  itemExtra: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
    marginBottom: scale(2),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(0),
  },
  showMoreRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  showMoreText: {
    color: "#4B5675",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    marginLeft: scale(8),
  },
  quantityBox: {
    backgroundColor: "#FFFFFF",
    width: scale(98),
    height: scale(34),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    borderRadius: scale(20),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  quantityText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  footer: {
    paddingTop: scale(12),
    paddingBottom: scale(16),
    borderTopWidth: scale(1),
    borderTopColor: "#E6EAF1",
    gap: scale(10),
    marginBottom: scale(20),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(12),
  },
  totalLabel: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  totalPrice: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  addToCartButton: {
    backgroundColor: "#F6B01F",
    height: scale(52),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#000000",
  },
  ReviewYourOrderButton: {
    backgroundColor: "#FFFFFF",
    height: scale(52),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(1),
    borderColor: "#017851",
  },
  ReviewYourOrderText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#017851",
  },
});
