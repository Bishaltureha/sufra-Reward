import React, { useState } from "react";
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

  // Mock offers data - replace with actual data
  const offers = [
    { id: 0, image: require("../../assets/image/offer.png") },
    { id: 1, image: require("../../assets/image/offer.png") },
    { id: 2, image: require("../../assets/image/offer.png") },
    { id: 3, image: require("../../assets/image/offer.png") },
  ];

  const handleOfferScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const screenWidth = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.round(scrollPosition / screenWidth);
    setActiveOfferIndex(currentIndex);
  };

  const handleOfferTap = (offer, index) => {
    setSelectedOffer(offer);
    setModalVisible(true);
    if (onOfferPress) {
      onOfferPress(index);
    }
  };

  return (
    <View style={styles.offerSection}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleOfferScroll}
        style={styles.offerScrollView}
        snapToInterval={screenWidth - scale(56)}
        decelerationRate={"fast"}
        contentContainerStyle={{ paddingHorizontal: scale(16), gap: scale(16) }}
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
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots Overlay */}
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
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.bottomSheetContent}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* Content */}

            {/* <Image
                style={styles.bottomSheetImage}
                source={selectedOffer?.image}
                resizeMode="cover"
              /> */}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  offerSection: {
    marginBottom: scale(16),
    position: "relative",
  },
  offerScrollView: {
    height: scale(201),
  },
  offerContainer: {
    width: screenWidth - scale(64),
  },
  offerImage: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheetContent: {
    width: "100%",
    height: scale(512),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    position: "absolute",
    bottom: 0,
  },
  handleBar: {
    width: scale(40),
    height: scale(4),
    backgroundColor: "#D9D9D9",
    borderRadius: scale(2),
    alignSelf: "center",
    marginBottom: scale(16),
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
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: scale(18),
    color: "white",
    fontWeight: "bold",
  },
  bottomSheetScrollView: {
    paddingHorizontal: scale(20),
  },
  bottomSheetImage: {
    width: "100%",
    height: scale(400),
    borderRadius: scale(10),
  },
});

export default OfferBanner;
