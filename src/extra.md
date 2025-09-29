import {
Animated,
Dimensions,
FlatList,
ScrollView,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View,
KeyboardAvoidingView,
Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import {
CompositeNavigationProp,
DrawerActions,
useNavigation,
} from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList, GiftCardStackParamList } from "../types";
import GiftCard1 from "../../assets/svg/giftCards/GiftCard1";
import GiftCard2 from "../../assets/svg/giftCards/GiftCard2";
import GiftCard3 from "../../assets/svg/giftCards/GiftCard3";
import GiftCard4 from "../../assets/svg/giftCards/GiftCard4";
import GiftCard5 from "../../assets/svg/giftCards/GiftCard5";
import CustomCheckbox from "../components/CustomCheckbox";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width \* 0.7;
const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

type GiftCardsScreenNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<GiftCardStackParamList, "GiftCardsMain">,
DrawerNavigationProp<DrawerParamList>

> ;

const GiftCardsScreen = () => {
const navigation = useNavigation<GiftCardsScreenNavigationProp>();
const scrollX = useRef(new Animated.Value(0)).current;
const flatListRef = useRef<FlatList>(null);

// Carousel / selection states
const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(0);

// Gift amount
const amounts = ["100", "250", "500", "1000", "1500"];
const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

// Form states
const [isBuyingForMyself, setIsBuyingForMyself] = useState(true);
const [recipientName, setRecipientName] = useState("");
const [recipientEmail, setRecipientEmail] = useState("");
const [verifyRecipientEmail, setVerifyRecipientEmail] = useState("");
const [recipientPhone, setRecipientPhone] = useState("");
const [senderName, setSenderName] = useState("");
const [senderEmail, setSenderEmail] = useState("");
const [senderPhone, setSenderPhone] = useState("");
const [personalNote, setPersonalNote] = useState("");

const isValidEmail = (email: string) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
};
const isFormValid =
recipientName &&
recipientEmail &&
verifyRecipientEmail &&
recipientEmail === verifyRecipientEmail &&
isValidEmail(recipientEmail) &&
recipientPhone &&
senderName &&
senderEmail &&
isValidEmail(senderEmail) &&
senderPhone &&
selectedAmount;

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

const realCards = [
{ key: "1", comp: GiftCard2 },
{ key: "2", comp: GiftCard2 },
{ key: "3", comp: GiftCard3 },
{ key: "4", comp: GiftCard4 },
{ key: "5", comp: GiftCard5 },
{ key: "6", comp: GiftCard5 },
{ key: "7", comp: GiftCard4 },
{ key: "8", comp: GiftCard3 },
{ key: "9", comp: GiftCard2 },
{ key: "10", comp: GiftCard5 },
];

const giftCards = [
{ key: "left-spacer" },
...realCards,
{ key: "right-spacer" },
];

const onScroll = Animated.event(
[{ nativeEvent: { contentOffset: { x: scrollX } } }],
{ useNativeDriver: false }
);

const handleButton = () => {
// Required field check
if (
!recipientName ||
!recipientEmail ||
!verifyRecipientEmail ||
!recipientPhone ||
!senderName ||
!senderEmail ||
!senderPhone
) {
alert("⚠️ Please fill all required fields");
return;
}

    // Email validation
    if (!isValidEmail(recipientEmail)) {
      alert("⚠️ Recipient email is not valid");
      return;
    }
    if (recipientEmail !== verifyRecipientEmail) {
      alert("⚠️ Recipient emails do not match");
      return;
    }
    if (!isValidEmail(senderEmail)) {
      alert("⚠️ Sender email is not valid");
      return;
    }

    // Phone validation (simple 8-15 digits)
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(recipientPhone)) {
      alert("⚠️ Recipient phone is invalid");
      return;
    }
    if (!phoneRegex.test(senderPhone)) {
      alert("⚠️ Sender phone is invalid");
      return;
    }

    // Gift amount check
    if (!selectedAmount) {
      alert("⚠️ Please select a gift amount");
      return;
    }

    alert("✅ All details are valid. Proceeding to checkout...");

};

