// import {
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   ScrollView,
// } from "react-native";
// import React from "react";
// import Drawerlogo from "../../assets/svg/Drawerlogo";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { scale } from "../utils/dimen";
// import { DrawerActions, useNavigation } from "@react-navigation/native";
// import { DrawerParamList, Address } from "../types";
// import { DrawerNavigationProp } from "@react-navigation/drawer";
// import { useAddressContext } from "../context/AddressContext";

// type MyAddressesScreenNavigationProp = DrawerNavigationProp<
//   DrawerParamList,
//   "MyAddresses"
// >;

// const MyAddressesScreen = () => {
//   const navigation = useNavigation<MyAddressesScreenNavigationProp>();
//   const { addresses, selectedAddressId, setSelectedAddressId } =
//     useAddressContext();

//   const handleDrawerToggle = () => {
//     try {
//       navigation.dispatch(DrawerActions.openDrawer());
//     } catch {
//       try {
//         navigation.openDrawer();
//       } catch (fallbackError) {
//         console.error("Drawer not working:", fallbackError);
//       }
//     }
//   };

//   const handleSelect = (cardId: number) => {
//     setSelectedAddressId(cardId);
//   };

//   const handleEdit = (address: Address) => {
//     // Navigate to Add/Edit screen with address data
//     navigation.navigate("AddEditAddress", { address });
//   };

//   const handleAddNew = () => {
//     // Navigate to Add/Edit screen without address data
//     navigation.navigate("AddEditAddress");
//   };

//   const getDisplayType = (address: Address) => {
//     return address.type === "Other" && address.customType
//       ? address.customType
//       : address.type;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ backgroundColor: "#fff", flex: 1 }}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.drawerButton}
//             onPress={handleDrawerToggle}
//           >
//             <Drawerlogo />
//           </TouchableOpacity>
//           <View style={styles.titleContainer}>
//             <Text style={styles.headerTitle}>Addresses</Text>
//           </View>
//           <View style={styles.spacer} />
//         </View>

//         <ScrollView
//           style={{ flex: 1, paddingBottom: scale(120) }}
//           showsVerticalScrollIndicator={false}
//         >
//           {addresses.map((address) => (
//             <View key={address.id} style={styles.cardContainer}>
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => handleSelect(address.id!)}
//                 style={[
//                   address.showMap ? styles.card : styles.smallCard,
//                   selectedAddressId === address.id && styles.selectedCard,
//                 ]}
//               >
//                 <View
//                   style={
//                     address.showMap
//                       ? { flexDirection: "row", alignItems: "center" }
//                       : styles.row
//                   }
//                 >
//                   <View
//                     style={[
//                       styles.radioButton,
//                       selectedAddressId === address.id &&
//                         styles.radioButtonSelected,
//                     ]}
//                   >
//                     {selectedAddressId === address.id && (
//                       <View style={styles.radioButtonInner} />
//                     )}
//                   </View>
//                   <Text style={styles.cardText}>{getDisplayType(address)}</Text>
//                   <TouchableOpacity
//                     style={styles.editBtn}
//                     onPress={() => handleEdit(address)}
//                   >
//                     <Text style={styles.editText}>Edit</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {address.showMap && (
//                   <Image
//                     source={require("../../assets/image/map.png")}
//                     style={{
//                       width: "100%",
//                       height: scale(60),
//                       borderRadius: scale(8),
//                       marginVertical: scale(16),
//                     }}
//                   />
//                 )}

//                 {!address.showMap && (
//                   <View
//                     style={{
//                       width: "100%",
//                       height: scale(1),
//                       backgroundColor: "#E6EAF1",
//                       marginVertical: scale(16),
//                     }}
//                   />
//                 )}

