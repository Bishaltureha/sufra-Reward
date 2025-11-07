import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
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

type UserAgreementsscreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MainStackParamList, "UserAgreements">,
  NativeStackNavigationProp<MainStackParamList>
>;

const UserAgreements = () => {
  const navigation = useNavigation<UserAgreementsscreenNavigationProp>();

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
          <Text style={styles.headerTitle}>User Agreements</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Terms of Use</Text>
        <Text style={styles.paragraph}>
          By using this app, you agree to our terms and conditions. We are
          committed to providing you with the best experience while ensuring
          your privacy and security.
        </Text>

        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We value your trust. Any data shared with us will only be used to
          enhance your experience and will never be shared with third parties
          without consent.
        </Text>

        <Text style={styles.sectionTitle}>Updates</Text>
        <Text style={styles.paragraph}>
          Our policies may change periodically. Please review this page to stay
          informed about updates to our user agreements.
        </Text>

        <Text style={styles.footerText}>Last Updated: November 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAgreements;

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
  contentContainer: {
    padding: scale(16),
    paddingBottom: scale(32),
  },
  sectionTitle: {
    fontFamily: "InterFace Trial-Bold",
    fontSize: scale(16),
    color: "#017851",
    marginBottom: scale(4),
  },
  paragraph: {
    fontFamily: "InterFace Trial-Regular",
    fontSize: scale(14),
    color: "#434343",
    lineHeight: scale(20),
    marginBottom: scale(16),
  },
  footerText: {
    fontFamily: "InterFace Trial-Regular",
    fontSize: scale(12),
    color: "#747474",
    textAlign: "center",
    marginTop: scale(8),
  },
});
