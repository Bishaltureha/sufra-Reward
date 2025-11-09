import React, { useRef, useEffect } from "react";
import {
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
const CARD_WIDTH = ITEM_WIDTH - scale(20); // Account for horizontal margins
const CARD_HEIGHT = CARD_WIDTH * 0.56; // Maintain aspect ratio (approximately 16:9)

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
  const flatListRef = useRef<FlatList>(null);
  const giftCards = [{ key: "left-spacer" }, ...cards, { key: "right-spacer" }];

  useEffect(() => {
    // Scroll to index 2 (which is the second actual card, after the left spacer)
    if (flatListRef.current && cards.length > 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: ITEM_WIDTH,
          animated: false,
        });
      }, 100);
    }
  }, []);

  return (
    <View style={{ marginVertical: scale(20) }}>
      <Text style={styles.headerText}>Gift Cards for Family & Friends!</Text>
      <FlatList
        ref={flatListRef}
        data={giftCards}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => {
          if (!item.comp) return <View style={{ width: SPACER_ITEM_SIZE }} />;

          const realIndex = index - 1;
          const CardComponent = item.comp;

          return (
            <View style={{ width: ITEM_WIDTH }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onCardPress?.(realIndex)}
                disabled={!onCardPress}
              >
                <View style={styles.cardContainer}>
                  <CardComponent width={CARD_WIDTH} height={CARD_HEIGHT} />
                </View>
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
    overflow: "hidden",
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
