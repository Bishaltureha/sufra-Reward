import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { scale } from "../../utils/dimen";
import YourPastOrdersModel from "./YourPastOrdersModel";
import ReviewOrderModal from "./ReviewOrderModal";

type YourPastOrdersProps = {
  style?: ViewStyle | ViewStyle[];
};

const ordersData = [
  {
    id: 1,
    name: "Alien Burger, Coca Cola, Sweet \nPotato Pie",
    items: 3,
    price: "150 SR",
    date: "18 May, Tue",
    image: require("../../../assets/image/Burger.png"),
  },
  {
    id: 2,
    name: "Chicken Burger, \nFries, Coke",
    items: 2,
    price: "120 SR",
    date: "17 May, Mon",
    image: require("../../../assets/image/BurgsterBurgsterMenu.png"),
  },
  {
    id: 3,
    name: "Veggie Pizza, \nGarlic Bread",
    items: 2,
    price: "90 SR",
    date: "16 May, Sun",
    image: require("../../../assets/image/BurgsterFryster.png"),
  },
  {
    id: 4,
    name: "Cheese Burger, \nFries, Pepsi",
    items: 3,
    price: "135 SR",
    date: "15 May, Sat",
    image: require("../../../assets/image/ChickenFryster.png"),
  },
  {
    id: 5,
    name: "Double Cheese Pizza, \nCoke",
    items: 2,
    price: "110 SR",
    date: "14 May, Fri",
    image: require("../../../assets/image/MacCheeseBalls.png"),
  },
];
const YourPastOrders = (Props: { style }) => {
  const [selectedOrderModalVisible, setSelectedOrderModalVisible] =
    useState(false);
  const [reviewOrderModalVisible, setReviewOrderModalVisible] = useState(false);

  const handleOrderPress = () => {
    setSelectedOrderModalVisible(true);
  };

  const handleReviewOrder = () => {
    setSelectedOrderModalVisible(false);
    // Small delay for smooth transition
    setTimeout(() => {
      setReviewOrderModalVisible(true);
    }, 300);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Your Past Orders</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(12),
        }}
      >
        {ordersData.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderContainer}
            onPress={handleOrderPress}
          >
            <Image
              source={order.image}
              style={{
                width: scale(60),
                height: scale(60),
                borderRadius: scale(8),
              }}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.orderName}>{order.name}</Text>
              <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.itemsBadge}>
                  <Text style={styles.itemsText}>{order.items} Items</Text>
                </TouchableOpacity>
                <Text style={styles.priceText}>
                  {order.price}{" "}
                  <Text style={styles.dateText}>• {order.date}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <YourPastOrdersModel
        visible={selectedOrderModalVisible}
        onClose={() => setSelectedOrderModalVisible(false)}
        onReviewOrder={handleReviewOrder}
      />

      <ReviewOrderModal
        visible={reviewOrderModalVisible}
        onClose={() => setReviewOrderModalVisible(false)}
      />
      {/* Your review order content */}
    </View>
  );
};

export default YourPastOrders;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    backgroundColor: "#E6EAF1",
    paddingVertical: scale(12),
    paddingStart: scale(-16),
    paddingEnd: scale(-16),
  },
  headerText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    marginBottom: scale(12),
    paddingHorizontal: scale(12),
  },
  orderContainer: {
    width: scale(320),
    minHeight: scale(84),
    padding: scale(12),
    borderRadius: scale(10),
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    marginRight: scale(12),
  },
  detailsContainer: {
    flex: 1,
    marginStart: scale(16),
    justifyContent: "space-between",
  },
  orderName: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(8),
  },
  itemsBadge: {
    width: scale(52),
    height: scale(19),
    borderRadius: scale(4),
    backgroundColor: "#FEAC00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
  },
  itemsText: {
    fontFamily: "Rubik-Medium",
    color: "#000000",
    fontWeight: "500",
    fontSize: scale(10),
  },
  priceText: {
    color: "#717171",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(12),
  },
  dateText: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
});
