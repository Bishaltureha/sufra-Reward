import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import {
  CompositeNavigationProp,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import { scale } from "../utils/dimen";
import { DrawerParamList, GiftCardStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import CreditCard from "../../assets/svg/giftCards/CreditCard";
import GreenCircle from "../../assets/svg/giftCards/GreenCircle";
import FloatingLabelInput from "../components/FloatingLabelInput";
import DashedDivider from "../../assets/svg/giftCards/DashedDivider";

type GiftCardsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<GiftCardStackParamList, "GiftCardsMain">,
  DrawerNavigationProp<DrawerParamList>
>;

// Luhn algorithm to validate card number
const luhnCheck = (num: string) => {
  let arr = num
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  let sum = arr.reduce((acc, val, i) => {
    if (i % 2 !== 0) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    return acc + val;
  }, 0);
  return sum % 10 === 0;
};

// Validate MM/YY
const validateExpiry = (text: string) => {
  if (!text.includes("/")) return false;
  const [month, year] = text.split("/").map((x) => parseInt(x));
  if (!month || !year) return false;
  if (month < 1 || month > 12) return false;
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth))
    return false;
  return true;
};

// Validate CVV
const validateCvv = (text: string) => /^[0-9]{3,4}$/.test(text);

const GiftCardsPaymentScreen = ({ route }) => {
  const {
    selectedAmount,
    selectedCardComponent,
    recipientName,
    recipientEmail,
  } = route.params || {};

  const navigation = useNavigation<GiftCardsScreenNavigationProp>();

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvvError, setCvvError] = useState("");

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

  const SelectedCardComponent = selectedCardComponent;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={handleDrawerToggle}
        >
          <Drawerlogo />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Sufra Gift Cards</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Payment Options</Text>
          <View style={styles.divider} />

          <View style={styles.paymentMethodRow}>
            <View style={styles.paymentMethodLeft}>
              <CreditCard />
              <Text style={styles.paymentMethodText}>Credit Card</Text>
            </View>
            <View style={styles.paymentMethodRight}>
              <Text style={styles.feeText}>+ SR 3.00</Text>
              <GreenCircle />
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <FloatingLabelInput
              label="Name of the Card Holder"
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />

            <FloatingLabelInput
              label="Card Number"
              value={cardNumber}
              onChangeText={(text) => {
                const digitsOnly = text.replace(/\D/g, "");
                const formatted = digitsOnly.replace(/(.{4})/g, "$1 ").trim();
                setCardNumber(formatted);
                if (digitsOnly.length >= 12) {
                  setCardNumberError(
                    luhnCheck(digitsOnly) ? "" : "Card number is incorrect"
                  );
                } else setCardNumberError("Card number is incorrect");
              }}
              onBlur={() => {
                const digitsOnly = cardNumber.replace(/\D/g, "");
                setCardNumberError(
                  luhnCheck(digitsOnly) ? "" : "Card number is incorrect"
                );
              }}
              borderColor={cardNumberError ? "#FF617E" : "#E6E6E6"}
              labelColor={cardNumberError ? "#FF617E" : "#717171"}
              errorText={cardNumberError}
            />

            <View style={styles.rowInputs}>
              <View style={styles.flex1}>
                <FloatingLabelInput
                  label="MM/YY"
                  value={expiryDate}
                  onChangeText={(text) => {
                    const digits = text.replace(/\D/g, "");
                    const formatted =
                      digits.length > 2
                        ? digits.slice(0, 2) + "/" + digits.slice(2, 4)
                        : digits;
                    setExpiryDate(formatted);
                    setExpiryError(
                      validateExpiry(formatted) ? "" : "Invalid expiry date"
                    );
                  }}
                  onBlur={() =>
                    setExpiryError(
                      validateExpiry(expiryDate) ? "" : "Invalid expiry date"
                    )
                  }
                  borderColor={expiryError ? "#FF617E" : "#E6E6E6"}
                  labelColor={expiryError ? "#FF617E" : "#717171"}
                  errorText={expiryError}
                />
              </View>

              <View style={styles.flex1}>
                <FloatingLabelInput
                  label="CVV"
                  value={cvv}
                  onChangeText={(text) => {
                    const digits = text.replace(/\D/g, "");
                    setCvv(digits);
                    setCvvError(validateCvv(digits) ? "" : "Invalid CVV");
                  }}
                  onBlur={() =>
                    setCvvError(validateCvv(cvv) ? "" : "Invalid CVV")
                  }
                  keyboardType="numeric"
                  borderColor={cvvError ? "#FF617E" : "#E6E6E6"}
                  labelColor={cvvError ? "#FF617E" : "#717171"}
                  errorText={cvvError}
                />
              </View>
            </View>
          </View>

          {/* Order Summary */}
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.divider} />

          <View style={styles.orderSummaryRow}>
            {SelectedCardComponent && (
              <View style={styles.selectedCardContainer}>
                <SelectedCardComponent width={scale(100)} height={scale(55)} />
              </View>
            )}
            <View style={styles.orderSummaryTextContainer}>
              <Text style={styles.orderSummaryTitle}>
                Thank you - Gift Card - {selectedAmount * 0.8 || "0"} SAR
              </Text>
              <Text style={styles.orderSummaryRecipient}>{recipientName}</Text>
              <Text style={styles.orderSummaryPrice}>
                SR {selectedAmount * 0.8 || "0"}.00
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryGroup}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                SR {selectedAmount * 0.7 || "0"}.00
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>
                SR {selectedAmount * 0.1 || "0"}.00
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.redeemedPointsRow}>
                <Text style={styles.summaryLabel}>Redeemed 4.000 Points</Text>
                <TouchableOpacity style={styles.removeBtn}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.summaryValue}>
                - SR {selectedAmount * 0.2 || "0"}.00
              </Text>
            </View>
          </View>

          <View style={styles.dividerSpacing}>
            <DashedDivider />
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.grandTotalLabel}>GRAND TOTAL</Text>
            <Text style={styles.grandTotalValue}>
              SR {selectedAmount * 0.8 || "0"}.00
            </Text>
          </View>

          <View style={styles.dividerSpacing}>
            <DashedDivider />
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => {
              const PaymentData = {
                selectedAmount,
                selectedCardComponent,
                recipientName,
                recipientEmail,
                cardNumber,
              };
              navigation.navigate("PaymentDone", PaymentData);
            }}
          >
            <Text style={styles.paymentButtonText}>Pay Now</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By placing this order you agree to all{" "}
            <Text style={styles.termsLink}>Terms & conditions.</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GiftCardsPaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    height: scale(56),
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  drawerButton: { padding: scale(4), marginRight: scale(8) },
  titleContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
    textAlign: "center",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: scale(16),
  },
  scrollContent: { flexGrow: 1 },
  bottomContainer: { width: "100%", marginBottom: scale(16) },
  sectionTitle: {
    marginTop: scale(16),
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
  },
  divider: {
    backgroundColor: "#6D6D6D",
    width: "100%",
    height: scale(1),
    opacity: 0.2,
    marginVertical: scale(16),
  },
  paymentMethodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentMethodLeft: { flexDirection: "row", alignItems: "center" },
  paymentMethodText: {
    marginStart: scale(12),
    color: "#4A4A4A",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
  },
  paymentMethodRight: { flexDirection: "row", alignItems: "center" },
  feeText: {
    color: "#626262",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
    marginEnd: scale(12),
  },
  formContainer: {
    marginTop: scale(16),
    gap: scale(8),
    marginHorizontal: scale(8),
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: scale(10),
  },
  flex1: { flex: 1 },

  orderSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCardContainer: { borderRadius: scale(4), overflow: "hidden" },
  orderSummaryTextContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: scale(2),
  },
  orderSummaryTitle: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  orderSummaryRecipient: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#666666",
  },
  orderSummaryPrice: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#000000",
  },
  summaryGroup: { justifyContent: "flex-start", width: "100%", gap: scale(10) },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  summaryLabel: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#666666",
  },
  summaryValue: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#323232",
  },
  redeemedPointsRow: { flexDirection: "row", alignItems: "flex-end" },
  removeBtn: { marginStart: scale(5) },
  removeText: {
    color: "#FF617E",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  dividerSpacing: { marginVertical: scale(16) },
  grandTotalLabel: {
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(13),
    color: "#000000",
  },
  grandTotalValue: {
    color: "#000000",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
  },
  paymentButton: {
    paddingVertical: scale(16),
    backgroundColor: "#F6B01F",
    borderRadius: scale(5),
    marginBottom: scale(8),
  },
  paymentButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
    color: "#000000",
    textAlign: "center",
  },
  termsText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    color: "#000",
  },
  termsLink: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    color: "#017851",
  },

  // FloatingLabelInput ke andar TextInput ke liye
  input: {
    height: scale(55), // consistent height
    borderWidth: scale(1),
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    fontSize: scale(16),
    color: "#000",
    paddingVertical: 0,
  },

  // errorText ke liye
  errorText: {
    color: "#FF617E",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: 12,
    marginTop: scale(2), // thoda gap error ke liye
  },
});
