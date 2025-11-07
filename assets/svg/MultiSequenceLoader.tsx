import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

type Props = {
  icons: string[]; // array of SVG xml strings
  size?: number;
  duration?: number; // time per icon (ms)
};

export default function MultiSequenceLoader({
  icons,
  size = 72,
  duration = 1000,
}: Props) {
  const rotation = useSharedValue(0);
  const index = useSharedValue(0); //store index on UI thread

  // continuous smooth rotation handled fully on UI thread
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // safely cycle through icons on the UI thread
  useEffect(() => {
    if (!icons.length) return;

    // run the loop on the UI thread (so JS thread not blocked)
    runOnUI(() => {
      const loop = () => {
        index.value = (index.value + 1) % icons.length;
        // schedule next change
        setTimeout(loop, duration);
      };
      loop();
    })();
  }, [duration, icons.length]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }] as any,
  }));

  // render the current icon using index from shared value (UI-thread safe)
  const CurrentSvg = () => {
    const [svg, setSvg] = React.useState(icons[0]);

    // keep JS synced periodically (non-blocking)
    useEffect(() => {
      const id = setInterval(() => {
        setSvg(icons[Math.floor(index.value) % icons.length]);
      }, 100);
      return () => clearInterval(id);
    }, [icons]);

    return <SvgXml xml={svg} width={size} height={size} />;
  };

  if (!icons.length) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <CurrentSvg />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
