import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import CircularRightArrow from "../../assets/svg/CircularRightArrow";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
type Props = NativeStackScreenProps<RootStackParamList, "CountryandLanguage">;

const CountryandLanguage = ({ navigation }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Language")}
    >
      <Header
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
        title="Country & Language"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <Text style={styles.text}>Language</Text>
        <View>
          <CircularRightArrow style={undefined} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CountryandLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
  },
});
