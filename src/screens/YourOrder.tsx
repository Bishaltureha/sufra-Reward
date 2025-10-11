import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../types";
import { scale } from "../utils/dimen";
import BigCircleWithTick from "../../assets/svg/BigCircleWithTick";
import OrderList from "../../assets/svg/OrderList";
import * as Clipboard from "expo-clipboard";
import OrderConfirmed from "../../assets/svg/OrderConfirmed";
import PreparingYourOrder from "../../assets/svg/PreparingYourOrder";
import Driver from "../../assets/svg/Driver";
import OrderDelivered from "../../assets/svg/OrderDelivered";

type OrderStatus =
  | "received"
  | "confirmed"
  | "preparing"
  | "waiting_driver"
  | "on_the_way"
  | "served";

type OrderStep = {
  id: OrderStatus;
  label: string;
  description?: string;
};

type Props = {};

const YourOrder = (props: Props) => {
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [currentStep, setCurrentStep] = useState<OrderStatus>("received");

  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const orderId = "7547439";

  // Order steps configuration
  const orderSteps: OrderStep[] = [
    {
      id: "received",
      label: "Order Received",
      description: "11:15 PM. We have received your order.",
    },
    {
      id: "confirmed",
      label: "Order Confirmed",
      description: "11:18 PM. Your order has been confirmed",
    },
    {
      id: "preparing",
      label: "Order Preparing",
      description: "Your order is being prepared.",
    },
    {
      id: "waiting_driver",
      label: "Waiting for the Driver",
      description: "Driver will be assigned soon.",
    },
    {
      id: "on_the_way",
      label: "Order on the way",
      description: "Your order is on the way!",
    },
    {
      id: "served",
      label: "Order Served",
      description: "Enjoy your meal!",
    },
  ];

  // Simulate order progress
  useEffect(() => {
    const stepProgression: OrderStatus[] = [
      "received",
      "confirmed",
      "preparing",
      "waiting_driver",
      "on_the_way",
      "served",
    ];

    const currentIndex = stepProgression.indexOf(currentStep);

    if (currentIndex < stepProgression.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(stepProgression[currentIndex + 1]);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleBack = () => navigation.goBack();

  const handleCopyOrderId = async () => {
    await Clipboard.setStringAsync(orderId);
    Alert.alert("Copied!", `Order ID ${orderId} copied to clipboard`);
  };

  const handleUseAddress = () => {
    navigation.navigate("Home");
  };

  const allIngredients = [
    "Organic Black Beans",
    "Roasted Chipotle",
    "White Rice",
    "Chicken",
    "Chips",
    "Ketchup",
  ];

  const displayedIngredients = showAllIngredients
    ? allIngredients
    : allIngredients.slice(0, 2);

  // Helper function to determine if a step is completed (passed)
  const isStepCompleted = (stepId: OrderStatus): boolean => {
    const currentIndex = orderSteps.findIndex((s) => s.id === currentStep);
    const stepIndex = orderSteps.findIndex((s) => s.id === stepId);
    return stepIndex < currentIndex;
  };

  // Helper function to check if step is currently active
  const isCurrentStep = (stepId: OrderStatus): boolean => {
    return stepId === currentStep;
  };

  // Render order progress indicator
  const renderStepIndicator = (stepId: OrderStatus) => {
    const isCompleted = isStepCompleted(stepId);
    const isCurrent = isCurrentStep(stepId);

    // Current step - show large yellow/golden circle SVG
    if (isCurrent) {
      if (stepId === "received") {
        return <OrderList />;
      } else if (stepId === "confirmed") {
        return <OrderConfirmed />;
      } else if (stepId === "preparing") {
        return <PreparingYourOrder />;
      } else if (stepId === "waiting_driver") {
        return <Driver />;
      } else if (stepId === "on_the_way") {
        return <OrderDelivered />;
      } else if (stepId === "served") {
        return <OrderDelivered />;
      }
    }

    // Completed steps - small green circle
    if (isCompleted) {
      return <View style={styles.circleIndicatorCompleted} />;
    }

    // Pending steps - small gray circle
    return <View style={styles.circleIndicatorPending} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Ionicons name="close" size={scale(30)} color="#017851" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Your Order</Text>
        </View>
        <View style={styles.headerButton} />
      </View>
      <View style={styles.divider} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Confirmation Section */}
        <View style={styles.confirmationSection}>
          <BigCircleWithTick />
          <View style={styles.confirmationText}>
            <Text style={styles.receivedText}>We've Received Your Order</Text>
            <Text style={styles.deliveryLabel}>Expected Delivery Time</Text>
            <Text style={styles.deliveryTime}>35-40 min</Text>
          </View>
        </View>
        <View style={styles.divider} />

        {/* Order Progress */}
        <View style={styles.orderProgressSection}>
          {orderSteps.map((step, index) => {
            const isCompleted = isStepCompleted(step.id);
            const isCurrent = isCurrentStep(step.id);
            const isActive = isCompleted || isCurrent;
            const isLastStep = index === orderSteps.length - 1;
            const shouldShowDescription = isCompleted || isCurrent;

            return (
              <React.Fragment key={step.id}>
                <View style={styles.orderProgressContainer}>
                  {renderStepIndicator(step.id)}

                  <View style={styles.orderProgressTextContainer}>
                    <Text
                      style={[
                        styles.orderProgressTitle,
                        isActive && styles.orderProgressTitleActive,
                      ]}
                    >
                      {step.label}
                    </Text>
                    {step.description && shouldShowDescription && (
                      <Text style={styles.orderProgressDescription}>
                        {step.description}
                      </Text>
                    )}
                  </View>
                </View>

                {!isLastStep && <View style={styles.progressConnector} />}
              </React.Fragment>
            );
          })}
        </View>

        <View style={styles.divider} />

        {/* Order Summary Header */}
        <View style={styles.orderSummaryHeader}>
          <Text style={styles.orderSummaryTitle}>
            Order Summary (ID: <Text style={styles.orderId}>{orderId}</Text>)
          </Text>
          <TouchableOpacity onPress={handleCopyOrderId}>
            <Text style={styles.copyButton}>Copy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />

        {/* Order Items - Alien Burger */}
        <View style={styles.orderItem}>
          <Image
            source={require("../../assets/image/Burger.png")}
            style={styles.orderImage}
          />
          <View style={styles.orderDetails}>
            <View style={styles.orderRow}>
              <View style={styles.orderInfo}>
                <Text style={styles.itemName}>Alien Burger</Text>
                {displayedIngredients.map((ingredient, index) => (
                  <Text key={index} style={styles.ingredientText}>
                    + {ingredient}
                  </Text>
                ))}
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setShowAllIngredients(!showAllIngredients)}
                >
                  <FontAwesome
                    name={
                      showAllIngredients ? "minus-square-o" : "plus-square-o"
                    }
                    size={scale(16)}
                    color="#99A1B7"
                    style={styles.showMoreIcon}
                  />
                  <Text style={styles.showMoreText}>
                    {showAllIngredients ? "Show Less" : "Show More"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.itemPrice}>80 SR</Text>
            </View>
            <View style={styles.quantityContainerAbsolute}>
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityBadgeText}>1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sweet Potato Pie Item */}
        <View style={styles.orderItem}>
          <Image
            source={require("../../assets/image/SweetPotatoPie.jpg")}
            style={styles.orderImage}
          />
          <View style={styles.orderDetails}>
            <View style={styles.orderRow}>
              <Text style={styles.itemName}>Sweet Potato Pie</Text>
              <Text style={styles.itemPrice}>50 SR</Text>
            </View>
            <View style={styles.quantityContainer}>
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityBadgeText}>2</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.divider} />

        {/* Price Breakdown */}
        <View style={styles.priceBreakdownSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>130 SR</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>20 SR</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount</Text>
            <Text style={styles.discountValue}>-10 SR</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total{" "}
              <Text style={styles.totalSubtext}>(incl. fees and tax)</Text>
            </Text>
            <Text style={styles.totalValue}>
              <Text style={styles.strikethroughPrice}>160 SR</Text>
              {"  "}140 SR
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.useAddressButton}
          onPress={handleUseAddress}
        >
          <Text style={styles.useAddressButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default YourOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: scale(24),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  headerButton: {
    width: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(17),
    textAlign: "center",
  },
  divider: {
    height: scale(1),
    backgroundColor: "#E6EAF1",
    marginHorizontal: scale(16),
    marginVertical: scale(12),
  },
  confirmationSection: {
    padding: scale(16),
    marginVertical: scale(12),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  confirmationText: {
    marginStart: scale(20),
    flex: 1,
  },
  receivedText: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    marginBottom: scale(8),
  },
  deliveryLabel: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  deliveryTime: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
  },
  orderProgressSection: {
    marginLeft: scale(26),
    marginTop: scale(20),
    marginBottom: scale(32),
  },
  orderProgressContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: scale(20),
  },
  orderProgressTextContainer: {
    gap: scale(3),
    flex: 1,
    position: "absolute",
    left: scale(78),
  },
  orderProgressTitle: {
    color: "#52525B",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
  },
  orderProgressTitleActive: {
    color: "#017851",
  },
  orderProgressDescription: {
    color: "#A1A1AA",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  progressConnector: {
    width: scale(1),
    backgroundColor: "#E6EAF1",
    height: scale(44),
    marginStart: scale(23),
  },
  circleIndicatorPending: {
    marginStart: scale(19),
    width: scale(11),
    height: scale(11),
    borderRadius: scale(5.5),
    backgroundColor: "#FFFFFF",
    borderWidth: scale(4),
    borderColor: "#A7A7A8",
  },
  circleIndicatorCompleted: {
    marginStart: scale(19),
    width: scale(11),
    height: scale(11),
    borderRadius: scale(5.5),
    backgroundColor: "#FFFFFF",
    borderWidth: scale(4),
    borderColor: "#017851",
  },
  orderSummaryHeader: {
    marginTop: scale(12),
    marginHorizontal: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  orderSummaryTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    flex: 1,
  },
  orderId: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  copyButton: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#017851",
  },
  orderItem: {
    flexDirection: "row",
    marginHorizontal: scale(16),
  },
  orderImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
  },
  orderDetails: {
    marginStart: scale(16),
    flex: 1,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderInfo: {
    flex: 1,
  },
  itemName: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
  },
  itemPrice: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  ingredientText: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(4),
  },
  showMoreIcon: {
    marginRight: scale(4),
  },
  showMoreText: {
    color: "#4B5675",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
  },
  quantityContainer: {
    alignItems: "flex-end",
    marginTop: scale(8),
  },
  quantityContainerAbsolute: {
    position: "absolute",
    bottom: scale(0),
    right: scale(0),
    alignItems: "flex-end",
    marginTop: scale(8),
  },
  quantityBadge: {
    width: scale(45),
    height: scale(34),
    borderRadius: scale(20),
    backgroundColor: "#ffffff",
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityBadgeText: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  priceBreakdownSection: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: scale(6),
  },
  priceLabel: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#6D6D6D",
  },
  priceValue: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  discountValue: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(12),
  },
  totalLabel: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  totalSubtext: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  totalValue: {
    color: "#017851",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(18),
  },
  strikethroughPrice: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    textDecorationLine: "line-through",
  },
  footer: {
    width: "100%",
    height: scale(108),
    borderTopWidth: scale(1),
    borderColor: "#E6EAF1",
  },
  useAddressButton: {
    backgroundColor: "#F6B01F",
    marginHorizontal: scale(20),
    marginVertical: scale(20),
    paddingVertical: scale(16),
    borderRadius: scale(5),
    alignItems: "center",
  },
  useAddressButtonText: {
    color: "#000000",
    fontSize: scale(18),
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
  },
});
