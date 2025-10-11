import { StyleSheet, View, Image, Platform } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { OnboardingStackParamList, RootStackParamList } from "../types";
import Tiers from "../../assets/svg/Tiers";
import Logo from "../../assets/svg/Logo";
import TierBox from "../components/TierBox";
import BenefitBox from "../components/BenefitBox";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "../components/RTLText";
import { scale } from "../utils/dimen";

type Props = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParamList, "DiscoverSufraBenefits">,
  NativeStackScreenProps<RootStackParamList>
>;

const DiscoverSufraBenefits = ({ navigation }: Props) => {
  const { t } = useLocalization();
  const tierNames = (t("benefits.tierNames") as unknown as string[]) || [
    "STAR",
    "ICON",
    "LEGEND",
  ];
  const tiers = [
    { label: tierNames[0], stars: 1 },
    { label: tierNames[1], stars: 2 },
    { label: tierNames[2], stars: 3 },
  ];
  const benefits =
    (t("benefits.matrix") as unknown as string[][]) || ([] as string[][]);
  return (
    <View style={styles.container}>
      <Header
        titleStyle={{ color: "#000000" }}
        containerStyle={undefined}
        title={t("benefits.tiersTitle")}
        onBackPress={undefined}
        image={undefined}
      />

      {/* Green Section */}
      <LinearGradient
        colors={["#007851", "#009463"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.greenSection}
      >
        <View style={styles.greenLeft}>
          <Logo style={styles.image} />
          <RTLText style={styles.greenSectionTitleText}>
            {t("benefits.bannerTitle")}
          </RTLText>
          <RTLText style={styles.greenSectionText}>
            {t("benefits.bannerSubtitle")}
          </RTLText>
        </View>
        <Tiers width="24.1%" height="100%" />
      </LinearGradient>

      {/* Tiers Row */}
      <View style={styles.tierRow}>
        {tiers.map((tier, i) => (
          <TierBox key={i}>
            <View style={tier.stars > 1 ? styles.starRow : undefined}>
              {Array.from({ length: tier.stars }).map((_, j) => (
                <Image
                  key={j}
                  source={require("../../assets/image/star.png")}
                  style={styles.starImage}
                />
              ))}
            </View>
            <RTLText style={styles.tierLabel}>{tier.label}</RTLText>
          </TierBox>
        ))}
      </View>

      {/* Benefits Rows */}
      {benefits.map((row, i) => (
        <View key={i} style={styles.benefitRow}>
          {row.map((text, j) => (
            <BenefitBox key={j} text={text} />
          ))}
        </View>
      ))}

      {/* Button */}
      <View style={styles.contentContainer}>
        <CustomButton
          title={t("common.registerNow")}
          backgroundColor="#ffab00"
          onPress={() => navigation.navigate("AuthStack", { screen: "Register" })}
          style={styles.buttonStyle}
          textStyle={undefined}
          textColor={"#000000"}
        />
      </View>
    </View>
  );
};

export default DiscoverSufraBenefits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  greenSection: {
    height: "16%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(20),
  },
  greenLeft: {
    flex: 1,
    justifyContent: "center",
  },
  greenstart: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  image: {
    height: scale(52),
    width: scale(144),
    resizeMode: "contain",
    position: "absolute",
    left: 0,
    top: scale(10),
  },
  greenSectionText: {
    color: "#ffffff",
    fontSize: scale(16),
    fontWeight: "800",
    left: 0,
    backgroundColor: "#01845bff",
    marginTop: scale(9),
  },
  greenSectionTitleText: {
    color: "#ffab00",
    fontSize: scale(16),
    fontWeight: "800",
    marginTop: scale(50),
    left: Platform.OS === "ios" ? -30 : -21,
    marginStart: scale(30),
    alignSelf: "flex-start",
  },
  tierRow: {
    height: scale(62),
    backgroundColor: "#F4F4F4",
    width: "100%",
    flexDirection: "row",
  },
  starRow: {
    flexDirection: "row",
    gap: scale(2.5),
  },
  starImage: {
    height: scale(20),
    width: scale(20),
    resizeMode: "contain",
  },
  tierLabel: {
    color: "#017851",
    fontSize: scale(12),
    fontWeight: "500",
    marginTop: scale(2.5),
  },
  benefitRow: {
    height: scale(62),
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
  },
  buttonStyle: {
    paddingVertical: scale(16),
    position: "absolute",
    bottom: scale(40),
  },
});