return (
<SafeAreaView style={styles.container}>
<KeyboardAvoidingView
style={{ flex: 1 }}
behavior={Platform.OS === "ios" ? "padding" : undefined} >
{/_ Header _/}
<View style={styles.header}>
<TouchableOpacity
            style={styles.drawerButton}
            onPress={handleDrawerToggle}
          >
<Drawerlogo />
</TouchableOpacity>
<View style={styles.titleContainer}>
<Text style={styles.headerTitle}>Sufra Gift Cards</Text>
</View>
<View style={styles.spacer} />
</View>

        <ScrollView
          style={styles.mainScrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Carousel */}
          <Animated.FlatList
            ref={flatListRef}
            data={giftCards}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            bounces={false}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ marginTop: scale(10) }}
            onScroll={onScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              if (!item.comp)
                return <View style={{ width: SPACER_ITEM_SIZE }} />;
              const inputRange = [
                (index - 2) * ITEM_WIDTH,
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
              ];
              const scaleAnim = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: "clamp",
              });
              const opacityAnim = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 1, 0.6],
                extrapolate: "clamp",
              });
              const CardComponent = item.comp;
              return (
                <View style={{ width: ITEM_WIDTH }}>
                  <Animated.View
                    style={[
                      styles.cardContainer,
                      {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                      },
                    ]}
                  >
                    <CardComponent width={scale(300)} height={scale(169)} />
                  </Animated.View>
                </View>
              );
            }}
          />

          {/* Thumbnails */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailScroll}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {realCards.map((card, index) => {
              const CardComponent = card.comp;
              const isSelected = activeThumbIndex === index;
              return (
                <TouchableOpacity
                  key={card.key}
                  style={[
                    styles.thumbnailWrapper,
                    isSelected && styles.thumbnailWrapperActive,
                  ]}
                  onPress={() => setActiveThumbIndex(index)}
                >
                  <CardComponent width={scale(96)} height={scale(53)} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Gift Amount */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Gift Amount (SR)</Text>
            <View style={styles.boxcontainer}>
              {amounts.map((amount, index) => {
                const isSelected = selectedAmount === amount;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.box, isSelected && styles.boxSelected]}
                    onPress={() => setSelectedAmount(amount)}
                  >
                    <Text
                      style={[
                        styles.amountText,
                        isSelected && styles.amountTextSelected,
                      ]}
                    >
                      {amount}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Info Box */}
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Looking to buy gift cards in bulk or in larger{"\n"}amounts?
                Contact us at{" "}
                <Text style={{ fontWeight: "600" }}>giftcards@sufra.sa</Text>,
                and
                {"\n"}we'll be happy to assist!
              </Text>
            </View>

            {/* Who are you gifting to */}
            <Text style={styles.sectionTitle}>Who are you gifting to?</Text>
            <View style={styles.checkboxContainer}>
              <CustomCheckbox
                checked={isBuyingForMyself}
                onChange={setIsBuyingForMyself}
              />
              <Text style={styles.checkboxText}>Buying for myself</Text>
            </View>

            {/* Recipient Info */}
            <View style={styles.inputContainer}>
              <FloatingLabelInput
                label="Recipient Name*"
                value={recipientName}
                onChangeText={setRecipientName}
              />
              <FloatingLabelInput
                label="Recipient Email*"
                value={recipientEmail}
                onChangeText={setRecipientEmail}
              />
              <FloatingLabelInput
                label="Verify Recipient Email*"
                value={verifyRecipientEmail}
                onChangeText={setVerifyRecipientEmail}
              />
              <FloatingLabelInput
                label="Recipient Phone Number*"
                value={recipientPhone}
                onChangeText={setRecipientPhone}
              />
            </View>

            <Text style={styles.sectionTitle}>Personal Note</Text>
            <TextInput
              style={styles.personalNoteInput}
              value={personalNote}
              onChangeText={setPersonalNote}
              placeholder="Add a personal message..."
              placeholderTextColor="#999999"
              multiline
            />

            <Text style={styles.sectionTitle}>From</Text>
            <View style={styles.inputContainer}>
              <FloatingLabelInput
                label="Sender Name*"
                value={senderName}
                onChangeText={setSenderName}
              />
              <FloatingLabelInput
                label="Sender Email*"
                value={senderEmail}
                onChangeText={setSenderEmail}
              />
              <FloatingLabelInput
                label="Sender Phone Number*"
                value={senderPhone}
                onChangeText={setSenderPhone}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.checkoutButton,
                !isFormValid && { backgroundColor: "#ccc" },
              ]}
              onPress={handleButton}
              disabled={!isFormValid}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

);
};

