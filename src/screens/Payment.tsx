import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { scale } from "../utils/dimen";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";
import RuningTime from "../../assets/svg/RuningTime";
import LocationofCart from "../../assets/svg/LocationofCart";
import GreenFire from "../../assets/svg/GreenFire";
import SufraPoint from "../../assets/svg/SufraPoint";
import Ticket from "../../assets/svg/Ticket";
import ApplePay from "../../assets/svg/ApplePay";
import PaymentCreditCardLogo from "../../assets/svg/PaymentCreditCardLogo";
import LocationLogo from "../../assets/svg/LocationLogo";
import Trash from "../../assets/svg/Trash";
import WhiteTicket from "../../assets/svg/WhiteTicket";
import GreenCreditCard from "../../assets/svg/GreenCreditCard";
import WhiteCreditCard from "../../assets/svg/WhiteCreditCard";
import { LinearGradient } from "expo-linear-gradient";
import FloatingLabelInput from "../components/FloatingLabelInput";
import CardPaymentForm from "../components/CardPaymentForm";
import CustomCheckbox from "../components/CustomCheckbox";

type PaymentRouteProp = RouteProp<RootStackParamList, "Payment">;
const Payment = () => {
  const route = useRoute<PaymentRouteProp>();
  const deliveryAddress = route.params?.deliveryAddress;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [appliedPromos, setAppliedPromos] = useState<number[]>([0]);
  const [selectedPayment, setSelectedPayment] = useState<string>("applePay");
  const [showLocationMismatch, setShowLocationMismatch] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [code, setCode] = useState("");
  const [redeemed, setRedeemed] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [saveCard, setSaveCard] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const togglePromo = (index: number) => {
    if (appliedPromos.includes(index)) {
      setAppliedPromos(appliedPromos.filter((i) => i !== index));
    } else {
      setAppliedPromos([...appliedPromos, index]);
    }
  };
  const handleApply = () => {
    if (code.trim().toUpperCase() === "SFRR-WRDS-105F7") {
      setRedeemed(true);
    } else {
      alert("Invalid promo code");
    }
  };
  const handleTrash = () => {
    setRedeemed(false);
    setCode("");
  };

  const promos = [
    { title: "Birthday Coupon", expiry: "Expires on 05/21/2024" },
    { title: "Weekly Lunch Specials", expiry: "Expires on 05/21/2024" },
    { title: "Weekly Lunch Specials", expiry: "Expires on 05/21/2024" },
    { title: "Weekly Lunch Specials", expiry: "Expires on 05/21/2024" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
            <AntDesign name="left" size={scale(20)} color="#017851" />
          </TouchableOpacity>
          <View style={styles.subHeader}>
            <Text style={styles.cartTitle}>Checkout</Text>
            <Text style={styles.restaurantName}>Fire Grill Restaurant</Text>
          </View>
        </View>
        <View style={styles.contentBox}>
          <View style={styles.progressContainer}>
            {[
              { label: "Menu", active: true },
              { label: "Cart", active: true },
              { label: "Checkout", active: true },
            ].map((step, index) => (
              <View key={index} style={styles.progressStep}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: step.active ? "#FBAA19" : "#979797" },
                  ]}
                />
                <Text
                  style={[
                    styles.progressLabel,
                    { color: step.active ? "#FBAA19" : "#979797" },
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>
            {/* Pick-up Details */}
            Delivery Details
          </Text>
          <View style={styles.pickupCard}>
            <View style={styles.deliveryTimeContainer}>
              <RuningTime />
              <Text style={styles.deliveryTimeLabel}>
                Expected Delivery Time
              </Text>
            </View>
            <Text style={styles.deliveryTimeValue}>35-40 min</Text>
          </View>
          {!showLocationMismatch ? (
            <>
              <TouchableOpacity
                style={styles.pickupDetailsCard}
                onPress={() => setShowLocationMismatch(true)}
                activeOpacity={0.7}
              >
                <View style={styles.pickupDetailsRow}>
                  <ImageBackground
                    source={require("../../assets/image/LoctionBackground.png")}
                    style={styles.locationImageBackground}
                  >
                    <LocationofCart />
                  </ImageBackground>

                  {deliveryAddress ? (
                    // Show saved address
                    <View style={styles.addressContainer}>
                      <Text style={styles.branchName}>
                        {deliveryAddress.addressName}
                      </Text>
                      <Text
                        style={styles.addressText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {deliveryAddress.street}
                      </Text>
                    </View>
                  ) : (
                    // Show "Add New Address" button if no address
                    <TouchableOpacity
                      style={{ justifyContent: "center", alignItems: "center" }}
                      onPress={() => {
                        navigation.navigate("SelectDeliveryAddress");
                      }}
                    >
                      <Text
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Rubik-SemiBold",
                          fontWeight: "600",
                          fontSize: scale(14),
                          textAlign: "center",
                        }}
                      >
                        + Add New Address
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {deliveryAddress && (
                  <AntDesign name="right" size={scale(15)} color="#017851" />
                )}
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.locationMismatchContainer}
              onPress={() => setShowLocationMismatch(false)}
              activeOpacity={0.7}
            >
              <View style={styles.locationMismatchHeader}>
                <LocationLogo color={"#ffffff"} />
                <Text style={styles.locationMismatchText}>
                  Your address doesn't match your Current location
                </Text>
              </View>
              <View style={styles.locationMismatchCard}>
                <View style={styles.pickupDetailsRow}>
                  <ImageBackground
                    source={require("../../assets/image/LoctionBackground.png")}
                    style={styles.locationImageBackground}
                  >
                    <LocationofCart />
                  </ImageBackground>
                  {deliveryAddress && (
                    <View style={styles.addressContainer}>
                      <Text style={styles.branchName}>
                        {deliveryAddress.addressName}
                      </Text>
                      <Text
                        style={styles.addressText}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {deliveryAddress.street}
                      </Text>
                    </View>
                  )}
                </View>
                <AntDesign name="right" size={scale(15)} color="#017851" />
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.noteContainer}>
            <TextInput
              placeholder="Note to Rider - e.g. do not ring doorbell"
              placeholderTextColor="#717171"
              style={styles.noteInput}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.promosSection}>
          <Text style={styles.sectionTitle}>
            {/* Applicable Promos */}
            Applicable Campaigns
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoScrollContent}
          >
            {promos.map((promo, index) => (
              <View key={index} style={styles.promoCard}>
                <GreenFire height={scale(25)} width={scale(25)} />
                <View style={styles.promoContent}>
                  <View style={styles.promoInfo}>
                    <Text style={styles.promoTitle}>{promo.title}</Text>
                    <Text style={styles.promoExpiry}>{promo.expiry}</Text>
                  </View>
                  <TouchableOpacity
                    style={
                      appliedPromos.includes(index)
                        ? styles.promoButtonApplied
                        : styles.promoButtonActive
                    }
                    onPress={() => togglePromo(index)}
                  >
                    <Text
                      style={
                        appliedPromos.includes(index)
                          ? styles.promoButtonTextApplied
                          : styles.promoButtonTextActive
                      }
                    >
                      {appliedPromos.includes(index) ? "Applied!" : "Apply"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Sufra Points, Gift Cards, and Promo Codes
          </Text>

          {!isRedeemed ? (
            <View style={styles.giftCardSmall}>
              <View style={styles.sufraPointContainer}>
                <SufraPoint />
                <View style={styles.sufraPointInfo}>
                  <Text style={styles.sufraPointTitle}>
                    Available Sufra Points
                  </Text>
                  <Text style={styles.sufraPointValue}>
                    32,010 pt
                    <Text style={styles.sufraPointSubValue}>(1600 SR)</Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.redeemButton}
                onPress={() => setIsRedeemed(true)}
              >
                <Text style={styles.redeemButtonText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.redeemedCard}>
              <View style={styles.sufraPointContainer}>
                <SufraPoint />
                <View style={styles.sufraPointInfo}>
                  <Text style={styles.redeemedTextMain}>
                    1600 Pt (160 SR) Redeemed
                  </Text>
                  <Text style={styles.redeemedTextSub}>
                    Remaining balance is{" "}
                    <Text style={styles.redeemedTextHighlight}>150 SR</Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsRedeemed(false)}>
                <Trash color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
          <View style={{ width: "100%" }}>
            {!redeemed ? (
              // 🔹 Gift / Promo Code Input Card
              <View style={styles.giftCardLarge}>
                <View style={styles.giftCardHeader}>
                  <Ticket />
                  <Text style={styles.giftCardTitle}>
                    Use Gift Card or Promo Code
                  </Text>
                </View>
                <View style={styles.promoInputContainer}>
                  <TextInput
                    placeholder="Enter gift or promo code"
                    placeholderTextColor="#717171"
                    style={styles.promoInput}
                    value={code}
                    onChangeText={setCode}
                  />
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={handleApply}
                  >
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // 🔹 Redeemed Card View
              <View style={styles.redeemedCard}>
                <View style={styles.redeemedLeft}>
                  <WhiteTicket />
                  <View style={styles.sufraPointInfo}>
                    <Text style={styles.redeemedTextMain}>SFRR-WRDS-105F7</Text>
                    <Text style={styles.redeemedTextSub}>
                      Remaining balance is{" "}
                      <Text style={styles.redeemedTextHighlight}>150 SR</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.redeemedRight}>
                  <Text style={styles.redeemedAmount}>-100 SR</Text>
                  <TouchableOpacity onPress={handleTrash}>
                    <Trash color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.paymentMethodRow}
            onPress={() => setSelectedPayment("applePay")}
          >
            <ApplePay />
            <Text style={styles.paymentMethodText}>Apple Pay</Text>
            <View
              style={[
                styles.radioButton,
                selectedPayment === "applePay" && styles.radioButtonSelected,
              ]}
            >
              {selectedPayment === "applePay" && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.paymentMethodRow}
            onPress={() => setSelectedPayment("creditCard")}
          >
            <PaymentCreditCardLogo />
            <Text style={styles.paymentMethodText}>Credit Card</Text>
            <View
              style={[
                styles.radioButton,
                selectedPayment === "creditCard" && styles.radioButtonSelected,
              ]}
            >
              {selectedPayment === "creditCard" && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
          {selectedPayment === "creditCard" && (
            <View
              style={{
                marginTop: scale(16),
                marginBottom: scale(16),
                gap: scale(12),
                flexDirection: "column",
                width: "100%",
              }}
            >
              {!showAddCardForm ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: scale(12),
                  }}
                >
                  <GreenCreditCard />
                  <WhiteCreditCard />
                  <TouchableOpacity onPress={() => setShowAddCardForm(true)}>
                    <LinearGradient
                      colors={["#FFFFFF", "#F4F4F4", "#F5F5F5"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={{
                        width: scale(107),
                        height: scale(107),
                        borderWidth: scale(1),
                        borderColor: "#E3E3E3",
                        borderRadius: scale(8),
                        opacity: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        gap: scale(6),
                      }}
                    >
                      <FontAwesome
                        name="plus-square-o"
                        size={scale(24)}
                        color="#99A1B7"
                      />
                      <Text
                        style={{
                          color: "#4A4A4A",
                          fontFamily: "Rubik-Medium",
                          fontWeight: "500",
                          fontSize: scale(12),
                        }}
                      >
                        Add New Card
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </ScrollView>
              ) : (
                <View style={{}}>
                  {/* Card Payment Form */}
                  <CardPaymentForm
                    onCardDataChange={(data) => setCardData(data)}
                    onValidityChange={(isValid) => setIsFormValid(isValid)}
                  />

                  {/* Save Card Checkbox */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: scale(10),
                      marginTop: scale(6),
                    }}
                  >
                    <CustomCheckbox
                      checked={saveCard}
                      onChange={(checked) => setSaveCard(checked)}
                    />
                    <Text
                      style={{
                        fontFamily: "Rubik-Regular",
                        fontSize: scale(14),
                        fontWeight: "400",
                        color: "#000000",
                      }}
                    >
                      Save Card
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.divider} />
          <View style={styles.orderItemsContainer}>
            <View style={styles.orderItemRow}>
              <Text style={styles.orderItemText}>1 x Alien Burger</Text>
              <Text style={styles.orderItemPrice}>80 SR</Text>
            </View>
            <View style={styles.orderItemRow}>
              <Text style={styles.orderItemText}>1 x Sweet Potato Pie</Text>
              <Text style={styles.orderItemPrice}>50 SR</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceBreakdownContainer}>
            <View style={styles.priceBreakdownRow}>
              <Text style={styles.priceBreakdownLabel}>Subtotal</Text>
              <Text style={styles.priceBreakdownValue}>130 SR</Text>
            </View>
            <View style={styles.priceBreakdownRow}>
              <Text style={styles.priceBreakdownLabel}>Delivery Fee</Text>
              <Text style={styles.priceBreakdownValue}>20 SR</Text>
            </View>
            <View style={styles.priceBreakdownRow}>
              <Text style={styles.priceBreakdownLabel}>Discount</Text>
              <Text style={styles.discountValue}>-10 SR</Text>
            </View>
          </View>
        </View>
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By completing this order, I aggree to all{" "}
          </Text>
          <Text style={styles.termsLink}>Terms & Conditions</Text>
        </View>
        <View style={styles.fillSpace} />
      </ScrollView>
      {showPriceBreakdown && (
        <View>
          <View style={styles.summaryRowFirst}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>230 SR</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.deliveryFreeValue}>FREE</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {"{Promo Name}"}
              <Text style={styles.removeText}>{"  "}- Remove</Text>
            </Text>
            <Text style={styles.discountValue}>-10 SR</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Sufra Points
              <Text style={styles.removeText}>{"  "}- Remove</Text>
            </Text>
            <Text style={styles.discountValue}>-70 SR</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Gift Card
              <Text style={styles.removeText}>{"  "}- Remove</Text>
            </Text>
            <Text style={styles.discountValue}>-100 SR</Text>
          </View>
          <View style={styles.dividerNoPadding} />
        </View>
      )}
      <View style={styles.totalSection}>
        <TouchableOpacity
          style={styles.totalRow}
          onPress={() => setShowPriceBreakdown(!showPriceBreakdown)}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.totalLabel}>
              Total{" "}
              <Text style={styles.totalSubtext}>(incl. fees and tax)</Text>
            </Text>
          </View>
          <View style={styles.priceGroup}>
            <Text style={styles.strikePrice}>230 SR</Text>
            <Text style={styles.finalPrice}>50 SR</Text>

            <MaterialIcons
              name={
                showPriceBreakdown ? "keyboard-arrow-up" : "keyboard-arrow-down"
              }
              size={24}
              color="#017851"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollViewContent: {
    paddingBottom: scale(200),
  },
  header: {
    marginStart: scale(24),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: scale(16),
    marginTop: scale(10),
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    marginStart: scale(8),
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cartTitle: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  restaurantName: {
    color: "#000000",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  contentBox: {
    marginHorizontal: scale(16),
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressStep: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: scale(2),
  },
  progressBar: {
    width: "100%",
    height: scale(3),
    borderRadius: scale(10),
  },
  progressLabel: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
    marginTop: scale(4),
    marginBottom: scale(16),
  },
  sectionTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  divider: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginVertical: scale(16),
  },
  pickupCard: {
    width: "100%",
    height: scale(60),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: "#F4F4F4",
    marginTop: scale(14),
    padding: scale(16),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  deliveryTimeContainer: {
    flexDirection: "row",
    gap: scale(12),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  deliveryTimeLabel: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontSize: scale(14),
    fontWeight: "400",
  },
  deliveryTimeValue: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontSize: scale(16),
    fontWeight: "600",
  },
  pickupDetailsCard: {
    width: "100%",
    height: scale(109),
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: "#F4F4F4",
    marginTop: scale(12),
    padding: scale(12),
    gap: scale(16),
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickupDetailsRow: {
    flexDirection: "row",
    gap: scale(16),
    flex: 1,
  },
  locationImageBackground: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  addressContainer: {
    gap: scale(4),
    flex: 1,
  },
  branchName: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: 14,
  },
  addressText: {
    color: "#717171",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  contactText: {
    color: "#717171",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  noteContainer: {
    marginTop: scale(12),
    marginBottom: scale(14),
  },
  noteInput: {
    width: "100%",
    height: scale(55),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    borderRadius: scale(6),
    backgroundColor: "#FFFFFF",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    lineHeight: scale(14),
    color: "#717171",
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    textAlignVertical: "top",
  },
  separator: {
    width: "100%",
    height: scale(8),
    backgroundColor: "#f5f5f5",
  },
  promosSection: {
    padding: scale(16),
  },
  promoScrollContent: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    gap: scale(12),
  },
  promoCard: {
    minWidth: scale(100),
    height: scale(103),
    padding: scale(12),
    borderWidth: scale(1),
    borderRadius: scale(10),
    backgroundColor: "#ffffff",
    borderColor: "#E6EAF1",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scale(10),
  },
  promoContent: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  promoInfo: {
    gap: scale(2),
  },
  promoTitle: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  promoExpiry: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
    color: "#A1A1AA",
  },
  promoButtonApplied: {
    width: scale(164),
    height: scale(30),
    borderColor: "#E6EAF1",
    borderRadius: scale(5),
    borderWidth: scale(1),
    marginBottom: scale(0),
    justifyContent: "center",
    alignItems: "center",
  },
  promoButtonTextApplied: {
    color: "#717171",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  promoButtonActive: {
    width: scale(164),
    height: scale(30),
    borderColor: "#E6EAF1",
    borderRadius: scale(5),
    borderWidth: scale(1),
    marginBottom: scale(0),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#017851",
  },
  promoButtonTextActive: {
    color: "#ffffff",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  section: {
    padding: scale(16),
  },
  instructionsText: {
    fontFamily: "Rubik-Regular",
    fontSize: scale(12),
    color: "#999",
    marginTop: scale(4),
  },
  giftCardSmall: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    height: scale(67),
    borderRadius: scale(10),
    marginTop: scale(16),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: scale(16),
  },
  sufraPointContainer: {
    gap: scale(8),
    flexDirection: "row",
  },
  sufraPointInfo: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: scale(4),
  },
  sufraPointTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  sufraPointValue: {
    color: "#017851",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(12),
  },
  sufraPointSubValue: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  redeemButton: {
    width: scale(90),
    height: scale(45),
    borderRadius: scale(5),
    backgroundColor: "#017851",
    justifyContent: "center",
    alignItems: "center",
  },
  redeemButtonText: {
    color: "#ffffff",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
  },
  giftCardLarge: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    height: scale(130),
    borderRadius: scale(10),
    marginTop: scale(8),
    padding: scale(16),
    justifyContent: "flex-start",
    gap: scale(20),
    alignItems: "flex-start",
  },
  giftCardHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: scale(12),
  },
  giftCardTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  promoInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  promoInput: {
    width: scale(228),
    height: scale(45),
    borderRadius: scale(6),
    borderWidth: scale(1),
    borderColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    lineHeight: scale(14),
    color: "#717171",
    paddingHorizontal: scale(12),
  },
  applyButton: {
    backgroundColor: "#017851",
    width: scale(90),
    height: scale(45),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
    color: "#ffffff",
  },
  paymentMethodRow: {
    flexDirection: "row",
    gap: scale(12),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  paymentMethodText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    flex: 1,
  },
  orderItemsContainer: {
    gap: scale(16),
  },
  orderItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderItemText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(16),
  },
  orderItemPrice: {
    color: "#4A4A4A",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(16),
  },
  priceBreakdownContainer: {
    gap: scale(10),
  },
  priceBreakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceBreakdownLabel: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#6D6D6D",
  },
  priceBreakdownValue: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
  },
  termsSection: {
    padding: scale(16),
    backgroundColor: "#f5f5f5",
  },
  termsText: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  termsLink: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  fillSpace: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  summaryRowFirst: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
    marginTop: scale(16),
  },
  summaryLabel: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  summaryValue: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  deliveryFreeValue: {
    color: "#017851",
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
  removeText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    color: "#FF617E",
  },
  totalSection: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: scale(16),
    paddingBottom: scale(10),
  },
  dividerNoPadding: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginVertical: scale(0),
    marginTop: scale(16),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  totalLabel: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  totalSubtext: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  priceGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  strikePrice: {
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    textDecorationLine: "line-through",
  },
  finalPrice: {
    color: "#017851",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
  confirmButton: {
    backgroundColor: "#F6B01F",
    width: "100%",
    height: scale(48),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#000000",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    textAlign: "center",
    fontSize: scale(18),
  },
  radioButton: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    borderWidth: scale(2),
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#017851",
  },
  radioButtonInner: {
    width: scale(23),
    height: scale(23),
    borderRadius: scale(12.5),
    borderWidth: scale(4),
    borderColor: "#017851",
  },
  locationMismatchContainer: {
    marginTop: scale(12),
  },
  locationMismatchHeader: {
    height: scale(34),
    width: "100%",
    backgroundColor: "#FF617E",
    borderTopRightRadius: scale(9),
    borderTopLeftRadius: scale(9),
    flexDirection: "row",
    paddingHorizontal: scale(12),
    alignItems: "center",
    justifyContent: "space-around",
  },
  locationMismatchText: {
    color: "#ffffff",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  locationMismatchCard: {
    height: scale(111),
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: scale(9),
    borderBottomRightRadius: scale(9),
    borderWidth: scale(1),
    borderColor: "#E6EAF1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(12),
  },
  redeemedCard: {
    height: scale(67),
    width: "100%",
    backgroundColor: "#017851",
    borderRadius: scale(10),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: scale(16),
    marginTop: scale(16),
  },
  redeemedTextMain: {
    color: "#FFFFFF",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
  },
  redeemedTextSub: {
    color: "#ffffff",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  redeemedTextHighlight: {
    color: "#F6B01F",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(12),
  },
  redeemedRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  redeemedAmount: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(14),
    color: "#ffffff",
  },
  redeemedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    borderWidth: scale(2),
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  checkboxSelected: {
    backgroundColor: "#017851",
    borderColor: "#017851",
    justifyContent: "center",
    alignItems: "center",
  },
});
