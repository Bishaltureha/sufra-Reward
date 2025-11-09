import LottieView, { AnimationObject } from "lottie-react-native";
import React, { useRef } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { scale } from "../utils/dimen";

interface VTLottieImageProps {
  imageSource: string | AnimationObject | { uri: string };
  customLottieViewStyle?: StyleProp<ViewStyle>;
}

const CloudVTLottieImage: React.FC<VTLottieImageProps> = ({
  imageSource,
  customLottieViewStyle,
}) => {
  const animation = useRef<LottieView>(null);

  return (
    <View>
      <LottieView
        autoPlay
        ref={animation}
        style={[styles.lottieImageStyle, customLottieViewStyle]}
        source={imageSource}
      />
    </View>
  );
};

export default CloudVTLottieImage;

const styles = StyleSheet.create({
  lottieImageStyle: {
    width: scale(80),
    height: scale(30),
    alignSelf: "center",
    resizeMode: "cover",
    marginTop: -5,
    marginBottom: -5,
  },
});
