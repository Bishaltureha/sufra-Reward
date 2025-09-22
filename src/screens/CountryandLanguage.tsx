import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import CircularRightArrow from "../../assets/svg/CircularRightArrow";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useLocalization } from "../context/LocalizationContext";
import RTLText from "../components/RTLText";
import { scale } from "../utils/dimen";

type Props = NativeStackScreenProps<RootStackParamList, "CountryandLanguage">;

const CountryandLanguage = ({ navigation }: Props) => {
  const { t } = useLocalization();
  return (
    <View style={styles.container}>
      <Header
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
        title={t("common.countryAndLanguage")}
        image={undefined}
      />

      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("Language")}
      >
        <RTLText style={styles.text}>{t("common.language")}</RTLText>
        <CircularRightArrow />
      </TouchableOpacity>
    </View>
  );
};

export default CountryandLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
  },
  text: {
    fontSize: scale(16),
    fontWeight: "400",
  },
});
