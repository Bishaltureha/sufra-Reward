import { StyleSheet, Text, View, Image, Platform } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Tiers from "../../assets/svg/Tiers";
import Logo from "../../assets/svg/Logo";
import TierBox from "../components/TierBox";
import BenefitBox from "../components/BenefitBox";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "DiscoverSufraBenefits"
>;

const tiers = [
  { label: "STAR", stars: 1 },
  { label: "ICON", stars: 2 },
  { label: "LEGEND", stars: 3 },
];

const benefits = [
  [
    "Earn and burn\npoints on dine-in\nand online orders",
    "All Star Tier\ndenefits",
    "All Star and Icon\nTier benefits",
  ],
  [
    "Member-only\ndining in and\ndelivery promoti...",
    "Tier upgrade gift",
    "Invitations to\nspecial events",
  ],
  ["Birthday gift", "Enhanced bonus\npoints\nopportunities", "VIP Hotline"],
  [
    "Bonus points\nopportunities",
    "Priority seating",
    "EArly accesee to\nnew menu items",
  ],
  [
    "Loyalty Tier for\nkids",
    "More chances to\nwin at prize draws",
    "Access ti Chef",
  ],
  ["-", "Complimentary \n delights and \n surprises", "-"],
];

const DiscoverSufraBenefits = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Header
        titleStyle={{ color: "#000000" }}
        containerStyle={undefined}
        title="Tiers"
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
          <Text style={styles.greenSectionTitleText}>T I E R S</Text>
          <Text style={styles.greenSectionText}>From Star to Legend</Text>
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
            <Text style={styles.tierLabel}>{tier.label}</Text>
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
          title={"Register Now"}
          backgroundColor="#ffab00"
          onPress={() => navigation.navigate("Register")}
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
    padding: 20,
  },
  greenLeft: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  image: {
    height: 52,
    width: 144,
    resizeMode: "contain",
    position: "absolute",
    left: 0,
    top: 10,
  },
  greenSectionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    left: 0,
    backgroundColor: "#01845bff",
    marginTop: 9,
  },
  greenSectionTitleText: {
    color: "#ffab00",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 50,
    left: Platform.OS === "ios" ? -30 : -21,
    marginLeft: 30,
    alignSelf: "flex-start",
  },
  tierRow: {
    height: 62,
    backgroundColor: "#F4F4F4",
    width: "100%",
    flexDirection: "row",
  },
  starRow: {
    flexDirection: "row",
    gap: 2.5,
  },
  starImage: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  tierLabel: {
    color: "#017851",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2.5,
  },
  benefitRow: {
    height: 62,
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
  },
  buttonStyle: {
    paddingVertical: 16,
    position: "absolute",
    bottom: 40,
  },
});
