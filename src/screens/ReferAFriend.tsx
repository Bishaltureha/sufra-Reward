import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from "react-native";
import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";

import Share from "react-native-share";
import * as Asset from "expo-asset";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../assets/svg/BackArrow";
import { scale } from "../utils/dimen";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { MainStackParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Sms from "../../assets/svg/Sms";
import WhatsApp from "../../assets/svg/WhatsApp";
import FaceBook from "../../assets/svg/FaceBook";
import Instagram from "../../assets/svg/Instagram";
import X from "../../assets/svg/X";
import Other from "../../assets/svg/Other";

type ReferAFriendscreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MainStackParamList, "ReferAFriend">,
  NativeStackNavigationProp<MainStackParamList>
>;

interface ShareOption {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

const ReferAFriend = () => {
  const navigation = useNavigation<ReferAFriendscreenNavigationProp>();
  const referralCode = "12890";
  const truncatedCode = referralCode.slice(0, 2) + "...";
  const fullReferralUrl = `https://sufrarewards.com/${referralCode}`;
  const shareMessage = `Join Sufra Rewards and earn points! Use my referral code: ${referralCode}\n${fullReferralUrl}`;

  const handleCopy = async () => {
    try {
      await Clipboard.setString(fullReferralUrl);
      Alert.alert("Success", "Referral link copied to clipboard!");
    } catch (error) {
      Alert.alert("Error", "Failed to copy referral link");
    }
  };

  const handleSMS = async () => {
    try {
      const separator = Platform.OS === "ios" ? "&" : "?";
      const url = `sms:${separator}body=${encodeURIComponent(shareMessage)}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "SMS app not available");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open SMS app");
    }
  };

  const handleWhatsApp = async () => {
    try {
      const url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "WhatsApp Not Installed",
          "Please install WhatsApp to share via this platform"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open WhatsApp");
    }
  };

  const handleFacebook = async () => {
    try {
      // Facebook sharing requires Facebook SDK for proper implementation
      // Using web URL as fallback
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        fullReferralUrl
      )}`;
      const fbUrl = `fb://facewebmodal/f?href=${encodeURIComponent(url)}`;

      const canOpen = await Linking.canOpenURL(fbUrl);
      if (canOpen) {
        await Linking.openURL(fbUrl);
      } else {
        // Fallback to web browser
        await Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open Facebook");
    }
  };

 const handleInstagram = async () => {
  try {
    const asset = Asset.Asset.fromModule(require("../../assets/image/logo.png"));
    await asset.downloadAsync();

    const shareOptions = {
      backgroundBottomColor: "#017851",
      backgroundTopColor: "#F1EDE5",
      stickerImage: asset.localUri,
      attributionURL: fullReferralUrl,
      social: Share.Social.INSTAGRAM_STORIES,
      appId: "com.sufrarewards",
    } as any;

    await Share.shareSingle(shareOptions);
  } catch (error) {
    console.log("Instagram share error:", error);
    Alert.alert("Error", "Failed to share to Instagram story.");
  }
};




  const handleTwitter = async () => {
    try {
      const tweetText = encodeURIComponent(shareMessage);
      const url = `twitter://post?message=${tweetText}`;
      const webUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Fallback to web browser
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open Twitter/X");
    }
  };

  const handleOtherShare = async () => {
    try {
      await Share.open({
        message: shareMessage,
        url: fullReferralUrl,
      });
    } catch (error) {
      console.log("Share cancelled or error:", error);
    }
  };

  const shareOptions: ShareOption[] = [
    {
      icon: <Sms />,
      label: "SMS",
      onPress: handleSMS,
    },
    {
      icon: <WhatsApp />,
      label: "WhatsApp",
      onPress: handleWhatsApp,
    },
    {
      icon: <FaceBook />,
      label: "Facebook",
      onPress: handleFacebook,
    },
    {
      icon: <Instagram />,
      label: "Instagram",
      onPress: handleInstagram,
    },
    {
      icon: <X />,
      label: "X (Twitter)",
      onPress: handleTwitter,
    },
    {
      icon: <Other />,
      label: "Other...",
      onPress: handleOtherShare,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Refer a Friend</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.referralCard}>
          <Text style={styles.referralTitle}>
            Invite any of your friend and earn 300 points!
          </Text>
          <Text style={styles.referralDescription}>
            Ullamco dolore veniam dolor cillum qui aliqua id nisi. Deserunt
            dolore veniam amet laboris sit. Deserunt anim incididunt ullamco ea
            aliqua proident ad dolore aute.
          </Text>
          <View style={styles.referralCodeContainer}>
            <Text style={styles.referralCodeLabel}>Referral Code</Text>
            <View style={styles.codeInputRow}>
              <View style={styles.codeInputWrapper}>
                <Text style={styles.codeText}>
                  https://sufrarewards.com/{truncatedCode}
                </Text>
              </View>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
                <Text style={styles.copyButtonText}>COPY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.shareContainer}>
          <Text style={styles.shareTitle}>SHARE VIA</Text>
          <View style={styles.shareOptionsGrid}>
            {shareOptions.map((option, index) => (
              <View
                key={index}
                style={[
                  styles.shareOptionWrapper,
                  (index + 1) % 3 !== 0 && styles.shareOptionMarginRight,
                  index < 3 && styles.shareOptionMarginBottom,
                ]}
              >
                <TouchableOpacity
                  style={styles.shareOption}
                  onPress={option.onPress}
                  activeOpacity={0.7}
                >
                  {option.icon}
                  <Text style={styles.shareOptionLabel}>{option.label}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferAFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
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
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(24),
    color: "#747474",
  },
  spacer: {
    width: scale(36),
  },
  contentContainer: {
    paddingTop: scale(16),
  },
  referralCard: {
    backgroundColor: "#F1EDE5",
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(24),
  },
  referralTitle: {
    color: "#017851",
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(20),
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: scale(16),
  },
  referralDescription: {
    color: "#52525B",
    fontFamily: "InterFace Trial-Regular",
    fontWeight: "400",
    fontSize: scale(15),
    textAlign: "center",
    marginBottom: scale(16),
  },
  referralCodeContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  referralCodeLabel: {
    color: "#4C4E5180",
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(14),
  },
  codeInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  codeInputWrapper: {
    paddingVertical: scale(12),
    borderBottomColor: "#4C4E5180",
    borderBottomWidth: scale(2),
  },
  codeText: {
    color: "#4C4E5180",
    fontFamily: "InterFace Trial",
    fontWeight: "700",
    fontSize: scale(16),
  },
  copyButton: {
    backgroundColor: "#D86642",
    paddingVertical: scale(15),
    paddingHorizontal: scale(16),
    borderRadius: scale(100),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 8,
  },
  copyButtonText: {
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  shareContainer: {
    alignItems: "center",
  },
  shareTitle: {
    textAlign: "center",
    color: "#017851",
    fontFamily: "Sackers Gothic Std",
    fontWeight: "500",
    fontSize: scale(16),
    textTransform: "uppercase",
    marginBottom: scale(24),
  },
  shareOptionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  shareOptionWrapper: {
    width: "33.33%",
    alignItems: "center",
  },
  shareOptionMarginRight: {
    marginRight: 0,
  },
  shareOptionMarginBottom: {
    marginBottom: scale(32),
  },
  shareOption: {
    justifyContent: "center",
    alignItems: "center",
  },
  shareOptionLabel: {
    color: "#525252",
    fontFamily: "InterFace Trial-Bold",
    fontWeight: "700",
    fontSize: scale(14),
    marginTop: scale(12),
  },
});
