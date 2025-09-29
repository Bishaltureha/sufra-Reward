import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons"; // or react-native-vector-icons/Ionicons

type Props = {};

const NotificationScreen = (props: Props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="#D86642" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text>NotificationScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 0,
    color: "#D86642",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
