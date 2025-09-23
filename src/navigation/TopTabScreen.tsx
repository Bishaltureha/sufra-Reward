import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBox from "../components/HeaderBox";
import DeliveryContent from "../screens/DeliveryContent";
import DineInContent from "../screens/DineInContent";
import { scale } from "../utils/dimen";
import { useRoute, RouteProp } from "@react-navigation/native";

type TopTabParamList = {
  screen?: "Delivery" | "DineIn";
};

const TopTabScreen = () => {
  const route = useRoute<RouteProp<{ params: TopTabParamList }, "params">>();

  // default "Delivery", ya Drawer se aaya hua param
  const [activeTab, setActiveTab] = useState<"Delivery" | "DineIn">(
    route.params?.screen || "Delivery"
  );

  useEffect(() => {
    if (route.params?.screen) {
      setActiveTab(route.params.screen);
    }
  }, [route.params?.screen]);

  const handleTabPress = (tabName: "Delivery" | "DineIn") => {
    setActiveTab(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBox />
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Delivery" && styles.activeTab,
          ]}
          onPress={() => handleTabPress("Delivery")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Delivery" && styles.activeText,
            ]}
          >
            Delivery & Pickup
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "DineIn" && styles.activeTab]}
          onPress={() => handleTabPress("DineIn")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "DineIn" && styles.activeText,
            ]}
          >
            Dine-in
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === "Delivery" ? <DeliveryContent /> : <DineInContent />}
      </View>
    </SafeAreaView>
  );
};

export default TopTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  tabText: {
    fontSize: scale(16),
    color: "#6D6D6D",
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#F6B01F",
  },
  activeText: {
    color: "#4A4A4A",
    fontSize: scale(17),
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 18,
    fontWeight: "500",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
});
