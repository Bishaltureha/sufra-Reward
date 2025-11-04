import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerParamList, MainStackParamList } from "../types";
import BackArrow from "../../assets/svg/BackArrow";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import PointsTwowheelerGreen from "../../assets/svg/PointsTwowheelerGreen";
import DineInBox from "../../assets/svg/DineInBox";
import PointBags from "../../assets/svg/PointBags";
import PointsWelcome from "../../assets/svg/PointsWelcome";

type PointsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, "Profile">,
  NativeStackNavigationProp<MainStackParamList>
>;

interface Transaction {
  id: string;
  type: "delivery" | "dine-in" | "pickup" | "welcome" | "redeemed";
  title: string;
  time: string;
  points: number;
  isDebit?: boolean;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "delivery",
    title: "Order from Earth Bowlz",
    time: "17 min ago",
    points: 300,
  },
  {
    id: "2",
    type: "delivery",
    title: "Order from Earth Bowlz",
    time: "17 min ago",
    points: -300,
    isDebit: true,
  },
  {
    id: "3",
    type: "delivery",
    title: "Order from Earth Bowlz",
    time: "30 min ago",
    points: -300,
    isDebit: true,
  },
  {
    id: "4",
    type: "dine-in",
    title: "Dine-in from Steak House Burger",
    time: "1 day ago",
    points: 100,
  },
  {
    id: "5",
    type: "delivery",
    title: "Redeemed at City Fresh Kitchen",
    time: "1 day ago",
    points: -500,
    isDebit: true,
  },
  {
    id: "6",
    type: "dine-in",
    title: "Dine-in from Steak House Burger",
    time: "2 days ago",
    points: 100,
  },
  {
    id: "7",
    type: "pickup",
    title: "Pickup from City Fresh Kitchen",
    time: "2 days ago",
    points: 450,
  },
  {
    id: "8",
    type: "pickup",
    title: "Pickup from City Fresh Kitchen",
    time: "3 days ago",
    points: 200,
  },
  {
    id: "9",
    type: "delivery",
    title: "Order from Ocean Breeze Cafe",
    time: "3 days ago",
    points: 150,
  },
  {
    id: "10",
    type: "dine-in",
    title: "Dine-in from Mountain View Restaurant",
    time: "4 days ago",
    points: 250,
  },
  {
    id: "11",
    type: "delivery",
    title: "Redeemed at Green Garden Bistro",
    time: "5 days ago",
    points: -400,
    isDebit: true,
  },
  {
    id: "12",
    type: "pickup",
    title: "Pickup from Urban Eats",
    time: "5 days ago",
    points: 180,
  },
  {
    id: "13",
    type: "delivery",
    title: "Order from Sunset Grill",
    time: "6 days ago",
    points: 320,
  },
  {
    id: "14",
    type: "welcome",
    title: "Welcome Gift",
    time: "7 days ago",
    points: 100,
  },
];

const PointsScreen = () => {
  const navigation = useNavigation<PointsScreenNavigationProp>();

  const getIcon = (type: Transaction["type"], isDebit?: boolean) => {
    switch (type) {
      case "delivery":
        return (
          <PointsTwowheelerGreen
            iconColor={isDebit ? "#CC5B41E5" : undefined}
          />
        );
      case "dine-in":
        return <DineInBox />;
      case "pickup":
        return <PointBags />;
      case "welcome":
        return <PointsWelcome />;
      default:
        return <PointsTwowheelerGreen />;
    }
  };

  const renderTransaction = (transaction: Transaction) => {
    const isDebit = transaction.isDebit || transaction.points < 0;

    return (
      <View key={transaction.id} style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          {getIcon(transaction.type, isDebit)}
          <View style={styles.transactionDetails}>
            <Text
              style={
                isDebit ? styles.transactionNameDebit : styles.transactionName
              }
            >
              {transaction.title}
            </Text>
            <Text style={styles.transactionTime}>{transaction.time}</Text>
          </View>
        </View>
        <View
          style={
            isDebit
              ? styles.transactionPointsContainerDebit
              : styles.transactionPointsContainer
          }
        >
          <Text
            style={
              isDebit ? styles.transactionPointsDebit : styles.transactionPoints
            }
          >
            {transaction.points > 0 ? transaction.points : transaction.points}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Points</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <View style={styles.infoCardRow}>
            <View style={styles.loyaltyPointsContainer}>
              <Text style={styles.loyaltyPointsTitle}>Loyalty Points</Text>
              <TouchableOpacity style={styles.loyaltyIdBadge}>
                <Text style={styles.loyaltyIdText}>Show your Loyalty ID</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pointsValueContainer}>
              <Text style={styles.pointsValue}>32,010</Text>
              <Text style={styles.pointsCurrency}>1600.50 SAR</Text>
            </View>
          </View>
          <Text style={styles.infoText}>
            Min. Redeemable Amount:{" "}
            <Text style={styles.infoBoldText}>300 points</Text>
          </Text>
        </View>

        <View style={styles.transactionSection}>
          <Text style={styles.transactionTitle}>Transaction History</Text>
          {transactions.map(renderTransaction)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PointsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    backgroundColor: "#ffffff",
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
  },
  backButton: {
    padding: scale(4),
    marginRight: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(24),
    color: "#747474",
  },
  spacer: {
    width: scale(36),
  },
  infoCard: {
    backgroundColor: "#F1EDE5",
    marginVertical: scale(8),
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    paddingBottom: scale(8),
    gap: scale(12),
    borderRadius: scale(12),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infoCardRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loyaltyPointsContainer: {
    gap: scale(4),
  },
  loyaltyPointsTitle: {
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
    color: "#434343B2",
  },
  loyaltyIdBadge: {
    backgroundColor: "#D86642",
    borderRadius: scale(28),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    alignSelf: "flex-start",
  },
  loyaltyIdText: {
    color: "#EADDAA",
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(12),
  },
  pointsValueContainer: {
    justifyContent: "flex-start",
  },
  pointsValue: {
    marginTop: scale(-5),
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(32),
    textAlign: "right",
    color: "#017851",
  },
  pointsCurrency: {
    color: "#43434366",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(16),
    textAlign: "right",
  },
  infoText: {
    fontFamily: "InterFace Trial",
    fontWeight: "400",
    fontSize: scale(12),
    lineHeight: scale(12),
    color: "#43434380",
  },
  infoBoldText: {
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(12),
    lineHeight: scale(12),
    color: "#43434380",
  },
  transactionSection: {
    marginTop: scale(10),
    gap: scale(15),
    paddingBottom: scale(20),
  },
  transactionTitle: {
    color: "#747474",
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  transactionDetails: {
    marginTop: scale(10),
    marginStart: scale(10),
    flex: 1,
  },
  transactionName: {
    color: "#017851",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(14),
  },
  transactionNameDebit: {
    color: "#D86642",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(14),
  },
  transactionTime: {
    color: "#747474",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(13),
  },
  transactionPointsContainer: {
    backgroundColor: "#0178511A",
    padding: scale(8),
    borderRadius: scale(4),
    alignItems: "center",
    justifyContent: "center",
  },
  transactionPointsContainerDebit: {
    backgroundColor: "#D866421A",
    padding: scale(8),
    borderRadius: scale(4),
    alignItems: "center",
    justifyContent: "center",
  },
  transactionPoints: {
    color: "#017851",
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(18),
    textAlign: "right",
  },
  transactionPointsDebit: {
    color: "#D86642",
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(18),
    textAlign: "right",
  },
});
