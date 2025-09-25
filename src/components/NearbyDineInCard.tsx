import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import YellowCard from "../../assets/svg/YellowCard";
import { scale } from "../utils/dimen";
import LocationLogo from "../../assets/svg/LocationLogo";

const NearbyDineInCard = ({
  image,
  badgeText,
  openTime,
  title,
  distance,
  address,
  cuisines,
  showYellowCard = true,
}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />

      {badgeText && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      )}

      {openTime && (
        <View style={styles.deliveryBadge}>
          <Icon
            name="access-time"
            size={14}
            color="#4A4A4A"
            style={{ marginRight: scale(4) }}
          />
          <Text>
            <Text style={styles.openText}>Open </Text>
            <Text style={styles.tillText}>till </Text>
            <Text style={styles.timeText}>{openTime}</Text>
          </Text>
        </View>
      )}

      <View style={styles.bottomRow}>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.addressRow}>
            <LocationLogo />
            <Text>
              <Text style={styles.distance}>{distance}</Text>
              <Text style={styles.address}> • {address}</Text>
            </Text>
          </View>
          <Text style={styles.cuisines}>{cuisines}</Text>
        </View>
        {showYellowCard && <YellowCard />}
      </View>
    </View>
  );
};

export default NearbyDineInCard;

const styles = StyleSheet.create({
  card: {
    width: scale(310),
    height: scale(277),
    marginRight: scale(16),
    borderRadius: scale(6),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: scale(310),
    height: scale(174),
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
  },
  badge: {
    position: "absolute",
    width: scale(144),
    height: scale(23),
    top: scale(10),
    left: 0,
    backgroundColor: "#F6B01F",
    borderTopRightRadius: scale(6),
    borderBottomRightRadius: scale(6),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  badgeText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(11),
    color: "#000",
  },
  deliveryBadge: {
    position: "absolute",
    bottom: scale(90),
    right: scale(12),
    width: scale(137),
    height: scale(36),
    borderRadius: scale(30),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    paddingHorizontal: scale(10),
  },
  openText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  tillText: {
    color: "#000",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  timeText: {
    color: "#000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: scale(10),
  },
  info: {
    flex: 1,
    gap: scale(5),
  },
  title: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(15),
    color: "#4A4A4A",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scale(5),
  },
  distance: {
    fontFamily: "Rubik",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#6D6D6D",
  },
  address: {
    fontFamily: "Rubik",
    fontWeight: "400",
    fontSize: scale(11),
    color: "#6D6D6D",
  },
  cuisines: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#017851",
    marginTop: scale(4),
  },
});
