import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import GreenFire from "../../../assets/svg/GreenFire";
import { scale } from "../../utils/dimen";

type Props = {};

const data = [
  {
    id: 1,
    title: "FREE DELIVERY",
    subtitle: "Min Spend 15 SR",
  },
  {
    id: 2,
    title: "EARN DOUBLE POINTS",
    subtitle: "Get 2x points for orders placed today",
  },
  {
    id: 3,
    title: "LIMITED OFFER",
    subtitle: "Buy 1 Get 1 Free on selected meals",
  },
  {
    id: 4,
    title: "20% OFF",
    subtitle: "On your first app order",
  },
  {
    id: 5,
    title: "WEEKEND DEAL",
    subtitle: "Flat 10 SR off on orders above 50 SR",
  },
  {
    id: 6,
    title: "MEMBER EXCLUSIVE",
    subtitle: "Extra 5% cashback in reward points",
  },
  {
    id: 7,
    title: "FREE DRINK",
    subtitle: "With every burger combo",
  },
  {
    id: 8,
    title: "FLASH SALE",
    subtitle: "Only valid till midnight today",
  },
  {
    id: 9,
    title: "SPECIAL DISCOUNT",
    subtitle: "Students get extra 10% off",
  },
  {
    id: 10,
    title: "LOYALTY BONUS",
    subtitle: "500 bonus points on 5th order",
  },
];

const BrandDetailsDeliveryBox = (props: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item) => (
        <View key={item.id} style={styles.container}>
          <GreenFire />
          <View style={styles.subcontainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
          <AntDesign name="right" size={scale(12)} color="#017851" />
        </View>
      ))}
    </ScrollView>
  );
};

export default BrandDetailsDeliveryBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(16),
    backgroundColor: "#e6f2ef",
    padding: scale(12),
    minWidth: scale(200),
    borderWidth: scale(1),
    borderColor: "#017851",
    justifyContent: "space-between", // ✅ text aur icon ke beech proper gap
  },
  title: {
    fontWeight: "800",
    color: "#017851",
    fontFamily: "Rubik-ExtraBold",
    fontSize: scale(12),
  },
  subtitle: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(11),
    color: "#017851",
    marginTop: scale(2), // ✅ title aur subtitle ke beech thoda gap
  },
  subcontainer: {
    flex: 1,
    marginLeft: scale(12), // ✅ icon aur text ke beech proper space
    marginRight: scale(8), // ✅ text aur right icon ke beech space
  },
});
