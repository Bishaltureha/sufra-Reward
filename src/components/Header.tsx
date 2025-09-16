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
  title,
  onBackPress,
  showBackButton = true,
  titleStyle,
  containerStyle,
  image,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
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

      <View style={styles.titleContainer}>
        {image}
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
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
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 50,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007852",
    marginLeft: 8, // spacing between image and text
  },
  spacer: {
    width: 36,
  },
});
