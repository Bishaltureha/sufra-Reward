import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { scale } from "../utils/dimen";

const DealsSection = ({
  title = "Deals of the Day!",
  showViewAll = true,
  onViewAllPress,
  dealsData = [],
  onDealPress,
  backgroundColor = "#e0e4e1",
  containerStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const handleDealPress = (deal, index) => {
    setSelectedDeal(deal);
    setModalVisible(true);
    if (onDealPress) onDealPress(deal, index);
  };

  const handleViewAllPress = () => {
    if (onViewAllPress) onViewAllPress();
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDeal(null);
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

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeModal}
          />
          <View style={styles.modalContainer}>
            {selectedDeal && (
              <>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalHandle} />
                </View>

                {/* Title and Close */}
                <View style={styles.titleCloseRow}>
                  <Text style={styles.modalTopTitle}>
                    Weekday Lunch Specials!
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Modal Content */}
                <ScrollView style={styles.modalContent}>
                  <Image
                    source={selectedDeal.image}
                    style={styles.modalImage}
                  />

                  {selectedDeal.badge && (
                    <View style={styles.modalBadge}>
                      <Text style={styles.modalBadgeText}>
                        {selectedDeal.badge}
                      </Text>
                    </View>
                  )}

                  <View style={styles.modalTextContent}>
                    <Text style={styles.modalTitle}>{selectedDeal.title}</Text>
                    <Text style={styles.modalExtraContent}>
                      Choice of main course with free Soup & Salad,{"\n"}garlic
                      bread, gelato and soft drinks. Starting at{"\n"}SR51. 11am
                      to 6pm. Lorem Ipsum is simply dummy.
                    </Text>
                  </View>

                  {/* Buttons */}
                  <TouchableOpacity style={styles.greenBtn}>
                    <Text style={styles.greenBtnText}>Order Online</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.yellowBtn}>
                    <Text style={styles.yellowBtnText}>
                      Find Nearby Dine-in Spots
                    </Text>
                  </TouchableOpacity>
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
  dealsWrapper: { width: "100%", paddingVertical: scale(16) },
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalBackdrop: { flex: 1 },
  modalContainer: {
    width: "100%",
    height: scale(528),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    alignSelf: "center",
  },
  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: scale(12),
    paddingBottom: scale(8),
  },
  modalHandle: {
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
  closeButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(100),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a5acbe",
  },
  closeButtonText: {
    fontSize: scale(18),
    color: "#ffffff",
    fontWeight: "400",
  },
  modalContent: { flex: 1, paddingHorizontal: scale(16) },
  modalTopTitle: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(22),
    color: "#4A4A4A",
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
  modalTextContent: { gap: scale(6) },
  modalTitle: {
    fontSize: scale(15),
    fontWeight: "500",
    color: "#017851",
    fontFamily: "Rubik-Medium",
  },
  modalExtraContent: {
    fontSize: scale(15),
    fontWeight: "400",
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    lineHeight: scale(20),
  },

  // Buttons
  greenBtn: {
    width: "100%",
    height: scale(52),
    backgroundColor: "#017851",
    borderRadius: scale(5),
    marginTop: scale(8),
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

export default DealsSection;
