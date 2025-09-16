import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import CircularRightArrow from "../../assets/svg/CircularRightArrow";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "CountryandLanguage">;

const CountryandLanguage = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Header
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
        title="Country & Language"
        image={undefined}
      />

      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("Language")}
      >
        <Text style={styles.text}>Language</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
  },
});
