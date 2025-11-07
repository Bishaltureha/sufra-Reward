import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../assets/svg/BackArrow";
import {
  CompositeNavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { MainStackParamList } from "../types";
import { scale } from "../utils/dimen";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/slice/user";
import { countries } from "../utils/countries";
import Entypo from "@expo/vector-icons/Entypo";

type ProfileInformationscreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MainStackParamList, "ProfileInformation">,
  NativeStackNavigationProp<MainStackParamList>
>;

const ProfileInformation = () => {
  const navigation = useNavigation<ProfileInformationscreenNavigationProp>();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<MainStackParamList, "ProfileInformation">>();
  const data = route.params || {};
  const fromExtra = data.fromExtra ?? false;

  // ✅ Redux persisted user data
  const user = useAppSelector((state) => state.user.data);

  // ✅ Format phone using existing countries[] data
  const getPhoneDetails = (phone?: string) => {
    if (!phone) return { flag: "", formatted: "Not provided" };

    const country = countries.find((c) => phone.startsWith(c.dial_code));
    if (!country) return { flag: "", formatted: phone };

    const flag = country.emoji ?? "";
    const format = country.phoneFormat?.pattern ?? "xxx xxx xxxx";

    const digits = phone.replace(country.dial_code, "").replace(/\D/g, "");
    let formatted = "";
    let i = 0;
    for (const char of format) {
      formatted += char === "x" ? digits[i++] ?? "" : char;
    }

    return { flag, formatted: `${country.dial_code} ${formatted.trim()}` };
  };

  const phoneDetails = getPhoneDetails(user?.phone);

  const handleDeleteProfile = () => {
    // Uncomment when ready
    // Alert.alert("Delete Profile", "Are you sure?", [
    //   { text: "Cancel", style: "cancel" },
    //   {
    //     text: "Yes, Delete",
    //     style: "destructive",
    //     onPress: () => {
    //       dispatch(logout());
    //       navigation.replace("AuthStack", { screen: "Login" });
    //     },
    //   },
    // ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.navigate("DrawerRoot", { screen: "Profile" })
          }
        >
          <BackArrow />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Profile Information</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Profile Info */}
      <View style={styles.contentContainer}>
        {/* Basic Info */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>
            {user?.name ? user.name : "Not provided"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>
            {user?.email ? user.email : "Not provided"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoValue}>
            {phoneDetails.flag} {phoneDetails.formatted}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Conditional Rendering */}
        {fromExtra ? (
          <View style={styles.additionalContainer}>
            {/* Header Row */}
            <View style={styles.additionalHeaderRow}>
              <Text style={styles.additionalTitle}>ADDITIONAL INFORMATION</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate("ExtraInformation")}
              >
                <Text style={styles.editButtonText}>Edit</Text>
                <Entypo name="chevron-small-right" size={18} color="#EADDAA" />
              </TouchableOpacity>
            </View>

            {/* Display Data */}
            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Birth Date</Text>
              <Text style={styles.sectionValue}>
                {data?.birthDate || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Gender</Text>
              <Text style={styles.sectionValue}>
                {data?.gender || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Nationality</Text>
              <Text style={styles.sectionValue}>
                {data?.nationality || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>
                Preferred Channels of Communication
              </Text>
              <Text style={styles.sectionValue}>
                {data?.preferredChannels?.join(", ") || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Favorite Cuisines</Text>
              <Text style={styles.sectionValue}>
                {data?.favoriteCuisines?.join(", ") || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionLabel}>Allergens</Text>
              <Text style={styles.sectionValue}>
                {data?.allergens?.join(", ") || "Not provided"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.completeProfileCard}>
            <Text style={styles.completeProfileTitle}>
              Add extra personal {"\n"}info and earn points!
            </Text>
            <Text style={styles.completeProfileDescription}>
              Ullamco dolore veniam dolor cillum qui aliqua id nisi. Deserunt
              dolore veniam amet laboris sit.
            </Text>
            <TouchableOpacity
              style={styles.completeProfileButton}
              onPress={() => navigation.navigate("ExtraInformation")}
            >
              <Text style={styles.completeProfileButtonText}>
                COMPLETE PROFILE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteProfile}
        >
          <Text style={styles.deleteButtonText}>Delete My Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileInformation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    backgroundColor: "#ffffff",
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
  titleContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontWeight: "700", fontSize: scale(24), color: "#747474" },
  spacer: { width: scale(36) },

  contentContainer: { padding: scale(16), gap: scale(12), flex: 1 },
  infoRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: { color: "#017851", fontWeight: "400", fontSize: scale(18) },
  infoValue: {
    color: "#A1A1AA",
    fontWeight: "400",
    fontSize: scale(18),
    textAlign: "right",
  },
  divider: { borderWidth: scale(1), borderColor: "#E4E4E7", width: "100%" },

  additionalContainer: {
    width: "100%",
    gap: scale(12),
    marginTop: scale(15),
  },
  additionalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  additionalTitle: {
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
    color: "#747474",
  },
  editButton: {
    borderRadius: scale(40),
    gap: scale(4),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: "#D86642",
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(14),
    color: "#EADDAA",
  },

  infoBlock: { gap: scale(4) },
  sectionLabel: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(18),
    color: "#017851",
  },
  sectionValue: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(18),
    color: "#A1A1AA",
  },

  completeProfileCard: {
    backgroundColor: "#F1EDE5",
    padding: scale(16),
    gap: scale(16),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(15),
  },
  completeProfileTitle: {
    color: "#017851",
    fontWeight: "500",
    fontSize: scale(20),
    textAlign: "center",
    textTransform: "uppercase",
  },
  completeProfileDescription: {
    color: "#52525B",
    fontWeight: "400",
    fontSize: scale(15),
    textAlign: "center",
  },
  completeProfileButton: {
    backgroundColor: "#D86642",
    paddingVertical: scale(15),
    paddingHorizontal: scale(16),
    borderRadius: scale(100),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 8,
  },
  completeProfileButtonText: {
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
    color: "#ffffff",
  },

  footer: {
    backgroundColor: "#ffffff",
    padding: scale(24),
    gap: scale(20),
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  deleteButton: {
    borderWidth: scale(1),
    borderColor: "#E05648",
    borderRadius: scale(13),
    paddingVertical: scale(14),
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#E05648",
    fontWeight: "500",
    fontSize: scale(14),
    textAlign: "center",
    letterSpacing: -0.3,
  },
});
