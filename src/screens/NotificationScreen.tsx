import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

type IconName =
  | "card-giftcard"
  | "local-offer"
  | "celebration"
  | "notifications";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: IconName;
  isRead?: boolean;
};

type Props = {};

const NotificationScreen = (props: Props) => {
  const navigation = useNavigation();

  const [notifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Your Tier Points Are Expiring Soon",
      description:
        "Your 3,000 tier points will never in 3 months on 2025-11-01",
      timestamp: "2d ago",
      icon: "card-giftcard",
      isRead: false,
    },
    {
      id: "2",
      title: "Forgot Something Delicious 🍛",
      description:
        "You left a Curry Club order worth 48.30 SAR in your cart. Order now and save 8% tier points!",
      timestamp: "1w ago",
      icon: "local-offer",
      isRead: false,
    },
    {
      id: "3",
      title: "Welcome to Sufra Rewards 🎊",
      description:
        "Thanks for registering with Sufra Reward Start exploring your perks in the app soon 🎁",
      timestamp: "2w ago",
      icon: "celebration",
      isRead: true,
    },
    {
      id: "4",
      title: "تفعيل احتسابك 🎁",
      description:
        "جديد: استمتع الآن بـ Sufra Points Transaction: Accumulated Points ستجعل في حسابك",
      timestamp: "3w ago",
      icon: "card-giftcard",
      isRead: true,
    },
    {
      id: "5",
      title: "تفعيل احتسابك 🎁",
      description:
        "جديد: استمتع الآن بـ Sufra Points Transaction: Accumulated Points ستجعل في حسابك",
      timestamp: "3w ago",
      icon: "card-giftcard",
      isRead: true,
    },
    {
      id: "6",
      title: "Happy Saturday! 🎉",
      description:
        "You've earned some Sufra points. Keep enjoying and keep earning on every visit.",
      timestamp: "1M ago",
      icon: "celebration",
      isRead: true,
    },
    {
      id: "7",
      title: "Happy Friday! 🎉",
      description:
        "You've earned some Sufra points. Keep enjoying and keep earning on every visit.",
      timestamp: "1M ago",
      icon: "celebration",
      isRead: true,
    },
    {
      id: "8",
      title: "Happy Friday! 🎉",
      description:
        "You've earned some Sufra points. Keep enjoying and keep earning on every visit.",
      timestamp: "1M ago",
      icon: "celebration",
      isRead: true,
    },
    {
      id: "9",
      title: "Happy Friday! 🎉",
      description:
        "You've earned some Sufra points. Keep enjoying and keep earning on every visit.",
      timestamp: "1M ago",
      icon: "celebration",
      isRead: true,
    },
  ]);

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={item.icon} size={24} color="#D86642" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

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

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: 18,
    color: "#D86642",
  },
  listContent: {
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff5f2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  notificationTitle: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: 14,
    color: "#222",
    marginBottom: 4,
  },
  notificationDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 6,
  },
  timestamp: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#999",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D86642",
    marginTop: 6,
  },
});
