import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

type Props = {};

const Language = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header
        onBackPress={undefined}
        titleStyle={undefined}
        containerStyle={undefined}
        title="Language"
      />
      <View style={{ paddingHorizontal: 16, width: "100%" }}>
        <Text style={styles.text}>Choose Your Language</Text>
        <CustomButton
          title={"Confirm"}
          backgroundColor="#007852"
          onPress={undefined}
          style={{ width: "100%", paddingVertical: 12, borderRadius: 8 }}
          textStyle={undefined}
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
  text: {
    fontSize: 16,
    fontWeight: "400",
  },
});
