import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { scale } from "../utils/dimen";

const DealsSection = ({
  title = "Deals of the Day",
  showViewAll = true,
  onViewAllPress,
  dealsData = [],
  onDealPress,
  backgroundColor = "#e0e4e1",
  containerStyle,
}) => {
  const handleDealPress = (deal, index) => {
    const message = `${deal.title}\n\n${deal.subtitle || ""}\n\n${
      deal.description || ""
    }\n\nChoice of main course with free Soup & Salad, garlic bread, gelato and soft drinks. Starting at SR51. 11am to 6pm.`;

    Alert.alert(
      "Weekday Lunch Specials!",
      message,
      [
        {
          text: "Order Online",
          onPress: () => console.log("Order Online pressed"),
        },
        {
          text: "Find Nearby Dine-in Spots",
          onPress: () => console.log("Find Nearby pressed"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );

    if (onDealPress) onDealPress(deal, index);
  };

  const handleViewAllPress = () => {
    if (onViewAllPress) onViewAllPress();
  };

  return (
    <View style={[styles.dealsWrapper, { backgroundColor }, containerStyle]}>
      <View style={styles.dealsHeader}>
        <Text style={styles.dealsTitle}>{title}</Text>
        {showViewAll && (
          <TouchableOpacity onPress={handleViewAllPress}>
            <Text style={styles.dealsViewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal deals scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dealsScroll}
      >
        {dealsData.map((deal, index) => (
          <View key={deal.id || index} style={styles.dealsCard}>
            <Image
              source={deal.image}
              style={{ height: scale(174), width: scale(310) }}
            />

            {/* Badge */}
            {deal.badge && (
              <View
                style={[styles.badge, { width: deal.badgeWidth || scale(74) }]}
              >
                <Text style={styles.badgeText}>{deal.badge}</Text>
              </View>
            )}

            {/* Text Content */}
            <View style={styles.textContent}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
              <Text style={styles.dealDescription}>{deal.description}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleDealPress(deal, index)}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dealsWrapper: { paddingVertical: scale(16), borderRadius: scale(6) },
  dealsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
  },
  dealsTitle: {
    color: "#4A4A4A",
    fontWeight: "600",
    fontSize: scale(18),
    fontFamily: "Rubik-SemiBold",
  },
  dealsViewAll: {
    color: "#017851",
    fontWeight: "600",
    fontSize: scale(18),
    fontFamily: "Rubik-SemiBold",
    textDecorationLine: "underline",
  },
  dealsScroll: { paddingLeft: scale(16), paddingRight: scale(8) },
  dealsCard: {
    backgroundColor: "white",
    marginRight: scale(12),
    borderRadius: scale(8),
    alignItems: "center",
    height: scale(305),
    width: scale(311),
  },
  badge: {
    position: "absolute",
    bottom: scale(130),
    left: 0,
    backgroundColor: "#F6B01F",
    borderTopRightRadius: scale(6),
    height: scale(23),
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: "Rubik-Medium",
    fontSize: scale(11),
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  textContent: {
    alignItems: "flex-start",
    paddingStart: scale(10),
    paddingVertical: scale(10),
    gap: scale(3),
  },
  dealTitle: {
    fontSize: scale(13),
    fontWeight: "500",
    color: "#017851",
    fontFamily: "Rubik-Medium",
  },
  dealSubtitle: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
  },
  dealDescription: {
    fontSize: scale(13),
    fontWeight: "400",
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
  },
  divider: {
    width: scale(311),
    height: scale(1),
    backgroundColor: "#E6EAF1",
  },
  buttonContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  buttonText: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
  },
});

export default DealsSection;
