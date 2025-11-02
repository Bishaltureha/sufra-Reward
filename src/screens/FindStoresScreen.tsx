import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "../../assets/svg/Home";
import { scale } from "../utils/dimen";
import LocationfindStore from "../../assets/svg/LocationfindStore";
import FindStoreLocation from "../../assets/svg/FindStoreLocation";
import { MainStackParamList, RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {};

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
}

interface Store {
  id: string;
  name: string;
  image: any;
  address: string;
  brands: any[]; // Array of brand logos
  distance: string;
  isOpen: boolean;
  closingTime?: string; // e.g., "1 hour", "30 mins"
  openingTime?: string; // e.g., "Opens at 10 AM"
}

type NavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "FindStores"
>;

const FindStoresScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState("");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      restaurantLogo: require("../../assets/image/box2.png"),
      dealType: "dineIn",
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
      restaurantLogo: require("../../assets/image/box3.png"),
      dealType: "online",
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
      restaurantLogo: require("../../assets/image/box1.png"),
      dealType: "online",
    },
  ];

  const brands = [
    { id: 1, name: "All Brands", icon: require("../../assets/image/Home.png") },
    { id: 2, name: "FireGrill", icon: require("../../assets/image/box1.png") },
    {
      id: 3,
      name: "Steak House",
      icon: require("../../assets/image/box4.png"),
    },
    {
      id: 4,
      name: "Earth Bowlz",
      icon: require("../../assets/image/box5.png"),
    },
    {
      id: 5,
      name: "Uncle Moe's",
      icon: require("../../assets/image/box7.png"),
    },
    { id: 6, name: "City Fresh", icon: require("../../assets/image/box8.png") },
    { id: 7, name: "Piatto", icon: require("../../assets/image/box2.png") },
    { id: 8, name: "Curry Club", icon: require("../../assets/image/box6.png") },
  ];

  const nearbyStores: Store[] = [
    {
      id: "1",
      name: "Restaurant A",
      image: require("../../assets/image/Store.png"),
      address:
        "Atul Grove Rd, Atul Grove Road, Janpath, HC Mathur Lane, New Delhi, Delhi",
      brands: [
        require("../../assets/image/box8.png"),
        require("../../assets/image/box7.png"),
      ],
      distance: "1.2 km away",
      isOpen: true,
      closingTime: "1 hour",
    },
    {
      id: "2",
      name: "Restaurant B",
      image: require("../../assets/image/Store.png"),
      address:
        "Atul Grove Rd, Atul Grove Road, Janpath, HC Mathur Lane, New Delhi, Delhi",
      brands: [
        require("../../assets/image/box8.png"),
        require("../../assets/image/box7.png"),
      ],
      distance: "2.5 km away",
      isOpen: false,
      openingTime: "Opens at 11 AM",
    },
    {
      id: "3",
      name: "Restaurant C",
      image: require("../../assets/image/Store.png"),
      address:
        "Atul Grove Rd, Atul Grove Road, Janpath, HC Mathur Lane, New Delhi, Delhi",
      brands: [
        require("../../assets/image/box8.png"),
        require("../../assets/image/box7.png"),
      ],
      distance: "0.8 km away",
      isOpen: true,
      closingTime: "2 hours",
    },
    {
      id: "4",
      name: "Restaurant D",
      image: require("../../assets/image/Store.png"),
      address:
        "Atul Grove Rd, Atul Grove Road, Janpath, HC Mathur Lane, New Delhi, Delhi",
      brands: [
        require("../../assets/image/box8.png"),
        require("../../assets/image/box7.png"),
      ],
      distance: "3.1 km away",
      isOpen: true,
      closingTime: "30 mins",
    },
  ];

  const openModal = (deal: Deal) => {
    setSelectedDeal(deal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDeal(null);
  };

  const DealCard = ({ deal }: { deal: Deal }) => (
    <TouchableOpacity
      style={styles.dealCard}
      onPress={() => openModal(deal)}
      activeOpacity={0.7}
    >
      <Image source={deal.image} style={styles.dealImage} />
      <View style={styles.dealContent}>
        <Text style={styles.dealTitle} numberOfLines={2}>
          {deal.title}
        </Text>
        <Text style={styles.dealDesc} numberOfLines={2}>
          {deal.description}
        </Text>
        <Text style={styles.viewDetails}>View Details</Text>
      </View>
      <Image source={deal.restaurantLogo} style={styles.dealLogo} />
    </TouchableOpacity>
  );

  const StoreCard = ({ store }: { store: Store }) => (
    <TouchableOpacity style={{ gap: scale(8) }}>
      <Image
        source={store.image}
        style={{ width: "100%", height: scale(98) }}
      />
      <Text
        style={{
          fontFamily: "Rubik-Medium",
          fontWeight: "500",
          fontSize: scale(16),
          color: "#000000",
        }}
      >
        {store.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: scale(4),
        }}
      >
        <LocationfindStore width={scale(9)} height={scale(12)} />
        <Text
          style={{
            color: "#4F4F4F",
            fontFamily: "Rubik-Regular",
            fontWeight: "400",
            fontSize: scale(12),
          }}
        >
          {store.address}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: scale(6),
          }}
        >
          {store.brands.map((brand, index) => (
            <Image
              key={index}
              source={brand}
              style={{
                height: scale(24),
                width: scale(24),
                borderRadius: scale(4),
              }}
            />
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: scale(12),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: scale(4),
            }}
          >
            <FindStoreLocation />
            <Text
              style={{
                color: "#4F4F4F",
                fontWeight: "400",
                fontSize: 12,
                lineHeight: 12,
                letterSpacing: 0.21,
              }}
            >
              {store.distance}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scale(4),
            }}
          >
            <View
              style={{
                backgroundColor: store.isOpen ? "#37C64E" : "#D63232",
                height: scale(7),
                width: scale(7),
                borderRadius: scale(3.5),
              }}
            />
            <Text
              style={{
                color: "#4F4F4F",
                fontFamily: "InterFace Trial-Regular",
                fontWeight: "400",
                fontSize: scale(12),
              }}
            >
              {store.isOpen
                ? `Closing in ${store.closingTime}`
                : store.openingTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#d66745" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Stores</Text>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate("ViewMap")}
        >
          <Ionicons name="location" size={20} color="#fff" />
          <Text style={styles.mapButtonText}>MAP</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Location"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FontAwesome
            name="location-arrow"
            size={20}
            color="#2196F3"
            style={styles.sendIcon}
          />
        </View>

        {/* Brands Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BRANDS</Text>
          <View style={styles.brandsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.brandsList}
            >
              {brands.map((brand) => (
                <TouchableOpacity key={brand.id} style={styles.brandItem}>
                  <Image source={brand.icon} style={styles.brandIconImage} />
                  <Text style={styles.brandName}>{brand.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Deals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEALS OF THE WEEK</Text>
          <View style={styles.dealsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.dealsList}
            >
              {allDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Nearby Stores Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEARBY STORES</Text>
          {nearbyStores.map((store, index) => (
            <View key={store.id}>
              <StoreCard store={store} />
              {index < nearbyStores.length - 1 && (
                <View
                  style={{
                    width: "100%",
                    height: scale(1),
                    backgroundColor: "#D866421A",
                    marginVertical: scale(10),
                  }}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Deal Modal */}
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

export default FindStoresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#d66745",
    flex: 1,
    marginLeft: 8,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b8060",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  mapButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  sendIcon: {
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#F1EDE5",
    borderRadius: scale(12),
    paddingVertical: scale(12),
    paddingHorizontal: scale(8),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1b8060",
    marginBottom: 12,
    letterSpacing: 1,
  },
  brandsContainer: {
    backgroundColor: "#f2ede4",
    borderRadius: 12,
    paddingVertical: 12,
  },
  brandsList: {
    paddingHorizontal: 12,
  },
  brandItem: {
    alignItems: "center",
    marginRight: 8,
    width: 80,
  },
  brandIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  brandIconImage: {
    width: 46,
    height: 46,
    borderRadius: 12,
    resizeMode: "contain",
    marginBottom: 8,
  },
  brandImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1b8060",
    textAlign: "center",
  },
  dealsContainer: {
    backgroundColor: "#f2ede4",
    borderRadius: 12,
    paddingVertical: 12,
  },
  dealsList: {
    paddingHorizontal: 12,
  },
  dealCard: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
  },
  dealImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  dealContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  dealTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 4,
  },
  dealDesc: {
    fontSize: 11,
    color: "#666",
    marginBottom: 8,
    lineHeight: 15,
  },
  viewDetails: {
    fontSize: 12,
    color: "#1b8060",
    fontWeight: "600",
  },
  dealLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    left: 68,
  },
  storeCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  storeImage: {
    width: 100,
    height: 100,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  storeImageText: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  storeInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  storeName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  storeAddress: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  storeDistance: {
    fontSize: 12,
    color: "#1b8060",
    fontWeight: "600",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Dimensions.get("window").height * 0.55,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#2c2c2c",
    flex: 1,
  },
  closeButtonContainer: {
    marginLeft: 8,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#c5d0db",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 12,
  },
  badgeContainer: {
    marginBottom: 12,
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffa500",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    position: "absolute",
    top: -34,
  },
  typeBadgeText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#000",
  },
  modalInfo: {
    marginBottom: 20,
  },
  restaurantName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1b8060",
    marginBottom: 8,
  },
  fullDescription: {
    fontWeight: "400",
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  actionButton: {
    marginHorizontal: 16,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButton: {
    backgroundColor: "#1b8060",
  },
  nearbyButton: {
    backgroundColor: "#ffa500",
  },
  actionButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
});
