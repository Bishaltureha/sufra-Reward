import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import {
  CompositeNavigationProp,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import { DrawerParamList, GiftCardStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { scale } from "../utils/dimen";
import CircularTick from "../../assets/svg/giftCards/CircularTick";
import DashedDivider from "../../assets/svg/giftCards/DashedDivider";
import VisaLogo from "../../assets/svg/giftCards/VisaLogo";

type GiftCardsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<GiftCardStackParamList, "GiftCardsMain">,
  DrawerNavigationProp<DrawerParamList>
>;

const GiftCardsPaymentDoneScreen = ({ route }) => {
  const {
    selectedAmount,
    cardNumber,
    selectedCardComponent: SelectedCardComponent,
    recipientName,
    recipientEmail,
  } = route.params || {};
  const navigation = useNavigation<GiftCardsScreenNavigationProp>();

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

  const handleCopyPress = () => {
    console.log("Order ID copied!");
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.orderRow}>
          <CircularTick />
          <View style={styles.orderTextColumn}>
            <Text style={styles.orderCompletedText}>Order Completed</Text>
            <View style={styles.orderIdRow}>
              <Text style={styles.orderIdText}>Order ID: 43189210 </Text>
              <TouchableOpacity onPress={handleCopyPress}>
                <Text style={styles.copyText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.orderDetailsText}>Order Details</Text>
        <View style={styles.divider} />

        {SelectedCardComponent && (
          <View style={styles.selectedCardContainer}>
            <SelectedCardComponent width={"100%"} height={scale(196)} />
          </View>
        )}

        <Text style={styles.thankYouText}>Thank you - Gift Card</Text>

        <View style={styles.recipientInfo}>
          <View style={styles.recipientRow}>
            <Text style={styles.recipientLabel}>Recipient Name: </Text>
            <Text style={styles.recipientValue}>{recipientName}</Text>
          </View>
          <View style={styles.recipientRow}>
            <Text style={styles.recipientLabel}>Recipient Email: </Text>
            <Text style={styles.recipientValue}>{recipientEmail}</Text>
          </View>
          <View style={styles.recipientRow}>
            <Text style={styles.recipientLabel}>Amount: </Text>
            <Text style={styles.recipientValue}>
              {selectedAmount * 0.8} SAR
            </Text>
          </View>
        </View>

        <Text style={styles.totalAmountText}>
          SAR {selectedAmount * 0.8}.00
        </Text>

        <View style={styles.divider} />
        <Text style={styles.orderSummaryText}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>SAR {selectedAmount * 0.7}.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>SAR {selectedAmount * 0.1}.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.pointsRow}>
            <Text style={styles.summaryLabel}>Redeemed 4.000 Points</Text>
            <TouchableOpacity>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.summaryValue}>SAR {selectedAmount * 0.2}.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Pay with</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: scale(5),
            }}
          >
            <Text style={styles.summaryValue}>
              **** **** **** {cardNumber.slice(-4)}
            </Text>
            <VisaLogo />
          </View>
        </View>

        <View style={{ marginVertical: scale(16), width: "100%" }}>
          <DashedDivider />
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.grandTotalLabel}>GRAND TOTAL</Text>
          <Text style={styles.grandTotalValue}>
            SAR {selectedAmount * 0.8}.00
          </Text>
        </View>

        <View style={{ marginVertical: scale(16), width: "100%" }}>
          <DashedDivider />
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: scale(16),
            backgroundColor: "#017851",
            borderRadius: scale(5),

            marginVertical: scale(8),
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              textAlign: "center",
              fontFamily: "Rubik-Medium",
              fontWeight: "500",
              fontSize: scale(18),
            }}
          >
            Back to Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GiftCardsPaymentDoneScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    paddingBottom: scale(30),
    marginHorizontal: scale(16),
    marginVertical: scale(20),
  },
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
  contentWrapper: { marginVertical: scale(20), marginHorizontal: scale(16) },
  orderRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: scale(20),
  },
  orderTextColumn: { flexDirection: "column", gap: scale(2) },
  orderCompletedText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "500",
    fontSize: scale(17),
    color: "#232425",
  },
  orderIdRow: { flexDirection: "row", alignItems: "center" },
  orderIdText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#8E8E93",
  },
  copyText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#017851",
  },
  divider: {
    backgroundColor: "#6D6D6D",
    width: "100%",
    height: scale(1),
    opacity: 0.3,
    marginVertical: scale(16),
  },
  orderDetailsText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
  },
  selectedCardContainer: {
    marginVertical: scale(16),
    borderRadius: scale(4),
    overflow: "hidden",
  },
  thankYouText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(16),
    color: "#4A4A4A",
    marginBottom: scale(8),
  },
  recipientInfo: { gap: scale(3), marginBottom: scale(10) },
  recipientRow: { flexDirection: "row", gap: scale(4) },
  recipientLabel: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(13),
    color: "#4A4A4A",
  },
  recipientValue: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(13),
    color: "#4A4A4A",
  },
  totalAmountText: {
    marginTop: scale(10),
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    textAlign: "right",
    color: "#000000",
  },
  orderSummaryText: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
    marginVertical: scale(8),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: scale(4),
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
    alignSelf: "center",
    textAlign: "center",
  },
  pointsRow: { flexDirection: "row", alignItems: "center" },
  removeText: {
    marginStart: scale(5),
    color: "#FF3333",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  grandTotalLabel: {
    color: "#000000",
    fontFamily: "Rubik-Bold",
    fontWeight: "700",
    fontSize: scale(13),
  },
  grandTotalValue: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
    color: "#000000",
  },
});
