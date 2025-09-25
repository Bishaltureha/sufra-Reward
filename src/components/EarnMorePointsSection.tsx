import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { scale } from "../utils/dimen";
import Star from "../../assets/svg/Star";
import ReferaFriend from "../../assets/svg/ReferaFriend";
import FirstOnlineOrder from "../../assets/svg/FirstOnlineOrder";

const EarnMorePointsSection = ({
  containerStyle,
  title = "Earn More Points",
}) => {
  const pointsData = [
    {
      id: 1,
      icon: FirstOnlineOrder,
      title: "First Online Order",
      points: "Earned",
      showDivider: true,
    },
    {
      id: 2,
      icon: ReferaFriend,
      title: "Refer a Friend",
      points: "100 Points",
      showDivider: true,
    },
    {
      id: 3,
      icon: Star,
      title: "Add Extra Profile Info",
      points: "100 Points",
      showDivider: false, // Last item no divider
    },
  ];

  const renderPointItem = (item) => {
    const IconComponent = item.icon;

    return (
      <View key={item.id}>
        <View style={styles.pointItemContainer}>
          <View style={styles.iconCircle}>
            <IconComponent height={scale(24)} width={scale(24)} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.pointsText}>{item.points}</Text>
          </View>
        </View>
        {item.showDivider && <View style={styles.divider} />}
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.whiteCard}>{pointsData.map(renderPointItem)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: scale(379),
    backgroundColor: "#dee3e0",
    marginTop: scale(30),
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
  },
  whiteCard: {
    width: scale(358),
    height: scale(239),
    marginTop: scale(16),
    borderRadius: scale(6),
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(30),
    justifyContent: "space-around",
  },
  pointItemContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  iconCircle: {
    width: scale(36),
    height: scale(36),
    backgroundColor: "#F6B01F",
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(15),
  },
  pointsText: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(13),
  },
  divider: {
    backgroundColor: "#E6EAF1",
    width: "100%",
    height: scale(1),
    marginTop: scale(8),
  },
});

export default EarnMorePointsSection;
