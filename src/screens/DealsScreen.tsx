import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import {
  CompositeNavigationProp,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import { DrawerParamList, MainStackParamList } from "../types";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DealsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, "Deals">,
  NativeStackNavigationProp<MainStackParamList>
>;

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: any;
  restaurant: string;
  restaurantLogo: any;
  dealType: "online" | "dineIn";
  fullDescription: string;
  brandId: number; // Add this
}

const DealsScreen = () => {
  const navigation = useNavigation<DealsScreenNavigationProp>();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDrawerToggle = () => {
    try {
      navigation.dispatch(DrawerActions.openDrawer());
    } catch {
      try {
        navigation.openDrawer();
      } catch (fallbackError) {
        console.error("Drawer not working:", fallbackError);
      }
    }
  };

  const allDeals: Deal[] = [
    {
      id: "1",
      title: "Piatto Evening Specials !",
      description:
        "Bring family & friends to enjoy Piatto favorites at special prices...",
      fullDescription:
        "Bring family & friends to enjoy Piatto favorites at special prices. Sun-Thu | 6-9 PM | Join us for dinner!",
      discount: "Special",
      image: require("../../assets/image/Deal3.webp"),
      restaurant: "Piatto",
      restaurantLogo: require("../../assets/image/box3.png"),
      dealType: "dineIn",
      brandId: 3,
    },
    {
      id: "2",
      title: "Signature Sandwiches & Burgers",
      description:
        "Enjoy your favorite Steak House sandwiches & burgers at just SAR 39 – selected items only.",
      fullDescription:
        "Enjoy your favorite Steak House sandwiches & burgers at just SAR 39 – selected items only. Exclusive to Sufra Delivery – limited time deal.",
      discount: "Just SAR 39",
      image: require("../../assets/image/Deal1.webp"),
      restaurant: "Steakhouse",
      restaurantLogo: require("../../assets/image/box1.png"),
      dealType: "online",
      brandId: 1,
    },
    {
      id: "3",
      title: "FireGrill Bowls & Burritos",
      description: "Fresh bowls & burritos now 20% off – selected items only.",
      fullDescription:
        "Fresh bowls & burritos now 20% off – selected items only. Exclusive to Sufra Delivery – limited time deal. Order now!",
      discount: "20% Off",
      image: require("../../assets/image/Deal2.webp"),
      restaurant: "FireGrill",
      restaurantLogo: require("../../assets/image/box2.png"),
      dealType: "online",
      brandId: 2,
    },
    {
      id: "4",
      title: "Piatto Favorites",
      description:
        "Enjoy pizzas, pastas & more at 40% off – selected items only.",
      fullDescription:
        "Enjoy pizzas, pastas & more at 40% off – selected items only. Exclusive to Sufra Delivery – limited time deal.",
      discount: "40% Off",
      image: require("../../assets/image/Deal3.webp"),
      restaurant: "Piatto",
      restaurantLogo: require("../../assets/image/box3.png"),
      dealType: "online",
      brandId: 3,
    },
    {
      id: "5",
      title: "Earth Bowlz",
      description:
        "Wholesome bowls made fresher with 30% off – selected items only.",
      fullDescription:
        "Wholesome bowls made fresher with 30% off – selected items only. Exclusive to Sufra Delivery – limited time deal.",
      discount: "30% Off",
      image: require("../../assets/image/Deal4.webp"),
      restaurant: "Earth Bowlz",
      restaurantLogo: require("../../assets/image/box4.png"),
      dealType: "online",
      brandId: 4,
    },
    {
      id: "6",
      title: "Chicken Biryani",
      description: "Signature Chicken Biryani, now at SAR 32 (was 42).",
      fullDescription:
        "Signature Chicken Biryani, now at SAR 32 (was 42). Exclusive to Sufra Delivery – limited time deal.",
      discount: "Now SAR 32",
      image: require("../../assets/image/Deal5.webp"),
      restaurant: "Biryani House",
      restaurantLogo: require("../../assets/image/box5.png"),
      dealType: "online",
      brandId: 5,
    },
  ];

  // Group deals by type
  const dineInDeals = allDeals.filter((d) => d.dealType === "dineIn");
  const onlineDeals = allDeals.filter((d) => d.dealType === "online");

  const openModal = (deal: Deal) => {
    setSelectedDeal(deal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDeal(null);
  };

  const handleActionButton = () => {
    if (selectedDeal) {
      closeModal();
      if (selectedDeal.dealType === "online") {
        navigation.navigate("BrandDetails", {
          brandImage: selectedDeal.restaurantLogo,
          brandName: selectedDeal.restaurant,
          brandId: selectedDeal.brandId,
        });
      } else {
        navigation.navigate("FindStores");
      }
    }
  };
  const DealCard = ({ deal }: { deal: Deal }) => (
    <View style={styles.dealCard}>
      <Image source={deal.image} style={styles.dealImage} />
      <View style={styles.dealContent}>
        <Text style={styles.dealTitle} numberOfLines={2}>
          {deal.title}
        </Text>
        <Text style={styles.dealDescription} numberOfLines={2}>
          {deal.description}
        </Text>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => openModal(deal)}
          activeOpacity={0.7}
        >
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
      <Image source={deal.restaurantLogo} style={styles.restaurantLogo} />
    </View>
  );

  const DealSection = ({ title, deals }: { title: string; deals: Deal[] }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={handleDrawerToggle}
        >
          <Drawerlogo />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Deals</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        style={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {dineInDeals.length > 0 && (
          <DealSection title="Dine-in" deals={dineInDeals} />
        )}
        {onlineDeals.length > 0 && (
          <DealSection title="Online" deals={onlineDeals} />
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedDeal?.title}</Text>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeButtonContainer}
              >
                <View style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              {selectedDeal && (
                <>
                  <Image
                    source={selectedDeal.image}
                    style={styles.modalImage}
                  />

                  <View style={styles.badgeContainer}>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>
                        {selectedDeal.dealType === "online"
                          ? "Online"
                          : "Dine-in"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalInfo}>
                    <Text style={styles.restaurantName}>
                      {selectedDeal.restaurant}
                    </Text>

                    <Text style={styles.fullDescription}>
                      {selectedDeal.fullDescription}
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.actionButton,
                selectedDeal?.dealType === "online"
                  ? styles.orderButton
                  : styles.nearbyButton,
              ]}
              onPress={handleActionButton}
            >
              <Text style={styles.actionButtonText}>
                {selectedDeal?.dealType === "online"
                  ? "Order Online"
                  : "Nearby Restaurants"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    height: scale(50),
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  drawerButton: { padding: scale(4), marginRight: scale(8) },
  titleContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#16a34a",
    textAlign: "center",
  },
  spacer: { width: scale(36) },
  listContent: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  section: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#2C2C2C",
    marginBottom: scale(12),
  },
  dealCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: scale(12),
    overflow: "hidden",
    marginBottom: scale(12),
    paddingRight: scale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  dealImage: {
    width: scale(100),
    height: scale(100),
    resizeMode: "cover",
  },
  dealContent: {
    flex: 1,
    padding: scale(12),
    justifyContent: "space-between",
  },
  dealTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(13),
    color: "#2C2C2C",
    marginBottom: scale(4),
  },
  dealDescription: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(11),
    color: "#666666",
    marginBottom: scale(8),
    lineHeight: scale(15),
  },
  viewDetailsButton: {
    alignSelf: "flex-start",
  },
  viewDetailsText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
    color: "#16a34a",
  },
  restaurantLogo: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    resizeMode: "contain",
    position: "absolute",
    bottom: scale(0),
    left: scale(68),
  },
  restaurantName: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#16a34a",
    marginBottom: scale(8),
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    height: Dimensions.get("window").height * 0.55,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
  },
  modalTitle: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(18),
    color: "#2C2C2C",
    flex: 1,
  },
  closeButtonContainer: {
    marginLeft: scale(8),
  },
  closeButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#C5D0DB",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: scale(20),
    color: "#ffffff",
    fontWeight: "600",
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  modalImage: {
    width: "100%",
    height: scale(200),
    borderRadius: scale(8),
    resizeMode: "cover",
    marginBottom: scale(12),
  },
  badgeContainer: {
    marginBottom: scale(12),
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFA500",
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(4),
    position: "absolute",
    left: scale(0),
    top: scale(-34),
  },
  typeBadgeText: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(12),
    color: "#000000",
  },
  modalInfo: {
    marginBottom: scale(20),
  },
  fullDescription: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#666666",
    lineHeight: scale(20),
  },
  actionButton: {
    marginHorizontal: scale(16),
    marginBottom: scale(40),
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: "center",
  },
  orderButton: {
    backgroundColor: "#16a34a",
  },
  nearbyButton: {
    backgroundColor: "#FFA500",
  },
  actionButtonText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#ffffff",
  },
});
