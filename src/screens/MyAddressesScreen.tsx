import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type MyAddressesScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "MyAddresses"
>;

const MyAddressesScreen = () => {
  const navigation = useNavigation<MyAddressesScreenNavigationProp>();
  const [selectedCard, setSelectedCard] = useState<number | null>(1);

  const handleDrawerToggle = () => {
    try {
      navigation.dispatch(DrawerActions.openDrawer());
    } catch {
      try {
        navigation.openDrawer();
      } catch (fallbackError) {
        console.error("Drawer not working:", fallbackError);
      }
    }
  };

  const handleSelect = (cardId: number) => {
    setSelectedCard(cardId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={handleDrawerToggle}
          >
            <Drawerlogo />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Addresses</Text>
          </View>
          <View style={styles.spacer} />
        </View>

        <ScrollView
          style={{ flex: 1, paddingBottom: scale(120) }}
          showsVerticalScrollIndicator={false}
        >
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
                  {selectedCard === 1 && (
                    <View style={styles.radioButtonInner} />
                  )}
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

          {/* Business Address Card */}
          <View style={styles.cardContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSelect(2)}
              style={[
                styles.smallCard,
                selectedCard === 2 && styles.selectedCard,
              ]}
            >
              <View style={styles.row}>
                <View
                  style={[
                    styles.radioButton,
                    selectedCard === 2 && styles.radioButtonSelected,
                  ]}
                >
                  {selectedCard === 2 && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.cardText}>Business Address</Text>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => console.log("Edit Business")}
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
              style={[
                styles.smallCard,
                selectedCard === 3 && styles.selectedCard,
              ]}
            >
              <View style={styles.row}>
                <View
                  style={[
                    styles.radioButton,
                    selectedCard === 3 && styles.radioButtonSelected,
                  ]}
                >
                  {selectedCard === 3 && (
                    <View style={styles.radioButtonInner} />
                  )}
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
        </ScrollView>

        {/* Bottom Fixed Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.continueBtn}>
            <Text style={styles.continueText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyAddressesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    height: scale(50),
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: scale(1),
    borderBottomColor: "#E6EAF1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  drawerButton: { padding: scale(4), marginRight: scale(8) },
  titleContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(18),
    color: "#4A4A4A",
    textAlign: "center",
  },
  spacer: {
    width: scale(36),
  },
  cardContainer: { marginTop: scale(12) },
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
    paddingTop: scale(0),
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
    borderTopWidth: scale(1),
    borderColor: "#E6EAF1",
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(24),
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
    marginLeft: "auto",
  },
  editText: {
    color: "#017851",
    fontFamily: "Rubik-Medium",
    fontWeight: "500",
    fontSize: scale(14),
    textDecorationLine: "underline",
  },
});
