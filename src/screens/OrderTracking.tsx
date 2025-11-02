import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneNumberInput from "../components/PhoneNumberInputtext";

const OrderTracking = () => {
  const navigation = useNavigation();

  const [orderNumber, setOrderNumber] = useState("");
  const [phoneData, setPhoneData] = useState({
    number: "",
    country: null,
    isValid: false,
  });
  const [isTracking, setIsTracking] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Dummy data
  const dummyOrders = {
    "12345_966123456789": {
      orderNumber: "#ORD-2024-12345",
      orderDate: "26 Oct 2025, 10:30 AM",
      estimatedDelivery: "28 Oct 2025",
      currentStatus: "in_transit",
      trackingSteps: [
        {
          id: 1,
          title: "Order Placed",
          description: "Your order has been received",
          time: "26 Oct, 10:30 AM",
          completed: true,
          icon: "checkmark-circle",
        },
        {
          id: 2,
          title: "Order Confirmed",
          description: "Seller has confirmed your order",
          time: "26 Oct, 11:00 AM",
          completed: true,
          icon: "checkmark-done-circle",
        },
        {
          id: 3,
          title: "Shipped",
          description: "Your order is on the way",
          time: "26 Oct, 03:45 PM",
          completed: true,
          icon: "airplane",
        },
        {
          id: 4,
          title: "Out for Delivery",
          description: "Order will be delivered soon",
          time: "Expected by 6:00 PM",
          completed: false,
          icon: "bicycle",
        },
        {
          id: 5,
          title: "Delivered",
          description: "Order delivered successfully",
          time: "Pending",
          completed: false,
          icon: "home",
        },
      ],
      deliveryAddress: {
        name: "Ahmed Ali",
        phone: "+966 123 456 789",
        address: "King Fahd Road, Al Olaya District, Riyadh, Saudi Arabia",
      },
      items: [
        { name: "Wireless Headphones", qty: 1, price: "SAR 299" },
        { name: "Phone Case", qty: 2, price: "SAR 59" },
      ],
    },
  };

  const handlePhoneChange = (phone, country, isValid) => {
    setPhoneData({ number: phone, country, isValid });
  };

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) {
      Alert.alert("Error", "Please enter Order Number");
      return;
    }
    if (!phoneData.number.trim()) {
      Alert.alert("Error", "Please enter Mobile Number");
      return;
    }

    // Create lookup key - remove all non-digits from phone number
    const cleanPhone = phoneData.number.replace(/\D/g, "");
    const lookupKey = `${orderNumber.trim()}_${phoneData.country.dial_code.replace(
      "+",
      ""
    )}${cleanPhone}`;
    const foundOrder = dummyOrders[lookupKey];

    if (foundOrder) {
      setOrderData(foundOrder);
      setIsTracking(true);
    } else {
      Alert.alert(
        "Not Found",
        `Order not found. Please check your Order Number and Mobile Number.\n\nTry: Order: 12345, Mobile: 123456789 (${
          phoneData.country?.dial_code || "+966"
        })`
      );
    }
  };

  const handleReset = () => {
    setOrderNumber("");
    setPhoneData({ number: "", country: null, isValid: false });
    setOrderData(null);
    setIsTracking(false);
  };

  const getCurrentStepIndex = () => {
    if (!orderData) return -1;
    return orderData.trackingSteps.findIndex((step) => !step.completed);
  };

  if (!isTracking) {
    // Search Screen
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.searchContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons name="chevron-back" size={28} color="#d66745" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Order Tracking</Text>
            </View>

            {/* Info Text */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                You can easily track your order by providing necessary
                information below. Please use the order number we sent you via
                sms or email.
              </Text>
            </View>

            {/* Order Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Order Number*</Text>
              <TextInput
                style={styles.input}
                value={orderNumber}
                onChangeText={setOrderNumber}
                placeholder="Enter order number"
                placeholderTextColor="#999"
                keyboardType="default"
              />
            </View>

            {/* Mobile Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <PhoneNumberInput
                defaultCountry="SA"
                onPhoneChange={handlePhoneChange}
                placeholder="Enter mobile number"
                style={styles.phoneNumberInput}
              />
            </View>

            {/* Track Button */}
            <TouchableOpacity
              style={styles.trackButton}
              onPress={handleTrackOrder}
            >
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>

            {/* Test Info */}
            <View style={styles.testInfo}>
              <Text style={styles.testInfoTitle}>
                💡 Test with sample data:
              </Text>
              <Text style={styles.testInfoText}>Order Number: 12345</Text>
              <Text style={styles.testInfoText}>
                Mobile: 123456789 ({phoneData.country?.dial_code || "+966"})
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Tracking Details Screen
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView>
        {/* Header with Back Button */}
        <View style={styles.trackingHeader}>
          <TouchableOpacity
            style={styles.backButtonTracking}
            onPress={handleReset}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.trackingHeaderTitle}>Track Order</Text>
            <Text style={styles.orderNumberText}>{orderData.orderNumber}</Text>
            <Text style={styles.orderDateText}>
              Placed on {orderData.orderDate}
            </Text>
          </View>
        </View>

        {/* Estimated Delivery Card */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryIconContainer}>
            <Ionicons name="time-outline" size={24} color="#fff" />
          </View>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.deliveryDate}>
              {orderData.estimatedDelivery}
            </Text>
          </View>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          {orderData.trackingSteps.map((step, index) => {
            const isCurrentStep = index === getCurrentStepIndex();
            const isCompleted = step.completed;

            return (
              <View key={step.id} style={styles.timelineItem}>
                {index !== orderData.trackingSteps.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      isCompleted && styles.timelineLineCompleted,
                    ]}
                  />
                )}

                <View
                  style={[
                    styles.timelineIcon,
                    isCompleted && styles.timelineIconCompleted,
                    isCurrentStep && styles.timelineIconCurrent,
                  ]}
                >
                  <Ionicons
                    name={step.icon as any}
                    size={20}
                    color={isCompleted || isCurrentStep ? "#fff" : "#999"}
                  />
                </View>

                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineTitle,
                      isCompleted && styles.timelineTitleCompleted,
                      isCurrentStep && styles.timelineTitleCurrent,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text style={styles.timelineDescription}>
                    {step.description}
                  </Text>
                  <Text style={styles.timelineTime}>{step.time}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressRow}>
              <Ionicons name="person-outline" size={20} color="#333" />
              <Text style={styles.addressText}>
                {orderData.deliveryAddress.name}
              </Text>
            </View>
            <View style={styles.addressRow}>
              <Ionicons name="call-outline" size={20} color="#333" />
              <Text style={styles.addressText}>
                {orderData.deliveryAddress.phone}
              </Text>
            </View>
            <View style={styles.addressRow}>
              <Ionicons name="location-outline" size={20} color="#333" />
              <Text style={styles.addressText}>
                {orderData.deliveryAddress.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {orderData.items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.qty}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Ionicons name="chatbubble-outline" size={20} color="#FF6B35" />
            <Text style={styles.buttonSecondaryText}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleTrackOrder}
          >
            <Ionicons name="refresh-outline" size={20} color="#fff" />
            <Text style={styles.buttonPrimaryText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.trackAnotherButton}
          onPress={handleReset}
        >
          <Text style={styles.trackAnotherText}>Track Another Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  keyboardView: {
    flex: 1,
  },
  searchContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#d66745",
    flex: 1,
    marginLeft: 8,
  },
  infoBox: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 1,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  inputGroup: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
    marginTop: 1,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    fontWeight: "500",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  phoneNumberInput: {
    marginBottom: 0,
  },
  trackButton: {
    backgroundColor: "green",
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  trackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  testInfo: {
    margin: 20,
    padding: 15,
    backgroundColor: "#FFF9E6",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FFC107",
  },
  testInfoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F57C00",
    marginBottom: 8,
  },
  testInfoText: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  trackingHeader: {
    backgroundColor: "#00796B",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonTracking: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerContent: {
    flex: 1,
  },
  trackingHeaderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  orderNumberText: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  orderDateText: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
    marginTop: 4,
  },
  deliveryCard: {
    backgroundColor: "#4CAF50",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deliveryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  deliveryDate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  timelineContainer: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 30,
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: 19,
    top: 40,
    bottom: -30,
    width: 2,
    backgroundColor: "#e0e0e0",
  },
  timelineLineCompleted: {
    backgroundColor: "#4CAF50",
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    zIndex: 1,
  },
  timelineIconCompleted: {
    backgroundColor: "#4CAF50",
  },
  timelineIconCurrent: {
    backgroundColor: "#FF6B35",
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  timelineTitleCompleted: {
    color: "#333",
  },
  timelineTitleCurrent: {
    color: "#FF6B35",
    fontWeight: "bold",
  },
  timelineDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 12,
    color: "#999",
  },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addressCard: {
    gap: 12,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  itemQty: {
    fontSize: 13,
    color: "#666",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: "#FF6B35",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#FF6B35",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonSecondaryText: {
    color: "#FF6B35",
    fontSize: 16,
    fontWeight: "600",
  },
  trackAnotherButton: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 32,
  },
  trackAnotherText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
