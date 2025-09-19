import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

// Import your circular (1x1) flags
import UKFlag from "../../assets/flags/1x1/gb.svg";
import SaudiFlag from "../../assets/flags/1x1/sa.svg";

const Language = () => {
  // Just English & Arabic
  const languages = [
    { id: "en", name: "English", flag: UKFlag },
    { id: "ar", name: "العربية", flag: SaudiFlag },
  ];

  const [selectedLanguageCode, setSelectedLanguageCode] = useState("en"); // default English

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguageCode(languageCode);
  };

  const handleConfirm = () => {
    const selected = languages.find((l) => l.id === selectedLanguageCode);
    Alert.alert("Language Selected", `You have selected: ${selected?.name}`, [
      { text: "OK" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        onBackPress={undefined}
        titleStyle={styles.title}
        containerStyle={undefined}
        title="Language"
        image={undefined}
      />

      <View style={styles.content}>
        <Text style={styles.text}>Choose Your Language</Text>

        {languages.map((language, index) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageOption,
              index === 0 && styles.languageOptionWithBorder,
            ]}
            onPress={() => handleLanguageSelect(language.id)}
          >
            <View style={styles.languageInfo}>
              {/* Circular flag */}
              <language.flag width={32} height={32} style={styles.flagIcon} />
              <Text style={styles.languageName}>{language.name}</Text>
            </View>
            <View
              style={[
                styles.radioButton,
                selectedLanguageCode === language.id &&
                  styles.radioButtonSelected,
              ]}
            >
              {selectedLanguageCode === language.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <CustomButton
          title="Confirm"
          backgroundColor="#007852"
          onPress={handleConfirm}
          style={styles.confirmButton}
          textStyle={styles.confirmButtonText}
          textColor={"#ffffff"}
        />
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
  },
  content: {
    paddingHorizontal: 16,
    width: "100%",
    flex: 1,
  },
  title: { fontWeight: "bold" },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginVertical: 24,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  languageOptionWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#cfcece",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    borderRadius: 16, // circular
    marginRight: 12,
    overflow: "hidden",
  },
  languageName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#007852",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007852",
  },
  confirmButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
