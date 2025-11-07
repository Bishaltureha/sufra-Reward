import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../assets/svg/BackArrow";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { MainStackParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { scale } from "../utils/dimen";

type TransactionHistoryscreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MainStackParamList, "TransactionHistory">,
  NativeStackNavigationProp<MainStackParamList>
>;

const TransactionHistory = () => {
  const navigation = useNavigation<TransactionHistoryscreenNavigationProp>();

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
          <Text style={styles.headerTitle}>Transaction History</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Body */}
      <View style={styles.content}>
        <Text style={styles.infoText}>
          You haven’t made any transactions yet.
        </Text>
        <Text style={styles.subText}>
          Once you start earning and redeeming points, your transactions will
          appear here.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
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
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(20),
    color: "#747474",
  },
  spacer: { width: scale(36) },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(24),
  },
  infoText: {
    fontFamily: "InterFace Trial-Bold",
    fontSize: scale(18),
    color: "#017851",
    textAlign: "center",
    marginBottom: scale(8),
  },
  subText: {
    fontFamily: "InterFace Trial-Regular",
    fontSize: scale(14),
    color: "#747474",
    textAlign: "center",
  },
});
