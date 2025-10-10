import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

const scale = (size: number) => size; // Replace with your scale function

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  const toggleSwitch = () => {
    const toValue = isOn ? 0 : 1;

    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setIsOn(!isOn);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, scale(42) - scale(24) + 2],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E0E0E0", "#00897B"], // Off: gray, On: teal
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
      <Animated.View
        style={{
          width: scale(42),
          height: scale(24),
          borderRadius: scale(20),
          backgroundColor,
          justifyContent: "center",
          padding: 1,
        }}
      >
        <Animated.View
          style={{
            width: scale(20),
            height: scale(20),
            borderRadius: scale(10),
            backgroundColor: "#FFFFFF",
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ToggleSwitch;
