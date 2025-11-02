import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type GetHelpScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "GetHelp"
>;

const GetHelpScreen = () => {
  const navigation = useNavigation<GetHelpScreenNavigationProp>();

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

  const handleCall = () => {
    Linking.openURL("tel:8002492222").catch((err) =>
      console.error("Failed to open dialer:", err)
    );
  };

  const handleReportProblem = () => {
    // Navigate to report problem web form
    Linking.openURL("https://table.alfaco.com.sa/sufra-form/").catch((err) =>
      console.error("Failed to open report form:", err)
    );
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
          <Text style={styles.headerTitle}>Get Help</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem} onPress={handleCall}>
          <Text style={styles.menuText}>Call 800 249 2222</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={scale(24)}
            color="#017851"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleReportProblem}>
          <Text style={styles.menuText}>Report a problem</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={scale(24)}
            color="#017851"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetHelpScreen;

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
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    backgroundColor: "#fff",
  },
  menuText: {
    fontFamily: "Rubik-Regular",
    fontSize: scale(16),
    color: "#017851",
  },
});
