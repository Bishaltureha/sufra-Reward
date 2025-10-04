import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { scale } from "../../utils/dimen";

type ReviewOrderModalProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const ReviewOrderModal: React.FC<ReviewOrderModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Review:", review);
    setRating(0), setReview("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Icon name="close" size={scale(18)} color="#FFFFFF" />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Title */}
            <Text style={styles.title}>Review Your Order</Text>

            <Text style={styles.description}>
              We hope you enjoyed your meal!{"\n"}Your feedback means the world
              to us, and it{"\n"}helps us keep delivering quality service.
            </Text>

            <Text style={styles.ratingLabel}>Rate your overall experience</Text>

            {/* Star Rating */}
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={star <= rating ? "star" : "star-outline"}
                    size={scale(32)}
                    color={star <= rating ? "#F6B01F" : "#E6EAF1"}
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Review Text Input */}
            <TextInput
              style={styles.textInput}
              placeholder="Share your experience..."
              placeholderTextColor="#A5A5A5"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={review}
              onChangeText={setReview}
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewOrderModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    width: "100%",
    height: scale(462),
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(20),
    paddingTop: scale(12),
    paddingBottom: scale(30),
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: scale(10),
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
    zIndex: 1,
  },
  title: {
    fontSize: scale(22),
    fontWeight: "700",
    marginBottom: scale(12),
    color: "#4A4A4A",
    fontFamily: "Rubik-Bold",
    textAlign: "center",
  },
  description: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(16),
    color: "#6D6D6D",
    textAlign: "center",
    marginBottom: scale(20),
    lineHeight: scale(22),
  },
  ratingLabel: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    marginBottom: scale(12),
    alignSelf: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: scale(20),
    gap: scale(8),
  },
  star: {
    marginHorizontal: scale(4),
  },
  textInput: {
    width: "100%",
    height: scale(131),
    backgroundColor: "#F4F4F4",
    borderRadius: scale(8),
    padding: scale(12),
    fontFamily: "Rubik-Regular",
    fontSize: scale(14),
    color: "#4A4A4A",
    marginBottom: scale(20),
  },
  submitButton: {
    width: "100%",
    height: scale(52),
    backgroundColor: "#017851",
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
    color: "#FFFFFF",
    lineHeight: scale(18),
  },
});
