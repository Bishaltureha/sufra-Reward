import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { scale } from "../utils/dimen";
import { MaterialIcons } from "@expo/vector-icons";
import RTLText from "./RTLText";

const LanguageButton = ({
  flagSource,
  label,
  onPress,
  style,
  textStyle = undefined,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        <Image source={flagSource} style={styles.flag} />
        <RTLText style={[styles.text, textStyle]}>{label}</RTLText>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={scale(18)}
          color="#000"
          style={{ marginStart: scale(3) }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  button: {
    height: scale(35),
    backgroundColor: "#ffffff",
    borderRadius: scale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    left: scale(10),
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(3),

    // Android Shadow
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    resizeMode: "cover",
    overflow: "hidden",
  },
  text: {
    marginStart: scale(5),
    fontSize: scale(12),
    fontWeight: "600",
  },
});
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Image,
//   Modal,
//   TouchableWithoutFeedback,
//   Dimensions,
// } from "react-native";
// import { scale } from "../utils/dimen";
// import { MaterialIcons } from "@expo/vector-icons";
// import RTLText from "./RTLText";
// import { useLocalization } from "../context/LocalizationContext";
// import { languages } from "../constants/language";

// interface LanguageButtonProps {
//   style?: any;
//   textStyle?: any;
// }

// const LanguageButton: React.FC<LanguageButtonProps> = ({
//   style,
//   textStyle = undefined,
// }) => {
//   const { locale, setLanguage, t } = useLocalization();
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [buttonLayout, setButtonLayout] = useState({
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//   });

//   const currentLanguage =
//     languages.find((l) => l.id === locale) || languages[0];

//   const handleLanguageSelect = (languageCode: string, isRTL: boolean) => {
//     setLanguage(languageCode, isRTL);
//     setDropdownVisible(false);
//   };

//   const handleButtonPress = (event: any) => {
//     // Get button position for dropdown placement
//     event.target.measure(
//       (
//         x: number,
//         y: number,
//         width: number,
//         height: number,
//         pageX: number,
//         pageY: number
//       ) => {
//         setButtonLayout({ x: pageX, y: pageY, width, height });
//       }
//     );
//     setDropdownVisible(true);
//   };

//   const isRTL = locale === "ar";
//   const screenWidth = Dimensions.get("window").width;

//   return (
//     <>
//       <TouchableOpacity
//         style={[styles.button, style]}
//         onPress={handleButtonPress}
//         activeOpacity={0.8}
//       >
//         <View style={styles.row}>
//           <View style={styles.flagConatiner}>
//             <currentLanguage.flag
//               width={scale(20)}
//               height={scale(20)}
//               style={styles.flag}
//             />
//           </View>
//           <RTLText style={[styles.text, textStyle]}>
//             {locale.toUpperCase()}
//           </RTLText>
//           <MaterialIcons
//             name="keyboard-arrow-down"
//             size={scale(18)}
//             color="#000"
//             style={{ marginStart: scale(3) }}
//           />
//         </View>
//       </TouchableOpacity>

//       <Modal
//         visible={dropdownVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setDropdownVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
//           <View style={styles.modalOverlay}>
//             <TouchableWithoutFeedback>
//               <View
//                 style={[
//                   styles.dropdown,
//                   {
//                     top: buttonLayout.y + buttonLayout.height + scale(5),
//                     ...(isRTL
//                       ? {
//                           right:
//                             screenWidth - buttonLayout.x - buttonLayout.width,
//                         }
//                       : { left: buttonLayout.x }),
//                   },
//                 ]}
//               >
//                 {languages.map((language, index) => (
//                   <TouchableOpacity
//                     key={language.id}
//                     style={[
//                       styles.languageOption,
//                       index < languages.length - 1 &&
//                         styles.languageOptionBorder,
//                     ]}
//                     onPress={() =>
//                       handleLanguageSelect(language.id, language.isRTL)
//                     }
//                   >
//                     <View style={styles.languageInfo}>
//                       <language.flag
//                         width={scale(24)}
//                         height={scale(24)}
//                         style={styles.flagIcon}
//                       />
//                       <RTLText style={styles.languageName}>
//                         {language.name}
//                       </RTLText>
//                     </View>
//                     {locale === language.id && (
//                       <MaterialIcons
//                         name="check"
//                         size={scale(20)}
//                         color="#007852"
//                       />
//                     )}
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </>
//   );
// };

// export default LanguageButton;

// const styles = StyleSheet.create({
//   button: {
//     height: scale(35),
//     backgroundColor: "#ffffff",
//     borderRadius: scale(5),
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//     position: "absolute",
//     left: scale(10),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: scale(2) },
//     shadowOpacity: 0.2,
//     shadowRadius: scale(3),
//     elevation: 3,
//     paddingHorizontal: scale(10),
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   flagConatiner: {
//     width: scale(20),
//     height: scale(20),
//     borderRadius: scale(10),
//     overflow: "hidden",
//   },
//   flag: {
//     width: "100%",
//     height: "100%",
//   },
//   text: {
//     marginStart: scale(5),
//     fontSize: scale(12),
//     fontWeight: "600",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   dropdown: {
//     position: "absolute",
//     backgroundColor: "#ffffff",
//     borderRadius: scale(8),
//     paddingVertical: scale(8),
//     minWidth: scale(180),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: scale(4) },
//     shadowOpacity: 0.25,
//     shadowRadius: scale(8),
//     elevation: 8,
//   },
//   languageOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: scale(12),
//     paddingHorizontal: scale(16),
//   },
//   languageOptionBorder: {
//     borderBottomWidth: scale(1),
//     borderBottomColor: "#e0e0e0",
//   },
//   languageInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   flagIcon: {
//     borderRadius: scale(12),
//     marginEnd: scale(12),
//     overflow: "hidden",
//   },
//   languageName: {
//     fontSize: scale(14),
//     fontWeight: "400",
//     color: "#333",
//   },
// });
