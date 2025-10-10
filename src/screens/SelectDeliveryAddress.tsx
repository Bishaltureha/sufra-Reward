import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "../utils/dimen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";

const SelectDeliveryAddress = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleBack = () => navigation.goBack();
  const handleSelect = (cardIndex: number) => setSelectedCard(cardIndex);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Ionicons name="close" size={scale(30)} color="#017851" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Select Delivery Address</Text>
        </View>
        <View style={styles.headerButton} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Home Address Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSelect(1)}
          style={[styles.card, selectedCard === 1 && styles.selectedCard]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[
                styles.radioButton,
                selectedCard === 1 && styles.radioButtonSelected,
              ]}
            >
              {selectedCard === 1 && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.cardText}>Home Address</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => console.log("Edit Home")}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/image/map.png")}
            style={{
              width: "100%",
              height: scale(60),
              borderRadius: scale(8),
              marginVertical: scale(16),
            }}
          />
          <Text
            style={{
              color: "#717171",
              fontFamily: "Rubik-Regular",
              fontWeight: "400",
              fontSize: scale(14),
            }}
          >
            Al Barsha Marina Mall 2781 Build Riyadh, SA
          </Text>
          <Text
            style={{
              color: "#717171",
              fontFamily: "Rubik-Medium",
              fontWeight: "500",
              fontSize: scale(12),
            }}
          >
            Mohammed Sbiaa // +966 366 00 81
          </Text>
        </TouchableOpacity>
      </View>

      {/* Office Address Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSelect(2)}
          style={[styles.smallCard, selectedCard === 2 && styles.selectedCard]}
        >
          <View style={styles.row}>
            <View
              style={[
                styles.radioButton,
                selectedCard === 2 && styles.radioButtonSelected,
              ]}
            >
              {selectedCard === 2 && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.cardText}>Business Address</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => console.log("Edit Home")}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: scale(1),
              backgroundColor: "#E6EAF1",
              marginVertical: scale(16),
            }}
          />
          <View style={{ marginHorizontal: scale(16) }}>
            <Text
              style={{
                color: "#717171",
                fontFamily: "Rubik-Regular",
                fontWeight: "400",
                fontSize: scale(14),
              }}
            >
              Al Barsha Marina Mall 2781 Build Riyadh, SA
            </Text>
            <Text
              style={{
                color: "#717171",
                fontFamily: "Rubik-Medium",
                fontWeight: "500",
                fontSize: scale(12),
              }}
            >
              Mohammed Sbiaa // +966 366 00 81
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Other Address Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSelect(3)}
          style={[styles.smallCard, selectedCard === 3 && styles.selectedCard]}
        >
          <View style={styles.row}>
            <View
              style={[
                styles.radioButton,
                selectedCard === 3 && styles.radioButtonSelected,
              ]}
            >
              {selectedCard === 3 && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.cardText}>Home</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => console.log("Edit Home")}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: scale(1),
              backgroundColor: "#E6EAF1",
              marginVertical: scale(16),
            }}
          />
          <View style={{ marginHorizontal: scale(16) }}>
            <Text
              style={{
                color: "#717171",
                fontFamily: "Rubik-Regular",
                fontWeight: "400",
                fontSize: scale(14),
              }}
            >
              Al Barsha Marina Mall 2781 Build Riyadh, SA
            </Text>
            <Text
              style={{
                color: "#717171",
                fontFamily: "Rubik-Medium",
                fontWeight: "500",
                fontSize: scale(12),
              }}
            >
              Mohammed Sbiaa // +966 366 00 81
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Fixed Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("AddNewAddress")}
        >
          <Text style={styles.continueText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectDeliveryAddress;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: scale(24),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  headerButton: {
    width: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: { flex: 1, alignItems: "center" },
  headerTitle: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(17),
    textAlign: "center",
  },
  divider: { height: scale(1), backgroundColor: "#E6EAF1", width: "100%" },
  cardContainer: { marginTop: scale(12) }, // separate container for each card
  card: {
    marginHorizontal: scale(16),
    borderWidth: scale(1),
    borderColor: "#E6EAF1",
    borderRadius: scale(10),
    height: scale(184),
    justifyContent: "flex-start",
    padding: scale(16),
  },
  smallCard: {
    marginHorizontal: scale(16),
    borderWidth: scale(1),
    borderColor: "#E6EAF1",
    borderRadius: scale(10),
    height: scale(127),
    justifyContent: "flex-start",
    // padding: scale(16),
  },
  selectedCard: { borderColor: "#017851", borderWidth: scale(2) },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(16),
    marginHorizontal: scale(16),
  },
  radioButton: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(13),
    borderWidth: scale(2),
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#017851",
  },
  radioButtonInner: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(12.5),
    borderWidth: scale(4),
    borderColor: "#017851",
  },
  cardText: {
    fontSize: scale(15),
    fontWeight: "500",
    color: "#4A4A4A",
    marginLeft: scale(12),
  },
  bottomSection: {
    width: "100%",
    height: scale(108),
    borderTopWidth: scale(1),
    borderColor: "#E6EAF1",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(18),
  },
  continueBtn: {
    backgroundColor: "#ffffff",
    borderColor: "#017851",
    borderWidth: scale(1),
    width: "100%",
    height: scale(50),
    borderRadius: scale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  continueText: {
    color: "#017851",
    fontSize: scale(16),
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
  },
  editBtn: {
    marginLeft: "auto", // push it to the right
  },
  editText: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    textDecorationLine: "underline",
  },
});
