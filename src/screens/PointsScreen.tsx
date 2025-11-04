import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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

type PointsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, "Profile">,
  NativeStackNavigationProp<MainStackParamList>
>;
const PointsScreen = () => {
  const navigation = useNavigation<PointsScreenNavigationProp>();

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
      <View style={styles.infoCard}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ gap: scale(8) }}>
            <Text
              style={{
                fontFamily: "Sackers Gothic Std-Medium",
                fontWeight: "500",
                fontSize: scale(16),
                textTransform: "uppercase",
                color: "#434343B2",
              }}
            >
              Loyalty Points
            </Text>
            <View
              style={{
                backgroundColor: "#D86642",
                borderRadius: scale(28),
                paddingVertical: scale(6),
                paddingHorizontal: scale(12),
              }}
            >
              <Text
                style={{
                  color: "#EADDAA",
                  fontFamily: "InterFace Trial-Bold",
                  fontWeight: "700",
                  fontSize: scale(12),
                }}
              >
                Show your Loyalty ID
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.infoText}>
          Min. Redeemable Amount:{" "}
          <Text style={styles.infoBoldText}>300 points</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PointsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: scale(16) },
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
  titleContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: {
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(24),
    color: "#747474",
  },
  spacer: { width: scale(36) },
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
});
