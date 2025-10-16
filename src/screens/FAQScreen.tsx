import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type FAQScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "FAQ">;

interface SubSection {
  title: string;
  content: string;
}

interface FAQItem {
  question: string;
  answer: string;
  subSections?: SubSection[];
}

const FAQScreen = () => {
  const navigation = useNavigation<FAQScreenNavigationProp>();

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

  const faqData: FAQItem[] = [
    {
      question: "What is Sufra Rewards Program?",
      answer:
        "Sufra Rewards Program is a unified loyalty program for customers of the Alfa Co. restaurant group, encompassing multiple casual, fast casual and virtual restaurant brands. With key features such as point accumulation and redemption, tiered benefits, personalization, and digital integration to better track and manage accounts, Sufra is designed to provide a more rewarding experience to its members.",
    },
    {
      question: "How do I join Sufra Rewards?",
      answer:
        "Joining is easy! Simply download the Sufra app from Google Play or Appstore and sign up. Registration is quick, and you can start earning points and enjoy benefits and privileges immediately after joining.",
      subSections: [
        {
          title: "Joining on the Sufra Mobile App - ",
          content:
            "First download the app from the app store or scan a QR code at the restaurant. Then register by providing your personal details. Agree to the Terms and Conditions, including receiving marketing communications and you will receive a One Time Password (OTP), which you need to enter to finalize your registration.",
        },
        {
          title: "Joining on the Sufra Website - ",
          content: `Visit the Sufra website sufra.sa and register by clicking the "sign up" button. Provide your personal details. Agree to the Terms and Conditions, including receiving marketing communications and you will receive an OTP, which you need to enter to finalize your registration.`,
        },
      ],
    },
    {
      question: "Is Sufra Rewards the same as the Alfa Co Rewards Program?",
      answer:
        "The Sufra Rewards Program, with its enhanced capabilities and broader range of benefits, replaces the Alfa Co Rewards Program. This transition aims to provide our devoted customers with an enhanced and more satisfying experience.",
    },
    {
      question:
        "What are the advantages of the Sufra Rewards Program over the Alfa Co Rewards Program?",
      answer:
        "The Sufra Rewards Program offers several key advantages compared to the Alfa Co Rewards Program. Firstly, it includes a wider variety of participating restaurant brands, enhancing the dining options for members. Additionally, members can now earn and redeem points not only for dine-in but also for pick up and delivery transactions, providing greater flexibility. The program also boasts a broader range of benefits and a more dynamic and user-friendly app, among other enhancements, making it a more comprehensive and rewarding loyalty program for members.",
    },
    {
      question:
        "I am a member of Alfa Co Rewards. What will happen to my points with the introduction of Sufra Rewards?",
      answer:
        "All your accumulated points in the Alfa Co Rewards program will seamlessly transition to the Sufra Rewards Program. You will retain all the points you have earned, which will be accessible through the Sufra App, ensuring a smooth and beneficial switch to the new rewards system. All you have to do is download the Sufra App and register using the same phone number used in Alfa Co Rewards. ",
    },
    {
      question: "How does the Sufra Rewards Program work?",
      answer:
        "Sufra members can earn and redeem points with every dine-in, pick up or delivery purchase at any of the participating restaurants of Sufra. However, points cannot be earned or redeemed on purchases made through Sufra restaurants' delivery partners.\n \nYou earn 1 loyalty point for every 1 SAR purchase (VAT excluded). For every 300 loyalty points you earn, you can redeem them for 15 SAR worth of purchases.\n \nSufra also extends many exclusive benefits and privileges on top of the points earned by its members.",
    },
    {
      question:
        "Can I earn and redeem points at all restaurant brands under Sufra?",
      answer:
        "Absolutely! Our loyalty program is designed to be used across all of our restaurant brands such as Steak House, Piatto, FireGrill, City Fresh Kitchen, Steak House Burgers, Earth Bowlz, Curry Club, Uncle Moe's and Wings & Things.",
    },
    {
      question: "How do I check my points balance?",
      answer:
        "You can view your points balance at any time through the Sufra app or by logging into your account on our website.",
    },
    {
      question: "What can I redeem my points for?",
      answer:
        "Points can be redeemed towards online or offline F&B purchases across Sufra restaurants!\n \nFor every 300 loyalty points you earn, you can redeem them for 15 SAR worth of purchases.\n \nPoints earnings and redemptions are not valid on purchases made with Sufra restaurants' delivery aggregators.",
    },
    {
      question: "What is the minimum number of points I can redeem per visit?",
      answer:
        "The minimum number of points you can redeem for each visit is 300.",
    },
    {
      question: "Do my points expire?",
      answer: "Points expire 12 months after issuance.",
    },
    {
      question: "Are there any tiers or levels in the Sufra Rewards Program?",
      answer:
        "Yes, Sufra has the Star, Icon and Legend tiers that offer increasingly exciting benefits. Upon registration, you are awarded Star Tier status. Accruing more tier points makes you eligible for promotion to the higher Icon and Legend tiers. The more points you earn, the higher your tier and the better the rewards!",
    },
    {
      question: "How can I find out about special promotions?",
      answer:
        "To ensure that you stay informed about all our latest promotions and updates, please remember to give your consent for email and SMS communications. Additionally, we recommend opting in for push notifications in our app. This way, you won't miss out on any exciting offers and important news!",
    },
    {
      question:
        "Who can I contact if I have questions about my account or points?",
      answer:
        "Our customer service team is always here to help. For assistance, contact us through the app, website, or by calling our dedicated support line at 800 249 2222 or email us at info@sufra.sa",
    },
    {
      question:
        "Can I earn points when I order online or through the Sufra app?",
      answer:
        "Yes, you earn points for all qualifying purchases made through our online ordering system or the Sufra app, as well as in-person at our restaurants. However, you cannot earn points on purchases made with Sufra restaurants' delivery aggregators.",
    },
    {
      question: "Can I transfer points to another member?",
      answer: "Points are not transferable between members.",
    },
    {
      question: "How will I know when I've reached a new tier?",
      answer:
        "You'll receive a notification via the app or email celebrating your new tier status along with information on the new benefits you've unlocked.",
    },
    {
      question:
        "Are there any costs associated with joining the Sufra Rewards Program?",
      answer:
        "Joining the Sufra Rewards Program is completely free. There are no membership fees or hidden costs.",
    },
    {
      question: "Can I earn points during special promotions?",
      answer:
        "Yes, and you can even earn bonus points during certain special promotions. Details of these offers will be communicated through app and other communication channels.",
    },
    {
      question:
        "What should I do if I suspect an unauthorized transaction on my account?",
      answer:
        "If you notice any suspicious activity, please contact our customer service immediately at 800 249 2222 or email us at info@sufra.sa so we can secure your account and investigate the issue.",
    },
    {
      question:
        "How can i give feedback about my experience with Sufra Rewards?",
      answer:
        "We love hearing from our memebers! You can give feedback directly through the app, on our website, or by contacting customer service",
    },
  ];

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
          <Text style={styles.headerTitle}>FAQ</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {faqData.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>Q: {faq.question}</Text>
            <Text style={styles.answer}>A: {faq.answer}</Text>

            {faq.subSections &&
              faq.subSections.map((subSection, subIndex) => (
                <View key={subIndex} style={styles.subSection}>
                  <Text style={styles.question}>
                    {subSection.title}
                    <Text style={styles.subContent}>{subSection.content}</Text>
                  </Text>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;

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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: scale(16),
    paddingBottom: scale(32),
  },
  faqItem: {
    marginBottom: scale(24),
  },
  question: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#2C2C2C",
    marginBottom: scale(8),
    lineHeight: scale(22),
  },
  answer: {
    fontFamily: "Rubik-Regular",
    fontSize: scale(14),
    color: "#666666",
    lineHeight: scale(20),
  },
  subSection: {
    marginTop: scale(12),
  },
  subTitle: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    color: "#4A4A4A",
    marginBottom: scale(6),
    lineHeight: scale(20),
  },
  subContent: {
    fontFamily: "Rubik-Regular",
    fontSize: scale(14),
    color: "#666666",
    lineHeight: scale(20),
  },
});
