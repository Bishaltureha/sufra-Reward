import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { scale } from "../utils/dimen";
import { useLocalization } from "../context/LocalizationContext";
import { getLanguage } from "../utils/storage";
import Thick from "../../assets/svg/drawer/Thick";

interface LanguageSelectorProps {
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  showLabel?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  containerStyle,
  dropdownStyle,
  showLabel = true,
}) => {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ar">("en");
  const { setLanguage } = useLocalization();

  useEffect(() => {
    const { language } = getLanguage();
    setSelectedLanguage(language === "ar" ? "ar" : "en");
  }, []);

  const handleLanguageChange = (lang: "en" | "ar") => {
    const isRTL = lang === "ar";
    setLanguage(lang, isRTL);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={toggleLanguageDropdown}
      >
        <Image
          source={
            selectedLanguage === "en"
              ? require("../../assets/image/usa.png")
              : require("../../assets/image/Saudi.png")
          }
          style={styles.flag}
        />
        {showLabel && (
          <>
            <Text style={styles.languageText}>
              {selectedLanguage.toUpperCase()}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={scale(24)}
              color="#000"
            />
          </>
        )}
      </TouchableOpacity>

      {languageDropdownOpen && (
        <View style={[styles.languageDropdown, dropdownStyle]}>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              handleLanguageChange("en");
            }}
          >
            {selectedLanguage === "en" && <Thick style={styles.checkIcon} />}
            <Image
              source={require("../../assets/image/usa.png")}
              style={styles.flag}
            />
            <Text style={styles.languageOptionText}>English</Text>
          </TouchableOpacity>

          <View style={styles.dropdownDivider} />

          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => {
              handleLanguageChange("ar");
            }}
          >
            {selectedLanguage === "ar" && <Thick style={styles.checkIcon} />}
            <Image
              source={require("../../assets/image/Saudi.png")}
              style={styles.flag}
            />
            <Text style={styles.languageOptionText}>العربية</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6EAF1",
    borderRadius: scale(12),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
  },
  flag: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    resizeMode: "cover",
    overflow: "hidden",
  },
  languageText: {
    marginStart: scale(3),
    fontSize: scale(12),
    color: "#4A4A4A",
    fontWeight: "500",
  },
  languageDropdown: {
    position: "absolute",
    top: scale(50),
    left: 0,
    backgroundColor: "#E6EAF1",
    borderRadius: scale(12),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    paddingVertical: scale(8),
    minWidth: scale(160),
    zIndex: 1000,
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
  },
  languageOptionText: {
    fontSize: scale(14),
    fontFamily: "Rubik-Regular",
    color: "#4A4A4A",
    fontWeight: "500",
    marginLeft: scale(8),
  },
  checkIcon: {
    marginStart: scale(-15),
    marginEnd: scale(10),
  },
  dropdownDivider: {
    backgroundColor: "#D1D1D1",
    width: "100%",
    height: 0.5,
  },
});

export default LanguageSelector;
