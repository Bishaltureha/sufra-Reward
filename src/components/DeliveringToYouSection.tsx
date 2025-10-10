import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { scale } from "../utils/dimen";
import Icon from "react-native-vector-icons/MaterialIcons";
import FreeDelivery from "../../assets/svg/FreeDelivery";
import Star from "../../assets/svg/Star";
import Error from "../../assets/svg/Error";
import LocationModal from "./LocationModal";
import { useLocation } from "../hooks/useLocation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFavorite } from "../store/slice/favorites";

const DeliveryCard = ({ item, onCardPress }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  // Check if this item is in favorites
  const isFavorite = favorites.some(
    (fav) => fav.id === item.id && fav.type === "restaurant"
  );

  const handleToggleFavorite = () => {
    dispatch(
      toggleFavorite({
        id: item.id,
        type: "restaurant",
        name: item.restaurantName,
        image: item.image,
        addedAt: Date.now(),
      })
    );
  };

  const renderDeliveryTime = () => {
    if (item.isOpeningSoon) {
      return (
        <View style={styles.opensTimeRow}>
          <Text style={styles.opensText}>Opens</Text>
          <Text style={styles.atText}> at </Text>
          <Text style={styles.timeValueText}>9 am</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.regularTimeRow}>
          <Text style={styles.timerText}>{item.deliveryTime}</Text>
          <Text style={styles.timeText}>min</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onCardPress && onCardPress(item)}
      activeOpacity={0.8}
    >
      <Image style={styles.cardImage} source={item.image} />

      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}
      >
        <Icon
          name={isFavorite ? "favorite" : "favorite-outline"}
          size={20}
          color="#017851"
        />
      </TouchableOpacity>

      <View style={styles.timeContainer}>
        <Icon name="access-time" size={14} color="#4A4A4A" />
        {renderDeliveryTime()}
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.distance}>{item.distance} km</Text>
          <Text style={styles.cuisine}> • {item.cuisine}</Text>
        </View>

        <Text style={styles.freeDeliveryText}>{item.delivery}</Text>
      </View>

      <View style={styles.badgeContainer}>
        <FreeDelivery height={scale(14)} width={scale(14)} />
        <Text style={styles.badgeContainerText}>Free Delivery</Text>
      </View>

      {item.hasDoublePoints && (
        <View style={styles.badgeStarContainer}>
          <Star />
          <Text style={styles.badgeStarText}>Earn double points</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const DeliveringToYouSection = ({
  title = "Delivering to you",
  data = [],
  onCardPress,
  onManualAddressPress,
}) => {
  const { isEnabled: isLocationEnabled } = useLocation();
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const handleEnableLocationPress = () => {
    setLocationModalVisible(true);
  };

  const handleManualAddress = () => {
    setLocationModalVisible(false);
    if (onManualAddressPress) {
      onManualAddressPress();
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {!isLocationEnabled && (
          <TouchableOpacity
            style={styles.row}
            onPress={handleEnableLocationPress}
          >
            <Error />
            <Text style={styles.enableLocationText}>Enable Location</Text>
          </TouchableOpacity>
        )}
      </View>

      {data.map((item, index) => (
        <DeliveryCard
          key={item.id || index}
          item={item}
          onCardPress={onCardPress}
        />
      ))}

      <LocationModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: scale(16),
    marginHorizontal: scale(16),
  },
  sectionTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
  },
  cardContainer: {
    width: "100%",
    height: scale(292),
    borderRadius: scale(6),
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 3,
    marginTop: scale(18),
  },
  cardImage: {
    width: "100%",
    height: scale(201),
    borderTopRightRadius: scale(6),
    borderTopLeftRadius: scale(6),
  },
  favoriteButton: {
    position: "absolute",
    top: scale(7),
    right: scale(10),
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: scale(180),
    right: scale(16),
    borderRadius: scale(30),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    gap: scale(5),
  },
  regularTimeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    color: "#4A4A4A",
    fontSize: scale(14),
  },
  timeText: {
    fontFamily: "Rubik-Regular",
    fontSize: scale(14),
    color: "#4A4A4A",
    fontWeight: "400",
    marginLeft: scale(5),
  },
  opensTimeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  opensText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    color: "#F6B01F",
  },
  atText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#4A4A4A",
  },
  timeValueText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    color: "#4A4A4A",
  },
  cardContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    gap: scale(5),
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
    color: "#6D6D6D",
  },
  cuisine: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#6D6D6D",
  },
  freeDeliveryText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#017851",
  },
  badgeContainer: {
    width: scale(103),
    height: scale(23),
    borderTopRightRadius: scale(6),
    borderBottomRightRadius: scale(6),
    backgroundColor: "#F6B01F",
    position: "absolute",
    left: scale(0),
    top: scale(12),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  badgeContainerText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(11),
    color: "#000000",
  },
  badgeStarContainer: {
    width: scale(135),
    height: scale(23),
    borderTopRightRadius: scale(6),
    borderBottomRightRadius: scale(6),
    backgroundColor: "#017851",
    position: "absolute",
    top: scale(47),
    left: scale(0),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  badgeStarText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(11),
    color: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(8),
  },
  enableLocationText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#FF617E",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FF617E",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(2),
  },
});

export default DeliveringToYouSection;
