import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type ProfileScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Profile"
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

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
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#fff" }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={handleDrawerToggle}
          >
            <Drawerlogo />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
          <View style={styles.spacer} />
        </View>
        <View
          style={{
            height: Platform.OS === "android" ? 0 : 0,
            backgroundColor: "rgba(0,0,0,1)",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
  spacer: {
    width: scale(36),
  },
});
