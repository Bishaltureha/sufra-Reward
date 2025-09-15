import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header = ({
  title = "Header Title",
  onBackPress = undefined,
  showBackButton = true,
  titleStyle,
  containerStyle,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress(); // Agar custom function diya hai toh usko chalao
    } else {
      navigation.goBack(); // Otherwise automatic wapas jao
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#047851" />
        </TouchableOpacity>
      )}

      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {/* Spacer to center the title when back button is present */}
      {showBackButton && <View style={styles.spacer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 50,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007852",
    textAlign: "center",
    flex: 1,
  },
  spacer: {
    width: 36, // Same width as back button to center title
  },
});

export default Header;
