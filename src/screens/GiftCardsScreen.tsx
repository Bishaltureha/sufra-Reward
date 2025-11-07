import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList, GiftCardStackParamList } from "../types";
import GiftCard2 from "../../assets/svg/giftCards/GiftCard2";
import GiftCard3 from "../../assets/svg/giftCards/GiftCard3";
import GiftCard4 from "../../assets/svg/giftCards/GiftCard4";
import GiftCard5 from "../../assets/svg/giftCards/GiftCard5";
import CustomCheckbox from "../components/CustomCheckbox";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CompositeNavigationProp } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

type GiftCardsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<GiftCardStackParamList, "GiftCardsMain">,
  DrawerNavigationProp<DrawerParamList>
>;

const GiftCardsScreen = () => {
  const navigation = useNavigation<GiftCardsScreenNavigationProp>();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const thumbnailScrollRef = useRef<ScrollView>(null);

  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomAmountSelected, setIsCustomAmountSelected] = useState(false);
  const [isBuyingForMyself, setIsBuyingForMyself] = useState(true);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [verifyRecipientEmail, setVerifyRecipientEmail] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [personalNote, setPersonalNote] = useState("");

  const amounts = ["100", "250", "500", "1000", "1500"];

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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const finalAmount = isCustomAmountSelected ? customAmount : selectedAmount;

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
    finalAmount &&
    (!isCustomAmountSelected ||
      (parseFloat(customAmount) >= 50 && parseFloat(customAmount) <= 10000));

  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleThumbnailPress = (index: number) => {
    setActiveThumbIndex(index);
    flatListRef.current?.scrollToOffset({
      offset: index * ITEM_WIDTH,
      animated: true,
    });
    thumbnailScrollRef.current?.scrollTo({
      x: index * (scale(104) + scale(8)) - width / 2 + scale(52),
      animated: true,
    });
  };

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setIsCustomAmountSelected(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setCustomAmount(numericText);
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        if (
          index >= 0 &&
          index < realCards.length &&
          index !== activeThumbIndex
        ) {
          setActiveThumbIndex(index);
        }
      },
    }
  );

  const handleButton = () => {
    if (!isFormValid) {
      alert("Please fill all required fields correctly");
      return;
    }

    if (isCustomAmountSelected) {
      const amount = parseFloat(customAmount);
      if (amount < 50 || amount > 10000) {
        alert("Custom amount must be between 50 and 10,000 SR");
        return;
      }
    }

    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(recipientPhone) || !phoneRegex.test(senderPhone)) {
      alert("Phone numbers must be 8-15 digits");
      return;
    }

    const selectedCard = realCards[activeThumbIndex];
    const formData = {
      selectedAmount: finalAmount,
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

    navigation.navigate("Payment", formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={scale(20)}
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
            if (!item.comp) return <View style={{ width: SPACER_ITEM_SIZE }} />;
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
                    { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
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
          ref={thumbnailScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailContainer}
          style={styles.thumbnailScroll}
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
                onPress={() => handleThumbnailPress(index)}
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
            {amounts.map((amount) => {
              const isSelected =
                selectedAmount === amount && !isCustomAmountSelected;
              return (
                <TouchableOpacity
                  key={amount}
                  style={[styles.box, isSelected && styles.boxSelected]}
                  onPress={() => handleAmountSelect(amount)}
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

          {/* ✅ Custom Amount Toggle */}
          <View style={styles.customAmountContainer}>
            <View style={styles.customAmountToggleRow}>
              <CustomCheckbox
                checked={isCustomAmountSelected}
                onChange={(checked) => {
                  setIsCustomAmountSelected(checked);
                  if (!checked) setCustomAmount("");
                }}
              />
              <Text style={styles.customAmountLabel}>Enter Custom Amount</Text>
            </View>

            {isCustomAmountSelected && (
              <View style={{ marginTop: scale(10) }}>
                <View
                  style={[
                    styles.customAmountInputWrapper,
                    styles.customAmountInputWrapperActive,
                  ]}
                >
                  <TextInput
                    style={styles.customAmountInput}
                    value={customAmount}
                    onChangeText={handleCustomAmountChange}
                    placeholder="Enter amount (50 - 10,000)"
                    placeholderTextColor="#999999"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <Text style={styles.currencyLabel}>SR</Text>
                </View>
                {customAmount ? (
                  <Text style={styles.customAmountHint}>
                    {parseFloat(customAmount) < 50 ||
                    parseFloat(customAmount) > 10000
                      ? "Amount must be between 50 and 10,000 SR"
                      : `Custom amount: ${customAmount} SR`}
                  </Text>
                ) : null}
              </View>
            )}
          </View>

          {/* Info Box */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Looking to buy gift cards in bulk or in larger{"\n"}amounts?
              Contact us at{" "}
              <Text
                style={{ fontWeight: "600", textDecorationLine: "underline" }}
                onPress={async () => {
                  await Clipboard.setStringAsync("giftcards@sufra.sa");
                  Alert.alert("Copied!", "Email address copied to clipboard");
                }}
              >
                giftcards@sufra.sa
              </Text>
              , and
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default GiftCardsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    height: scale(50),
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF1",
  },
  spacer: { width: scale(36) },
  drawerButton: { padding: scale(4), marginRight: scale(8) },
  titleContainer: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: scale(20),
  },
  cardContainer: {
    marginHorizontal: scale(10),
    borderRadius: scale(12),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  thumbnailScroll: {
    height: scale(80),
    marginTop: scale(10),
  },
  thumbnailContainer: {
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
    marginRight: scale(8),
  },
  thumbnailWrapperActive: {
    borderColor: "#000000",
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
    marginTop: scale(10),
    gap: scale(10),
  },
  box: {
    width: scale(61),
    height: scale(55),
    borderRadius: scale(6),
    borderWidth: scale(1),
    borderColor: "#4A4A4A",
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
  },
  amountTextSelected: { color: "#ffffff" },
  customAmountContainer: {
    marginTop: scale(15),
  },
  customAmountToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  customAmountLabel: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#4A4A4A",
  },
  customAmountInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(55),
    borderRadius: scale(6),
    borderWidth: scale(1),
    borderColor: "#4A4A4A",
    backgroundColor: "#fff",
    paddingHorizontal: scale(12),
  },
  customAmountInputWrapperActive: {
    borderColor: "#017851",
    borderWidth: scale(2),
  },
  customAmountInput: {
    flex: 1,
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(15),
    color: "#4A4A4A",
  },
  currencyLabel: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(15),
    color: "#6D6D6D",
    marginLeft: scale(8),
  },
  customAmountHint: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(12),
    color: "#017851",
    marginTop: scale(6),
  },
  infoContainer: {
    backgroundColor: "#E6EAF1",
    height: scale(84),
    marginTop: scale(15),
    paddingHorizontal: scale(16),
    borderRadius: scale(10),
    justifyContent: "center",
  },
  infoText: {
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
    alignItems: "center",
  },
  checkboxText: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#4A4A4A",
  },
  inputContainer: { marginTop: scale(10), gap: scale(5) },
  personalNoteInput: {
    height: scale(110),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: "#E6E6E6",
    padding: scale(12),
    fontSize: scale(14),
    fontFamily: "Rubik-Regular",
    color: "#4A4A4A",
    textAlignVertical: "top",
    marginTop: scale(10),
  },
  checkoutButton: {
    height: scale(52),
    borderRadius: scale(5),
    backgroundColor: "#F6B01F",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(30),
  },
  checkoutButtonText: {
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(18),
    color: "#000000",
  },
});
