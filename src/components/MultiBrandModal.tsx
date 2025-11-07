import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { scale } from "../utils/dimen";
import NewBadge from "../../assets/svg/NewBadge";
import Entypo from "@expo/vector-icons/Entypo";
interface MultiBrandModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Restaurant {
  id: number;
  name: string;
  distance: string;
  cuisine: string;
  image: ImageSourcePropType;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Fire Grill",
    distance: "2.7 km",
    cuisine: "Tacos, Burritos, Quesadillas...",
    image: require("../../assets/image/box1.png"),
  },
  {
    id: 2,
    name: "Piatto Restaurant",
    distance: "1.5 km",
    cuisine: "Pizza, Pasta, Italian...",
    image: require("../../assets/image/box2.png"),
  },
  {
    id: 3,
    name: "Steak House Burgers",
    distance: "3.2 km",
    cuisine: "Burgers, Fries, Shakes...",
    image: require("../../assets/image/box3.png"),
  },
  {
    id: 4,
    name: "Steak House",
    distance: "2.1 km",
    cuisine: "Sushi, Ramen, Japanese...",
    image: require("../../assets/image/box4.png"),
  },
  {
    id: 5,
    name: "Earth Bowlz",
    distance: "1.8 km",
    cuisine: "Indian, Curry, Biryani...",
    image: require("../../assets/image/box5.png"),
  },
  {
    id: 6,
    name: "Curry Club",
    distance: "2.9 km",
    cuisine: "Noodles, Chinese, Asian...",
    image: require("../../assets/image/box6.png"),
  },
  {
    id: 7,
    name: "Wings & Things",
    distance: "3.5 km",
    cuisine: "Steaks, BBQ, Grills...",
    image: require("../../assets/image/box7.png"),
  },
  {
    id: 8,
    name: "Veggie Delight",
    distance: "1.2 km",
    cuisine: "Salads, Vegan, Healthy...",
    image: require("../../assets/image/box8.png"),
  },
];

const MultiBrandModal: React.FC<MultiBrandModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Top Bar */}
          <TouchableOpacity
            style={styles.topBar}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <View style={styles.topLeftRow}>
              <NewBadge />
              <Text style={styles.topText}>Add Items from Other Brands</Text>
            </View>
            <View style={styles.topArrowContainer}>
              <Entypo name="chevron-down" size={24} color="#6D6D6D" />
            </View>
          </TouchableOpacity>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Text style={styles.infoBannerText}>
              Order now from multiple brands at the same time.{"\n"} Add all
              your products to a single cart!
            </Text>
          </View>

          {/* Restaurant List */}
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {restaurants.map((restaurant) => (
              <View key={restaurant.id} style={styles.restaurantCard}>
                <Image
                  source={restaurant.image}
                  style={styles.restaurantImage}
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantDetails}>
                    <Text style={styles.bold}>{restaurant.distance}</Text> •{" "}
                    {restaurant.cuisine}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MultiBrandModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    paddingBottom: scale(20),
    maxHeight: "80%",
  },
  topBar: {
    width: "100%",
    height: scale(54),
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
  },
  topText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  topArrowContainer: {
    backgroundColor: "#E6EAF1",
    width: scale(30),
    height: scale(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(15),
  },
  infoBanner: {
    width: "100%",
    padding: scale(16),
    backgroundColor: "#F6B01F",
    borderRadius: scale(6),
    marginBottom: scale(12),
  },
  infoBannerText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    textAlign: "center",
  },
  scrollView: {
    width: "100%",
  },
  restaurantCard: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: scale(6),
    padding: scale(12),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
    marginBottom: scale(12),
  },
  restaurantImage: {
    height: scale(55),
    width: scale(55),
    borderRadius: scale(6),
  },
  restaurantInfo: {
    flex: 1,
    gap: scale(6),
    justifyContent: "center",
  },
  restaurantName: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(15),
    color: "#000000",
  },
  restaurantDetails: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    lineHeight: scale(16),
    color: "#4A4A4A",
  },
  bold: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
  },
});
