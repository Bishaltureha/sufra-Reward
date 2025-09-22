import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import LanguageButton from "../components/LanguageButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }: Props) => {
  const onboardingData = [
    {
      id: "1",
      title: "Welcome to Sufra!",
      subtitle:
        "Your favorite restaurants, personalized rewards, and seamless ordering—all in one place.",
      image: require("../../assets/image/Welcome1.png"),
    },
    {
      id: "2",
      title: "Crave It, Order It",
      subtitle:
        "Explore a variety of dishes from our award-winning restaurants, delivered to your door or ready for pickup.",
      image: require("../../assets/image/Welcome2.png"),
    },
    {
      id: "3",
      title: "Rewards That Taste Better",
      subtitle:
        "Earn points with every order and unlock exclusive perks. The more you dine, the more you save!",
      image: require("../../assets/image/Welcome3.png"),
    },
    {
      id: "4",
      title: "Your Personalized Dining Experience",
      subtitle:
        "Enjoy tailored offers, exclusive discounts, and effortless ordering. Let's get started!",
      image: require("../../assets/image/Welcome4.png"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Half: FlatList Images */}
      <View style={styles.top}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={{ width, height: "100%" }}>
              <View style={{ width, height: "66%" }}>
                <Image
                  source={item.image}
                  style={
                    index === 0
                      ? styles.imageBackground1
                      : styles.imageBackground
                  }
                />
                {/* Buttons on top of image */}
                <View
                  style={{
                    paddingVertical: "7%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    width: "100%",
                  }}
                >
                  {index === 0 && (
                    <LanguageButton
                      flagSource={require("../../assets/image/Usa.png")}
                      label="EN"
                      onPress={() => navigation.navigate("CountryandLanguage")}
                      style={{
                        width: "20%",
                        alignSelf: "center",
                      }}
                    />
                  )}
                  <CustomButton
                    title={"Continue as Guest"}
                    backgroundColor="#ffffff"
                    onPress={() => navigation.navigate("Home")}
                    style={{
                      position: "absolute",
                      right: 10,
                      width: "36.5%",
                      height: 35,
                      // iOS Shadow
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      // Android Shadow
                      elevation: 3,
                    }}
                    textStyle={{
                      fontWeight: "600",
                      fontSize: 12,
                      textAlign: "center",
                      position: "absolute",
                      top: 10,
                    }}
                    textColor={""}
                  />
                </View>
              </View>
              <View style={{ width, height: "34%" }}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {onboardingData[currentIndex].title}
                  </Text>
                  <Text style={styles.subTitle}>
                    {onboardingData[currentIndex].subtitle}
                  </Text>

                  {/* Pagination - Now positioned after subtitle */}
                  <View style={styles.pagination}>
                    {onboardingData.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          currentIndex === index ? styles.activeDot : null,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* Bottom Half: Text + Pagination + Buttons */}
      <View style={styles.bottomHalf}>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={currentIndex === 2 ? "Discover Sufra Benefits" : "Login"}
            backgroundColor="#ffab00"
            onPress={
              currentIndex === 2
                ? () => navigation.navigate("DiscoverSufraBenefits")
                : // : () => navigation.navigate("Login")
                  () => navigation.navigate("Register")
            }
            style={{ paddingVertical: 16 }}
            textColor={"#000000"}
          />
          <CustomButton
            title={"Register"}
            backgroundColor="#ffffff"
            borderColor="black"
            borderWidth={1.5}
            onPress={() => navigation.navigate("Register")}
            style={{ paddingVertical: 16 }}
            textColor={"#4A4A4A"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  top: {
    height: "75%",
  },
  imageBackground1: {
    position: "absolute",
    alignSelf: "center",
    top: 0,
    left: -100,
    right: 0,
    bottom: 0,
    width: "150%",
    height: "100%",
    resizeMode: "cover",
  },
  imageBackground: {
    width,
    height: "100%",
    resizeMode: "cover",
  },
  bottomHalf: {
    height: "25%",
    paddingHorizontal: "7.5%",
    paddingTop: 20,
  },
  textContainer: {
    paddingHorizontal: "7.5%",
    paddingTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#686868ff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
    position: "absolute",
    bottom: 0,
    left: "7.5%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  activeDot: {
    width: 40,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffab00",
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
    position: "absolute",
    bottom: 20,
    left: "7.5%",
  },
});
