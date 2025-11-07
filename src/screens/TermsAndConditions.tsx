import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../assets/svg/BackArrow";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types";
import { scale } from "../utils/dimen";

type TermsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "TermsAndConditions"
>;

const TermsAndConditions = () => {
  const navigation = useNavigation<TermsScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("DrawerRoot", { screen: "Home" });
            }
          }}
        >
          <BackArrow />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Terms and Conditions</Text>
        </View>

        <View style={styles.spacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Sufra Rewards. By accessing or using our app, you agree to
          comply with and be bound by these Terms and Conditions.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of Service</Text>
        <Text style={styles.paragraph}>
          You agree not to misuse our app or help anyone else do so. Rewards,
          offers, and promotions are subject to availability and may be changed
          without notice.
        </Text>

        <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your data will be handled in accordance with our Privacy Policy.
          Please read it carefully to understand how we use your information.
        </Text>

        <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          We shall not be held liable for any indirect or consequential losses
          arising from the use of our services.
        </Text>

        <Text style={styles.sectionTitle}>5. Contact Us</Text>
        <Text style={styles.paragraph}>
          For questions about these Terms, please contact support@sufra.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
    paddingHorizontal: scale(16),
  },
  backButton: {
    padding: scale(4),
    marginRight: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontWeight: "700",
    fontSize: scale(24),
    color: "#747474",
  },
  spacer: { width: scale(36) },
  content: {
    padding: scale(16),
    gap: scale(12),
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: scale(18),
    color: "#017851",
  },
  paragraph: {
    fontSize: scale(16),
    color: "#52525B",
    lineHeight: scale(22),
  },
});
