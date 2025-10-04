import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
} from "react-native";
import { scale, screenWidth } from "../utils/dimen";

const OfferBanner = ({ onOfferPress }) => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const scrollViewRef = useRef(null);

  // Mock offers with details
  const offers = [
    {
      id: 0,
      image: require("../../assets/image/offer.png"),
      badge: "LIMITED TIME",
      title: "SPECIAL OFFER",
      subtitle: "Weekday Lunch Specials!",
      description:
        "Choice of main course with free Soup & Salad, garlic bread, gelato and soft drinks. Starting at SR51. 11am to 6pm.",
      buttonType: "order", // order or restaurant
    },
    {
      id: 1,
      image: require("../../assets/image/Dealsoftheday1.png"),
      badge: "NEW",
      title: "DEAL OF THE DAY",
      subtitle: "Family Combo Deal",
      description:
        "Perfect meal for 4 people with appetizers, mains, and desserts. Great value for families!",
      buttonType: "restaurant",
    },
    {
      id: 2,
      image: require("../../assets/image/Dealsoftheday2.png"),
      badge: "HOT DEAL",
      title: "WEEKEND SPECIAL",
      subtitle: "Brunch Bonanza",
      description:
        "Unlimited brunch buffet with premium selection. Available Saturday and Sunday only.",
      buttonType: "order",
    },
    {
      id: 3,
      image: require("../../assets/image/Dealsoftheday3.png"),
      badge: "POPULAR",
      title: "DINNER DEAL",
      subtitle: "Evening Delight",
      description:
        "Special dinner menu with complimentary drinks. Available from 6pm to 11pm.",
      buttonType: "restaurant",
    },
    {
      id: 4,
      image: require("../../assets/image/Dealsoftheday4.png"),
      badge: "EXCLUSIVE",
      title: "MEMBERS ONLY",
      subtitle: "Premium Selection",
      description:
        "Exclusive offer for our valued members. Sign up today to enjoy special benefits!",
      buttonType: "order",
    },
  ];

  const CARD_WIDTH = screenWidth - scale(64);
  const SPACING = scale(10);
  const SNAP_INTERVAL = CARD_WIDTH + SPACING;

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOfferIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % offers.length;

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * SNAP_INTERVAL,
            animated: true,
          });
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [offers.length]);

  const handleOfferScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / SNAP_INTERVAL);
    setActiveOfferIndex(currentIndex);
  };

  const handleOfferTap = (offer, index) => {
    setSelectedOffer(offer);
    setModalVisible(true);
    if (onOfferPress) onOfferPress(index);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOffer(null);
  };

  return (
    <View style={styles.offerSection}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleOfferScroll}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="center"
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
          columnGap: SPACING,
        }}
        style={styles.offerScrollView}
      >
        {offers.map((offer, index) => (
          <TouchableOpacity
            key={offer.id}
            style={styles.offerContainer}
            activeOpacity={0.9}
            onPress={() => handleOfferTap(offer, index)}
          >
            <Image
              style={styles.offerImage}
              source={offer.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        {offers.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeOfferIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={closeModal} />
          <View style={styles.bottomSheetContent}>
            {selectedOffer && (
              <>
                {/* Handle Bar */}
                <View style={styles.modalHeader}>
                  <View style={styles.handleBar} />
                </View>

                {/* Title and Close Button */}
                <View style={styles.titleCloseRow}>
                  <Text style={styles.modalTopTitle}>
                    {selectedOffer.subtitle}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Scrollable Content */}
                <ScrollView style={styles.modalContent}>
                  <Image
                    source={selectedOffer.image}
                    style={styles.modalImage}
                  />

                  {/* Badge */}
                  {selectedOffer.badge && (
                    <View style={styles.modalBadge}>
                      <Text style={styles.modalBadgeText}>
                        {selectedOffer.badge}
                      </Text>
                    </View>
                  )}

                  {/* Content */}
                  <View style={styles.modalTextContent}>
                    <Text style={styles.modalTitle}>{selectedOffer.title}</Text>
                    <Text style={styles.modalDescription}>
                      {selectedOffer.description}
                    </Text>
                  </View>

                  {/* Action Button */}
                  {selectedOffer.buttonType === "order" ? (
                    <TouchableOpacity style={styles.greenBtn}>
                      <Text style={styles.greenBtnText}>Order Online</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.yellowBtn}>
                      <Text style={styles.yellowBtnText}>
                        Nearby Restaurants
                      </Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  offerSection: {
    marginBottom: scale(16),
  },
  offerScrollView: {
    height: scale(201),
  },
  offerContainer: {
    width: screenWidth - scale(64),
    borderRadius: scale(10),
  },
  offerImage: {
    overflow: "hidden",
    width: "100%",
    height: scale(201),
    borderRadius: scale(10),
  },
  paginationContainer: {
    position: "absolute",
    bottom: scale(10),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(4),
  },
  paginationDot: {
    width: 18,
    height: 2,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
  },
  paginationDotActive: {
    backgroundColor: "#F6B01F",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    flex: 1,
  },
  bottomSheetContent: {
    width: "100%",
    height: scale(478),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: scale(12),
    paddingBottom: scale(8),
  },
  handleBar: {
    width: scale(40),
    height: scale(4),
    backgroundColor: "#E6EAF1",
    borderRadius: scale(2),
  },
  titleCloseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingBottom: scale(8),
  },
  modalTopTitle: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(22),
    color: "#4A4A4A",
  },
  closeButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#A5ACBD",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: scale(18),
    color: "#FFFFFF",
    fontWeight: "400",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  modalImage: {
    width: "100%",
    height: scale(201),
    borderRadius: scale(6),
    marginVertical: scale(6),
  },
  modalBadge: {
    backgroundColor: "#F6B01F",
    borderTopRightRadius: scale(6),
    borderBottomLeftRadius: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    alignSelf: "flex-start",
    position: "absolute",
    left: scale(0),
    top: scale(181),
  },
  modalBadgeText: {
    fontFamily: "Rubik-Medium",
    fontSize: scale(12),
    fontWeight: "500",
    color: "#000",
  },
  modalTextContent: {
    gap: scale(6),
    marginTop: scale(8),
  },
  modalTitle: {
    fontSize: scale(15),
    fontWeight: "500",
    color: "#017851",
    fontFamily: "Rubik-Medium",
  },
  modalDescription: {
    fontSize: scale(15),
    fontWeight: "400",
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    lineHeight: scale(20),
  },
  greenBtn: {
    width: "100%",
    height: scale(52),
    backgroundColor: "#017851",
    borderRadius: scale(5),
    marginTop: scale(16),
    justifyContent: "center",
    alignItems: "center",
  },
  greenBtnText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
    color: "#FFFFFF",
  },
  yellowBtn: {
    width: "100%",
    height: scale(52),
    backgroundColor: "#F6B01F",
    borderRadius: scale(5),
    marginTop: scale(8),
    marginBottom: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  yellowBtnText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
    color: "#000000",
  },
});

export default OfferBanner;
