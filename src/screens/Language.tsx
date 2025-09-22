import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

// Import your circular (1x1) flags

import { useLocalization } from "../context/LocalizationContext";
import { languages } from "../constants/language";
import RTLText from "../components/RTLText";
import { scale } from "../utils/dimen";

const Language = () => {
  const { locale, setLanguage, t } = useLocalization();

  const [selectedLanguageCode, setSelectedLanguageCode] = useState(
    locale || "en"
  );

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguageCode(languageCode);
  };

  const handleConfirm = () => {
    const selected = languages.find((l) => l.id === selectedLanguageCode);
    Alert.alert(
      t("language.selectedAlertTitle"),
      t("language.selectedAlertMessage", { name: selected?.name }),
      [
        {
          text: t("common.ok"),
          onPress: () => {
            setLanguage(selected?.id || "en", selected?.isRTL || false);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        onBackPress={undefined}
        titleStyle={styles.title}
        containerStyle={undefined}
        title={t("common.language")}
        image={undefined}
      />

      <View style={styles.content}>
        <RTLText style={styles.text}>
          {t("language.chooseYourLanguage")}
        </RTLText>

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
              <language.flag width={scale(32)} height={scale(32)} style={styles.flagIcon} />
              <RTLText style={styles.languageName}>{language.name}</RTLText>
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
          title={t("common.confirm")}
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
    paddingHorizontal: scale(16),
    width: "100%",
    flex: 1,
  },
  title: { fontWeight: "bold" },
  text: {
    fontSize: scale(18),
    fontWeight: "500",
    color: "#333",
    marginVertical: scale(24),
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(16),
  },
  languageOptionWithBorder: {
    borderBottomWidth: scale(1),
    borderBottomColor: "#cfcece",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    borderRadius: scale(16), // circular
    marginEnd: scale(12),
    overflow: "hidden",
  },
  languageName: {
    fontSize: scale(16),
    fontWeight: "400",
    color: "#333",
  },
  radioButton: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: scale(2),
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#007852",
  },
  radioButtonInner: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: "#007852",
  },
  confirmButton: {
    width: "100%",
    paddingVertical: scale(16),
    borderRadius: scale(8),
    marginTop: scale(32),
  },
  confirmButtonText: {
    fontSize: scale(16),
    fontWeight: "600",
  },
});
