import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import RTLText from "./RTLText";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header = ({
  title,
  onBackPress,
  showBackButton = true,
  titleStyle,
  containerStyle,
  image,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const inset = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: inset.top ? inset.top : inset.top + scale(12),
        },
        containerStyle,
      ]}
    >
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={scale(30)}
            color="#047851"
          />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        {image}
        {title && <RTLText style={[styles.title, titleStyle]}>{title}</RTLText>}
      </View>

      {showBackButton && <View style={styles.spacer} />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingBottom: scale(12),
  },
  backButton: {
    padding: scale(4),
    borderRadius: scale(20),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#007852",
    marginStart: scale(8),
  },
  spacer: {
    width: scale(40),
  },
});