export default GiftCardsScreen;

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: "#ffffff" },
header: {
flexDirection: "row",
height: scale(56),
alignItems: "center",
paddingHorizontal: scale(16),
backgroundColor: "#ffffff",
borderBottomWidth: 1,
borderBottomColor: "#E6EAF1",
shadowColor: "#000",
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.05,
shadowRadius: 2,
elevation: 2,
},
spacer: {
width: scale(36),
},
drawerButton: { padding: scale(4), marginRight: scale(8) },
titleContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
headerTitle: {
fontFamily: "Rubik-SemiBold",
fontWeight: "600",
fontSize: scale(18),
color: "#4A4A4A",
textAlign: "center",
alignSelf: "center",
},
mainScrollView: { flex: 1 },
cardContainer: {
marginHorizontal: scale(10),
borderRadius: scale(12),
alignItems: "center",
justifyContent: "flex-start",
shadowColor: "#000",
shadowOpacity: 0.1,
shadowOffset: { width: 0, height: 4 },
shadowRadius: 6,
elevation: 4,
},
thumbnailScroll: { height: scale(80), flexGrow: 0 },
thumbnailContainer: {
flexDirection: "row",
paddingHorizontal: scale(24),
alignItems: "center",
},
thumbnailWrapper: {
width: scale(104),
height: scale(61),
borderRadius: scale(8),
borderWidth: 2,
borderColor: "transparent",
alignItems: "center",
justifyContent: "center",
},
thumbnailWrapperActive: {
borderColor: "#000000",
opacity: 1,
shadowColor: "#0000001A",
shadowOpacity: 0.3,
shadowOffset: { width: 0, height: 2 },
shadowRadius: 4,
elevation: 3,
},
formContainer: { paddingHorizontal: scale(24), paddingBottom: scale(20) },
sectionTitle: {
fontFamily: "Rubik-SemiBold",
fontWeight: "600",
fontSize: scale(16),
color: "#4A4A4A",
marginTop: scale(10),
},
boxcontainer: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
marginTop: scale(10),
gap: scale(10),
},
box: {
width: scale(61),
height: scale(55),
borderRadius: scale(6),
borderWidth: scale(1),
borderColor: "#4A4A4A",
opacity: 1,
backgroundColor: "#fff",
justifyContent: "center",
alignItems: "center",
},
boxSelected: { backgroundColor: "#017851", borderColor: "#017851" },
amountText: {
fontFamily: "Rubik-SemiBold",
fontWeight: "600",
fontSize: scale(15),
color: "#6D6D6D",
textAlign: "center",
},
amountTextSelected: { color: "#ffffff" },
infoContainer: {
backgroundColor: "#E6EAF1",
width: "100%",
height: scale(84),
marginTop: scale(10),
justifyContent: "center",
alignItems: "flex-start",
paddingHorizontal: scale(16),
borderRadius: scale(10),
},
infoText: {
textAlign: "left",
color: "#4A4A4A",
fontFamily: "Rubik",
fontWeight: "400",
fontSize: scale(13),
lineHeight: scale(18),
},
checkboxContainer: {
flexDirection: "row",
gap: scale(10),
marginTop: scale(10),
justifyContent: "flex-start",
alignItems: "center",
},
checkboxText: {
fontFamily: "Rubik-Regular",
fontWeight: "400",
fontSize: scale(14),
color: "#4A4A4A",
},
inputContainer: { marginTop: scale(10), gap: scale(5), width: "100%" },
personalNoteInput: {
width: "100%",
height: scale(110),
borderRadius: scale(6),
borderWidth: 1,
borderColor: "#E6E6E6",
paddingHorizontal: scale(12),
paddingVertical: scale(12),
fontSize: scale(14),
fontFamily: "Rubik-Regular",
color: "#4A4A4A",
textAlignVertical: "top",
},
checkoutButton: {
width: "100%",
height: scale(52),
borderRadius: scale(5),
backgroundColor: "#F6B01F",
justifyContent: "center",
alignItems: "center",
marginTop: scale(30),
},
checkoutButtonText: {
textAlign: "center",
fontFamily: "Rubik-Medium",
fontWeight: "500",
fontSize: scale(18),
color: "#000000",
},
});

const selectedCard =
activeThumbIndex !== null
? realCards[activeThumbIndex]
: null;

                const formData = {
                  selectedAmount,
                  activeCardIndex: activeThumbIndex,
                  selectedCardKey: selectedCard?.key,
                  selectedCardComponent: selectedCard?.comp,
                  isBuyingForMyself,
                  recipientName,
                  recipientEmail,
                  verifyRecipientEmail,
                  recipientPhone,
                  personalNote,
                  senderName,
                  senderEmail,
                  senderPhone,
                };

                console.log("Checkout Data:", formData);
                navigation.navigate("Payment", formData);
