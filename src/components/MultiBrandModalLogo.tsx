import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { scale } from "../utils/dimen";
import MultiBrandDownArrow from "./MultiBrandDownArrow";

interface MultiBrandModalLogoProps {
  visible: boolean;
  onClose: () => void;
}

const MultiBrandModalLogo: React.FC<MultiBrandModalLogoProps> = ({
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
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/image/multi-brand-icon.png")} // Replace with your icon
              style={styles.icon}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Multi-Brand Ordering</Text>

          {/* Description */}
          <Text style={styles.description}>
            Order now from multiple brands at the same time. Add all your
            products to a single cart!
          </Text>

          {/* Done Button */}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
          <MultiBrandDownArrow />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(45),
    paddingTop: scale(32),
    paddingBottom: scale(152),
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: scale(20),
  },
  icon: {
    width: scale(122),
    height: scale(151),
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(22),
    color: "#ffffff",
    textAlign: "center",
    marginBottom: scale(12),
  },
  description: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(16),
    color: "#ffffff",
    textAlign: "center",
    marginBottom: scale(24),
  },
  doneButton: {
    width: "100%",
    height: scale(50),
    backgroundColor: "#F6B01F",
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(24),
  },
  doneButtonText: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(16),
    color: "#000000",
  },
  arrowContainer: {
    marginBottom: scale(8),
  },
  arrow: {
    fontSize: scale(24),
    color: "#4A4A4A",
  },
  bottomBanner: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    gap: scale(12),
  },
  newBadge: {
    backgroundColor: "#FFA500",
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  newBadgeText: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(10),
    color: "#FFFFFF",
  },
  bottomBannerText: {
    flex: 1,
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    color: "#000000",
  },
  chevron: {
    fontSize: scale(20),
    color: "#000000",
  },
});

export default MultiBrandModalLogo;
