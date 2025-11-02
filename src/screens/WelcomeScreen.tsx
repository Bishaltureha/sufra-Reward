import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  I18nManager,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { OnboardingStackParamList, RootStackParamList } from "../types";
import { scale, screenWidth } from "../utils/dimen";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "../components/RTLText";
import LanguageSelector from "../components/LanguageSelector";

type Props = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParamList, "Welcome">,
  NativeStackScreenProps<RootStackParamList>
>;

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }: Props) => {
  const { t } = useLocalization();

  const onboardingData = [
    {
      id: "1",
      title: t("onboarding.0.title"),
      subtitle: t("onboarding.0.subtitle"),
      image: require("../../assets/image/Welcome1.png"),
    },
    {
      id: "2",
      title: t("onboarding.1.title"),
      subtitle: t("onboarding.1.subtitle"),
      image: require("../../assets/image/Welcome2.png"),
    },
    {
      id: "3",
      title: t("onboarding.2.title"),
      subtitle: t("onboarding.2.subtitle"),
      image: require("../../assets/image/Welcome3.png"),
    },
    {
      id: "4",
      title: t("onboarding.3.title"),
      subtitle: t("onboarding.3.subtitle"),
      image: require("../../assets/image/Welcome4.png"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);

    setCurrentIndex(index);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: (typeof onboardingData)[0]; index: number }) => (
      <View style={styles.slide}>
        <View style={styles.imageWrapper}>
          <Image
            source={item.image}
            style={
              index === 0 ? styles.imageBackground1 : styles.imageBackground
            }
          />
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.textContainer}>
            <RTLText style={styles.title}>{item.title}</RTLText>
            <RTLText style={styles.subTitle}>{item.subtitle}</RTLText>
          </View>
        </View>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.top}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
        <View style={styles.topButtons}>
          <View>
            {currentIndex === 0 && (
              <LanguageSelector
                containerStyle={styles.languageSelector}
                dropdownStyle={styles.languageSelectorDropdown}
                showLabel={false}
              />
            )}
          </View>
          <CustomButton
            title={t("welcome.continueAsGuest")}
            backgroundColor="#ffffff"
            onPress={() => navigation.navigate("MainStack" as any)}
            style={styles.guestButton}
            textStyle={styles.guestButtonText}
            textColor=""
          />
        </View>
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={
              currentIndex === 2
                ? t("welcome.discoverBenefits")
                : t("welcome.login")
            }
            backgroundColor="#ffab00"
            onPress={
              currentIndex === 2
                ? () => navigation.navigate("DiscoverSufraBenefits")
                : () => navigation.navigate("AuthStack" as any)
            }
            style={styles.bottomButton}
            textColor="#000000"
          />
          <CustomButton
            title={t("welcome.register")}
            backgroundColor="#ffffff"
            borderColor="black"
            borderWidth={scale(1.5)}
            onPress={() => navigation.navigate("AuthStack" as any)}
            style={styles.bottomButton}
            textColor="#4A4A4A"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  top: {
    height: "75%",
  },
  slide: {
    width,
    height: "100%",
  },
  imageWrapper: {
    width,
    height: width,
  },
  imageBackground1: {
    position: "absolute",
    alignSelf: "center",
    top: 0,
    left: scale(-100),
    width: scale(1.5 * width),
    height: "100%",
    resizeMode: "cover",
  },
  imageBackground: {
    width,
    height: "100%",
    resizeMode: "cover",
  },
  textWrapper: {
    width,
    height: "34%",
  },
  textContainer: {
    paddingHorizontal: scale(30),
    paddingTop: scale(20),
    flex: 1,
  },
  title: {
    fontSize: scale(30),
    fontWeight: "bold",
    color: "#333",
  },
  subTitle: {
    marginTop: scale(10),
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#686868ff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: scale(8),
    position: "absolute",
    bottom: 0,
    left: scale(30),
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: "#ccc",
  },
  activeDot: {
    width: scale(40),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: "#ffab00",
  },
  topButtons: {
    paddingVertical: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    width: "100%",
  },
  languageSelector: {
    width: scale(64),
    ...(I18nManager.isRTL
      ? { marginRight: scale(10) }
      : { marginLeft: scale(10) }),
  },
  languageSelectorDropdown: {
    ...(I18nManager.isRTL ? { right: 0 } : { left: 0 }),
    top: scale(55),
  },
  guestButton: {
    right: scale(10),
    width: scale(150),
    height: scale(35),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(3),
    elevation: 3,
  },
  guestButtonText: {
    fontWeight: "600",
    fontSize: scale(12),
    textAlign: "center",
    position: "absolute",
    top: scale(10),
  },
  bottomHalf: {
    height: "25%",
    paddingHorizontal: scale(30),
    paddingTop: scale(20),
  },
  buttonContainer: {
    width: screenWidth - scale(56),
    gap: scale(10),
    position: "absolute",
    bottom: scale(20),
    alignSelf: "center",
  },
  bottomButton: {
    paddingVertical: scale(16),
  },
});
