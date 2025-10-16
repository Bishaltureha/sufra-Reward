import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import CreditCardLogo from "../../assets/svg/CreditCardLogo";
import ApplePayment from "../../assets/svg/ApplePayment";
import GreenCreditCard from "../../assets/svg/GreenCreditCard";
import WhiteCreditCard from "../../assets/svg/WhiteCreditCard";

type MyPaymentMethodsScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "MyPaymentMethods"
>;

const MyPaymentMethodsScreen = () => {
  const navigation = useNavigation<MyPaymentMethodsScreenNavigationProp>();
  const [selectedPayment, setSelectedPayment] = useState<string>("creditCard");

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

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={handleDrawerToggle}
        >
          <Drawerlogo />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>My Cards</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        {/* Credit Card Option */}
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setSelectedPayment("creditCard")}
          activeOpacity={0.7}
        >
          <View style={styles.leftSection}>
            <CreditCardLogo />
            <Text style={styles.paymentText}>Credit Card</Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.feeText}>+ AED 3.00</Text>

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
          </View>
        </TouchableOpacity>
        {selectedPayment === "creditCard" && (
          <ScrollView
            style={{
              flexDirection: "row",
              marginTop: scale(10),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: scale(10) }}
          >
            <GreenCreditCard />
            <WhiteCreditCard />
          </ScrollView>
        )}
        <View style={styles.divider} />

        {/* Apple Pay Option */}
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setSelectedPayment("applePay")}
          activeOpacity={0.7}
        >
          <View style={styles.leftSection}>
            <ApplePayment />
            <Text style={styles.paymentText}>Apple Pay</Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.feeText}>+ AED 3.00</Text>
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
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.addButtonText}>Place my order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyPaymentMethodsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    height: scale(50),
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  drawerButton: {
    padding: scale(4),
    marginRight: scale(8),
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
    textAlign: "center",
  },
  spacer: {
    width: scale(36),
  },
  content: {
    padding: scale(16),
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(4),
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  paymentText: {
    color: "#323232",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(15),
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  feeText: {
    color: "#626262",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
  },
  divider: {
    height: scale(1),
    width: "100%",
    backgroundColor: "#E5E5EA",
    marginVertical: scale(16),
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
  bottomContainer: {
    height: scale(100),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    shadowColor: "#606170",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 8,
  },
  addButton: {
    backgroundColor: "#017851",
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
  },
});