//                 <View
//                   style={address.showMap ? {} : { marginHorizontal: scale(16) }}
//                 >
//                   <Text
//                     style={{
//                       color: "#717171",
//                       fontFamily: "Rubik-Regular",
//                       fontWeight: "400",
//                       fontSize: scale(14),
//                     }}
//                   >
//                     {address.fullAddress}
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#717171",
//                       fontFamily: "Rubik-Medium",
//                       fontWeight: "500",
//                       fontSize: scale(12),
//                       marginTop: scale(4),
//                     }}
//                   >
//                     {address.name} // {address.phone}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Bottom Fixed Section */}
//         <View style={styles.bottomSection}>
//           <TouchableOpacity style={styles.continueBtn} onPress={handleAddNew}>
//             <Text style={styles.continueText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default MyAddressesScreen;

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerParamList, Address, MainStackParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";
import { useAddressContext } from "../context/AddressContext";

/**
 * This screen now supports opening the map picker (AddNewAddress)
 * for both adding and editing addresses.
 */

// Combine Drawer + MainStack navigation for smooth flow
type MyAddressesScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, "MyAddresses">,
  NavigationProp<MainStackParamList>
>;

const MyAddressesScreen = () => {
  const navigation = useNavigation<MyAddressesScreenNavigationProp>();
  const { addresses, selectedAddressId, setSelectedAddressId } =
    useAddressContext();

  // Open Drawer safely
  const handleDrawerToggle = () => {
    try {
      navigation.dispatch(DrawerActions.openDrawer());
    } catch {
      try {
        navigation.openDrawer?.();
      } catch (fallbackError) {
        console.error("Drawer not working:", fallbackError);
      }
    }
  };

  // Select address for order
  const handleSelect = (cardId: number) => {
    setSelectedAddressId(cardId);
  };

  // 🟢 Edit → opens map picker in "edit" mode
  const handleEdit = (address: Address) => {
    navigation.navigate("AddNewAddress", { mode: "edit", address });
  };

  // 🟢 Add New → opens map picker in "add" mode

  const handleAddNew = () => {
    navigation.navigate("AddNewAddress", {
      mode: "add",
      from: "myaddress",
    });
  };

  // Helper: display "Other" type custom name
  const getDisplayType = (address: Address) => {
    return address.type === "Other" && address.customType
      ? address.customType
      : address.type;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {/* Header */}
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

        {/* List of Saved Addresses */}
        <ScrollView
          style={{ flex: 1, paddingBottom: scale(120) }}
          showsVerticalScrollIndicator={false}
        >
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <View key={address.id} style={styles.cardContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelect(address.id!)}
                  style={[
                    address.showMap ? styles.card : styles.smallCard,
                    selectedAddressId === address.id && styles.selectedCard,
                  ]}
                >
                  <View
                    style={
                      address.showMap
                        ? { flexDirection: "row", alignItems: "center" }
                        : styles.row
                    }
                  >
                    <View
                      style={[
                        styles.radioButton,
                        selectedAddressId === address.id &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {selectedAddressId === address.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.cardText}>
                      {getDisplayType(address)}
                    </Text>
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleEdit(address)}
                    >
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                  </View>

                  {address.showMap && (
                    <Image
                      source={require("../../assets/image/map.png")}
                      style={{
                        width: "100%",
                        height: scale(60),
                        borderRadius: scale(8),
                        marginVertical: scale(16),
                      }}
                    />
                  )}

                  {!address.showMap && (
                    <View
                      style={{
                        width: "100%",
                        height: scale(1),
                        backgroundColor: "#E6EAF1",
                        marginVertical: scale(16),
                      }}
                    />
                  )}

                  <View
                    style={
                      address.showMap ? {} : { marginHorizontal: scale(16) }
                    }
                  >
                    <Text
                      style={{
                        color: "#717171",
                        fontFamily: "Rubik-Regular",
                        fontWeight: "400",
                        fontSize: scale(14),
                      }}
                    >
                      {address.fullAddress}
                    </Text>
                    <Text
                      style={{
                        color: "#717171",
                        fontFamily: "Rubik-Medium",
                        fontWeight: "500",
                        fontSize: scale(12),
                        marginTop: scale(4),
                      }}
                    >
                      {address.name} // {address.phone}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: scale(60),
              }}
            >
              <Text
                style={{
                  fontSize: scale(14),
                  color: "#717171",
                  fontFamily: "Rubik-Regular",
                }}
              >
                No addresses yet. Add one below 👇
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Fixed Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.continueBtn} onPress={handleAddNew}>
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
