import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { scale } from "../utils/dimen";
import FreeDelivery from "../../assets/svg/FreeDelivery";
import Icon from "react-native-vector-icons/MaterialIcons";

const OrderAgainCard = ({ item, onFavoritePress, onCardPress }) => {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavoritePress && onFavoritePress(item.id, !isFavorite);
  };

  return (
    <TouchableOpacity
      style={styles.orderAgainCard}
      onPress={() => onCardPress && onCardPress(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.cardImage} />

      {/* Free Delivery Badge */}
      {item.hasFreeDelivery && (
        <View style={styles.freeDeliveryBadge}>
          <FreeDelivery height={scale(14)} width={scale(14)} />
          <Text style={styles.freeDeliveryText}>Free Delivery</Text>
        </View>
      )}

      {/* Favorite Button */}
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Icon
          name={isFavorite ? "favorite" : "favorite-outline"}
          size={20}
          color="#017851"
        />
      </TouchableOpacity>

      {/* Delivery Time Badge */}
      <View style={styles.timeContainer}>
        <Icon name="access-time" size={16} color="#4A4A4A" />
        <Text style={styles.timeText}>15-25</Text>
        <Text style={styles.timeTextMin}>min</Text>
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.distance}>{item.distance} •</Text>
          <Text style={styles.cuisine}>{item.cuisine}</Text>
        </View>

        {item.hasFreeDelivery && (
          <Text style={styles.freeDeliveryBottom}>Free Delivery</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const OrderAgainSection = ({
  title = "Order Again",
  data = [],
  onFavoritePress,
  onCardPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.orderAgainSection, containerStyle]}>
      <Text style={styles.orderAgainTitle}>{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.orderAgainScrollContainer}
        style={styles.horizontalScroll}
      >
        {data.map((item, index) => (
          <OrderAgainCard
            key={item.id || index}
            item={item}
            onFavoritePress={onFavoritePress}
            onCardPress={onCardPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  orderAgainSection: {
    marginTop: scale(16),
  },
  orderAgainTitle: {
    color: "#4A4A4A",
    fontSize: scale(18),
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
    paddingHorizontal: scale(16),
  },
  horizontalScroll: {
    marginTop: scale(15),
  },
  orderAgainScrollContainer: {
    paddingLeft: scale(16),
    paddingRight: scale(8),
    gap: scale(16),
  },
  orderAgainCard: {
    width: scale(310),
    height: scale(262),
    borderRadius: scale(6),
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  cardImage: {
    width: scale(310),
    height: scale(174),
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
  },
  freeDeliveryBadge: {
    width: scale(106),
    height: scale(23),
    borderTopRightRadius: scale(6),
    borderBottomRightRadius: scale(6),
    backgroundColor: "#F6B01F",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: scale(10),
    left: scale(0),
  },
  freeDeliveryText: {
    fontSize: scale(12),
    fontFamily: "Rubik-Medium",
    color: "#000000",
  },
  favoriteButton: {
    position: "absolute",
    top: scale(5),
    right: scale(10),
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    paddingStart: scale(10),
    gap: scale(5),
    paddingTop: scale(10),
  },
  restaurantName: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(15),
    color: "#4A4A4A",
  },
  infoRow: {
    flexDirection: "row",
  },
  distance: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(13),
    color: "#717171",
  },
  cuisine: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#717171",
  },
  freeDeliveryBottom: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#007852",
  },
  timeContainer: {
    width: scale(112),
    height: scale(36),
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: scale(150),
    right: scale(16),
    borderRadius: scale(30),
    justifyContent: "center",
    alignItems: "center",
    gap: scale(5),
    // iOS Shadow Properties
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15, // #00000026 = 38/255 ≈ 0.15
    shadowRadius: 3,
    // Android Shadow Property
    elevation: 3,
  },
  timeText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    color: "#4A4A4A",
  },
  timeTextMin: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#4A4A4A",
  },
});

export default OrderAgainSection;
