import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import {
  CompositeNavigationProp,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import { DrawerParamList, MainStackParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import GreenStar from "../../assets/svg/GreenStar";
import WhiteStar from "../../assets/svg/WhiteStar";
import Contact from "../../assets/svg/Contact";
import GamingConsole from "../../assets/svg/GamingConsole";
import TransactionHistory from "../../assets/svg/TransactionHistory";
import ProfileInformationLogo from "../../assets/svg/ProfileInformationLogo";
import ReferaFriends from "../../assets/svg/ReferaFriends";
import Favorites from "../../assets/svg/Favorites";
import PaymentMethods from "../../assets/svg/PaymentMethods";
import MyAddresses from "../../assets/svg/MyAddresses";
import PreviousOrders from "../../assets/svg/PreviousOrders";
import CustomerService from "../../assets/svg/CustomerService";
import Faq from "../../assets/svg/Faq";
import UserAgreements from "../../assets/svg/UserAgreements";
import Logout from "../../assets/svg/Logout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Drawerlogos from "../../assets/svg/Drawerlogos";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, "Profile">,
  NativeStackNavigationProp<MainStackParamList>
>;

// Menu Item Component
const MenuItem = ({ Icon, text, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <Icon />
      <Text style={styles.menuItemText}>{text}</Text>
    </View>
    <AntDesign name="right" size={10} color="#017851" />
  </TouchableOpacity>
);

// Divider Component
const MenuDivider = () => <View style={styles.menuDivider} />;

// Progress Segment Component
const ProgressSegment = ({
  filled,
  position,
}: {
  filled: boolean;
  position: "start" | "middle" | "end";
}) => {
  const getStyle = () => {
    if (position === "start")
      return filled
        ? styles.punchProgressStartingFilled
        : styles.punchProgressStartingUnfilled;
    if (position === "end")
      return filled
        ? styles.punchProgressEndFilled
        : styles.punchProgressEndUnfilled;
    return filled
      ? styles.punchProgressMiddleFilled
      : styles.punchProgressMiddleUnfilled;
  };
  return <View style={getStyle()} />;
};

// Punch Card Component
const PunchCard = ({ title, current, total, isCompleted }: any) => {
  const segments = Array.from({ length: total }, (_, i) => i < current);

  return (
    <View style={[styles.punchCard, isCompleted && styles.punchCardGreen]}>
      <View style={styles.punchCardHeader}>
        <Text
          style={
            isCompleted ? styles.punchCardTitleWhite : styles.punchCardTitle
          }
        >
          {title}
        </Text>
        <Text
          style={
            isCompleted
              ? styles.punchCardProgressWhite
              : styles.punchCardProgress
          }
        >
          {isCompleted ? "Completed" : `${current}/${total}`}
        </Text>
      </View>

      <View
        style={[
          styles.punchCardDivider,
          isCompleted && styles.punchCardDividerWhite,
        ]}
      />

      <View style={styles.punchProgessContainer}>
        {segments.map((filled, index) => {
          let position: "start" | "middle" | "end" = "middle";
          if (index === 0) position = "start";
          if (index === segments.length - 1) position = "end";
          return (
            <ProgressSegment key={index} filled={filled} position={position} />
          );
        })}
      </View>

      <Text
        style={
          isCompleted
            ? styles.punchCardDescriptionWhite
            : styles.punchCardDescription
        }
      >
        {isCompleted ? (
          <>
            You punch your menu card and you can order your free{" "}
            <Text style={styles.punchCardBoldWhite}>{title}</Text>.
          </>
        ) : (
          <>
            You need order{" "}
            <Text style={styles.punchCardBold}>{total - current}</Text> more{" "}
            <Text style={styles.punchCardBold}>{title}</Text> to earn free menu.
          </>
        )}
      </Text>

      <View
        style={isCompleted ? styles.punchCTAButtonWhite : styles.punchCTAButton}
      >
        <Text
          style={
            isCompleted
              ? styles.punchCTAButtonTextWhite
              : styles.punchCTAButtonText
          }
        >
          {isCompleted ? "Order Now" : "Get all punched & Earn Free Menu"}
        </Text>
        {isCompleted && <AntDesign name="right" size={8} color="#017851" />}
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const handleMenuItemPress = (itemText: string) => {
    console.log(`Pressed: ${itemText}`);
    // Navigate based on the item
    switch (itemText) {
      case "Transaction History":
        // navigation.navigate("TransactionHistory");
        break;
      case "Profile Information":
        // navigation.navigate("ProfileInformation");
        break;
      case "Refer a Friend":
        navigation.navigate("ReferAFriend");
        break;
      case "Favorites":
        navigation.navigate("MyFavorites");
        break;
      case "Payment Methods":
        navigation.navigate("MyPaymentMethods");
        break;
      case "My Addresses":
        navigation.navigate("MyAddresses");
        break;
      case "Previous Orders":
        navigation.navigate("MyOrders");
        break;
      case "Customer Service":
        navigation.navigate("GetHelp");
        break;
      case "FAQ":
        navigation.navigate("FAQ");
        break;
      case "User Agreements":
        // navigation.navigate("UserAgreements");
        break;
      case "Logout":
        navigation.reset({
          index: 0,
          routes: [{ name: "OnboardingStack" as any }],
        });

        // Handle logout
        break;
      default:
        break;
    }
  };
  const handlePunchCardPress = (card: any) => {
    console.log("Punch card pressed:", card);
    if (card.isCompleted) {
      // Navigate to order screen
      // navigation.navigate("Order");
    }
  };

  const handleNotificationPress = () => {
    console.log("Enable notifications");
    // Request notification permissions
  };

  const handleScratchCardPress = () => {
    console.log("Scratch card pressed");
    // navigation.navigate("ScratchCard");
  };

  const handleCheckBenefits = () => {
    console.log("Check benefits");
    navigation.navigate("Tiers");
  };
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

  const menuItems = [
    {
      Icon: TransactionHistory,
      text: "Transaction History",
      onPress: () => handleMenuItemPress("Transaction History"),
    },
    {
      Icon: ProfileInformationLogo,
      text: "Profile Information",
      onPress: () => handleMenuItemPress("Profile Information"),
    },
    {
      Icon: ReferaFriends,
      text: "Refer a Friend",
      onPress: () => handleMenuItemPress("Refer a Friend"),
    },
    { divider: true },
    {
      Icon: Favorites,
      text: "Favorites",
      onPress: () => handleMenuItemPress("Favorites"),
    },
    {
      Icon: PaymentMethods,
      text: "Payment Methods",
      onPress: () => handleMenuItemPress("Payment Methods"),
    },
    {
      Icon: MyAddresses,
      text: "My Addresses",
      onPress: () => handleMenuItemPress("My Addresses"),
    },
    {
      Icon: PreviousOrders,
      text: "Previous Orders",
      onPress: () => handleMenuItemPress("Previous Orders"),
    },
    { divider: true },
    {
      Icon: CustomerService,
      text: "Customer Service",
      onPress: () => handleMenuItemPress("Customer Service"),
    },
    { Icon: Faq, text: "FAQ", onPress: () => handleMenuItemPress("FAQ") },
    {
      Icon: UserAgreements,
      text: "User Agreements",
      onPress: () => handleMenuItemPress("User Agreements"),
    },
    {
      Icon: Logout,
      text: "Logout",
      onPress: () => handleMenuItemPress("Logout"),
    },
  ];

  const punchCards = [
    { title: "Kid's Menu", current: 4, total: 9, isCompleted: false },
    { title: "Kid's Menu", current: 9, total: 9, isCompleted: true },
    { title: "Kid's Menu", current: 4, total: 9, isCompleted: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={handleDrawerToggle}
        >
          <Drawerlogos />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {/* SUFRA Points Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>SUFRA Points</Text>
              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => {
                  navigation.navigate("PointsScreen");
                }}
              >
                <Text style={styles.historyButtonText}>
                  See Transaction History
                </Text>
                <AntDesign name="right" size={8} color="#EADDAA" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <Text style={styles.pointsValue}>
              32,010<Text style={styles.pointsSubtext}> = 1600.50 SAR</Text>
            </Text>
            <Text style={styles.minRedeemText}>
              Min. Redeemable Amount:{" "}
              <Text style={styles.minRedeemBold}>300 points</Text>
            </Text>
          </View>

          {/* STAR TIER Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>STAR TIER</Text>
              <View style={styles.starRow}>
                <GreenStar />
                <WhiteStar />
                <WhiteStar />
                <TouchableOpacity
                  style={styles.benefitsButton}
                  onPress={handleCheckBenefits}
                >
                  <Text style={styles.benefitsButtonText}>Check Benefits</Text>
                  <AntDesign name="right" size={8} color="#EADDAA" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.tierPointsRow}>
              <Text style={styles.tierPointsLabel}>Tier Points</Text>
              <Text style={styles.tierPointsValue}>
                46.921<Text style={styles.tierPointsTotal}>/60.000</Text>
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarFill} />
            </View>
            <Text style={styles.tierInfoText}>
              You need <Text style={styles.tierInfoBold}>13.079</Text> more tier
              points to reach the{" "}
              <Text style={styles.tierInfoBold}>Icon Tier</Text>.
            </Text>
          </View>

          <Text style={styles.punchCardsTitle}>PUNCH CARDS</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.punchCardsScroll}
          >
            {punchCards.map((card, index) => (
              <PunchCard key={index} {...card} />
            ))}
          </ScrollView>

          <View style={styles.notificationCard}>
            <View style={styles.notificationContent}>
              <Contact />
              <Text style={styles.notificationText}>
                Allow Notifications & Unlock Rewards
              </Text>
            </View>
            <AntDesign name="right" size={12} color="#017851" />
          </View>

          <View style={styles.scratchCard}>
            <GamingConsole />
            <Text style={styles.scratchCardText}>
              Scratch a Card & Earn Points
            </Text>
          </View>
        </View>

        <View style={styles.bottomMenuContainer}>
          {menuItems.map((item, index) =>
            item.divider ? (
              <MenuDivider key={`divider-${index}`} />
            ) : (
              <MenuItem
                key={index}
                Icon={item.Icon}
                text={item.text}
                onPress={item.onPress}
              />
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
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
  titleContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  headerTitle: {
    fontFamily: "SF Pro Display",
    fontWeight: "700",
    fontSize: scale(20),
    color: "#017851",
    textAlign: "center",
  },
  spacer: { width: scale(36) },
  cardsContainer: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    gap: scale(16),
  },
  card: {
    backgroundColor: "#F1EDE5",
    padding: scale(12),
    gap: scale(8),
    borderRadius: scale(16),
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
    color: "#017851",
  },
  historyButton: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(8),
    backgroundColor: "#D86642",
    borderRadius: scale(28),
    gap: scale(4),
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(-5),
  },
  historyButtonText: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(10),
    color: "#EADDAA",
  },
  divider: { borderWidth: 1, borderColor: "#D866421A", borderStyle: "solid" },
  pointsValue: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(32),
    color: "#017851",
  },
  pointsSubtext: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(16),
    color: "#43434366",
  },
  minRedeemText: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(12),
    color: "#017851",
  },
  minRedeemBold: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
    color: "#017851",
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(3),
    marginTop: scale(-5),
  },
  benefitsButton: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(8),
    backgroundColor: "#D86642",
    borderRadius: scale(28),
    gap: scale(4),
    flexDirection: "row",
    alignItems: "center",
    marginStart: scale(5),
  },
  benefitsButtonText: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(10),
    color: "#EADDAA",
  },
  tierPointsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  tierPointsLabel: {
    color: "#747474",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(14),
  },
  tierPointsValue: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(20),
    color: "#017851",
  },
  tierPointsTotal: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
    color: "#747474",
  },
  progressBarContainer: {
    width: "100%",
    height: scale(12),
    borderRadius: scale(32),
    backgroundColor: "#EADDAA",
    overflow: "hidden",
  },
  progressBarFill: {
    width: scale(92),
    height: "100%",
    borderRadius: scale(32),
    backgroundColor: "#017851",
  },
  tierInfoText: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(12),
    color: "#017851",
  },
  tierInfoBold: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
    color: "#017851",
  },
  punchCardsTitle: {
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    color: "#017851",
  },
  punchCardsScroll: { gap: scale(8), paddingRight: scale(16) },
  punchCard: {
    width: scale(220),
    borderRadius: scale(16),
    padding: scale(12),
    backgroundColor: "#F1EDE5",
    gap: scale(12),
  },
  punchCardGreen: { backgroundColor: "#017851" },
  punchCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  punchCardTitle: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(18),
    color: "#017851",
  },
  punchCardTitleWhite: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(18),
    color: "#EADDAA",
  },
  punchCardProgress: {
    color: "#43434366",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(16),
  },
  punchCardProgressWhite: {
    color: "#EADDAA",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(16),
  },
  punchCardDescription: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(12),
    color: "#017851",
  },
  punchCardDescriptionWhite: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(12),
    color: "#ffffff",
  },
  punchCardBold: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
    color: "#017851",
  },
  punchCardBoldWhite: {
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(12),
    color: "#ffffff",
  },
  notificationCard: {
    backgroundColor: "#F1EDE5",
    justifyContent: "space-between",
    padding: scale(12),
    borderRadius: scale(16),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  notificationContent: {
    gap: scale(8),
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  notificationText: {
    color: "#017851",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    flexShrink: 1,
  },
  scratchCard: {
    backgroundColor: "#D86642",
    justifyContent: "flex-start",
    padding: scale(12),
    borderRadius: scale(16),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  scratchCardText: {
    color: "#F1EDE5",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(14),
  },
  punchCardDivider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D866421A",
    borderStyle: "solid",
  },
  punchCardDividerWhite: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFFFFF1A",
    borderStyle: "solid",
  },
  punchProgessContainer: {
    flexDirection: "row",
    gap: scale(2),
    justifyContent: "flex-start",
    alignItems: "center",
  },
  punchProgressStartingFilled: {
    backgroundColor: "#017851",
    width: scale(20),
    height: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(2),
    borderBottomRightRadius: scale(2),
    borderBottomLeftRadius: scale(12),
  },
  punchProgressStartingUnfilled: {
    backgroundColor: "#EADDAA",
    width: scale(20),
    height: scale(12),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(2),
    borderBottomRightRadius: scale(2),
    borderBottomLeftRadius: scale(12),
  },
  punchProgressMiddleFilled: {
    width: scale(20),
    height: scale(12),
    borderRadius: scale(2),
    backgroundColor: "#017851",
  },
  punchProgressMiddleUnfilled: {
    width: scale(20),
    height: scale(12),
    borderRadius: scale(2),
    backgroundColor: "#EADDAA",
  },
  punchProgressEndFilled: {
    width: scale(20),
    height: scale(12),
    backgroundColor: "#017851",
    borderTopLeftRadius: scale(2),
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(12),
    borderBottomLeftRadius: scale(2),
  },
  punchProgressEndUnfilled: {
    width: scale(20),
    height: scale(12),
    backgroundColor: "#EADDAA",
    borderTopLeftRadius: scale(2),
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(12),
    borderBottomLeftRadius: scale(2),
  },
  punchCTAButton: {
    backgroundColor: "#D86642",
    width: "100%",
    borderRadius: scale(12),
    padding: scale(8),
  },
  punchCTAButtonWhite: {
    backgroundColor: "#EADDAA",
    borderRadius: 28,
    padding: scale(8),
    gap: scale(4),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  punchCTAButtonText: {
    color: "#EADDAA",
    fontFamily: "Rubik",
    fontWeight: "500",
    fontSize: scale(10),
  },
  punchCTAButtonTextWhite: {
    color: "#017851",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(10),
  },
  bottomMenuContainer: { padding: scale(16), gap: scale(24) },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  menuItemContent: {
    gap: scale(8),
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(18),
    color: "#017851",
  },
  menuDivider: { borderColor: "#ECECEC", borderStyle: "solid", borderWidth: 1 },
});
