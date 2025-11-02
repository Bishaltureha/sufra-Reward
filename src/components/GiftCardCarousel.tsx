import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { scale } from "../utils/dimen";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

interface GiftCard {
  key: string;
  comp?: React.ComponentType<{ width: number; height: number }>;
}

interface GiftCardCarouselProps {
  cards: GiftCard[];
  onCardPress?: (index: number) => void;
}

const GiftCardCarousel: React.FC<GiftCardCarouselProps> = ({
  cards,
  onCardPress,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const giftCards = [{ key: "left-spacer" }, ...cards, { key: "right-spacer" }];

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={{ marginVertical: scale(20) }}>
      <Text style={styles.headerText}>Gift Cards for Family & Friends!</Text>
      <Animated.FlatList
        data={giftCards}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.comp) return <View style={{ width: SPACER_ITEM_SIZE }} />;

          const realIndex = index - 1;
          const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
          ];

          const scaleAnim = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });

          const opacityAnim = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });

          const CardComponent = item.comp;

          return (
            <View style={{ width: ITEM_WIDTH }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onCardPress?.(realIndex)}
                disabled={!onCardPress}
              >
                <Animated.View
                  style={[
                    styles.cardContainer,
                    { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
                  ]}
                >
                  <CardComponent width={scale(300)} height={scale(169)} />
                </Animated.View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default GiftCardCarousel;

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 0,
  },
  contentContainer: {
    marginTop: scale(10),
  },
  cardContainer: {
    marginHorizontal: scale(10),
    borderRadius: scale(12),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  headerText: {
    fontSize: scale(18),
    fontWeight: "600",
    marginBottom: scale(8),
    paddingHorizontal: scale(20),
  },
});
