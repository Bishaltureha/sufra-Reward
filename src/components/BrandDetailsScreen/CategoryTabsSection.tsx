import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { scale } from "../../utils/dimen";
import YourPastOrders from "./YourPastOrders";

interface CategoryTabsSectionProps {
  categories: string[];
  activeCategory: string;
  onCategoryPress: (category: string) => void;
  showStickyHeader?: boolean;
}

const CategoryTabsSection: React.FC<CategoryTabsSectionProps> = ({
  categories,
  activeCategory,
  onCategoryPress,
  showStickyHeader = false,
}) => {
  const [textWidths, setTextWidths] = useState<{ [key: string]: number }>({});
  const categoryScrollRef = useRef<ScrollView>(null);

  const handleTextLayout = (item: string, width: number) => {
    setTextWidths((prev) => ({ ...prev, [item]: width }));
  };

  return (
    <View
      style={[
        styles.tabcontainer,
        showStickyHeader && styles.tabcontainerSticky,
      ]}
    >
      <YourPastOrders style={{}} />
      <ScrollView
        ref={categoryScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => onCategoryPress(item)}
          >
            <View style={styles.tabInner}>
              <Text
                onLayout={(e) =>
                  handleTextLayout(item, e.nativeEvent.layout.width)
                }
                style={
                  activeCategory === item
                    ? styles.activeCategoryText
                    : styles.inactiveCategoryText
                }
              >
                {item}
              </Text>
              {activeCategory === item && (
                <View
                  style={[
                    styles.activeIndicator,
                    { width: textWidths[item] || 0 },
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryTabsSection;

const styles = StyleSheet.create({
  tabcontainer: {
    backgroundColor: "#ffffff",
    paddingTop: scale(16),
    marginHorizontal: scale(-16),
    marginTop: scale(0),
  },
  tabcontainerSticky: {
    marginTop: scale(-105),
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
  },
  tabItem: {
    marginRight: scale(16),
  },
  activeCategoryText: {
    fontFamily: "Rubik",
    fontWeight: "700",
    fontSize: scale(14),
    paddingTop: scale(16),
    color: "#4A4A4A",
  },
  inactiveCategoryText: {
    fontFamily: "Rubik",
    fontWeight: "400",
    fontSize: scale(14),
    padding: scale(16),
    color: "#4A4A4A",
  },
  tabInner: {
    alignItems: "center",
  },
  activeIndicator: {
    marginTop: scale(10),
    height: scale(5),
    backgroundColor: "#F6B01F",
    borderRadius: scale(3),
  },
});
{
  /* <View
          style={[
            styles.tabcontainer,
            showStickyHeader && styles.tabcontainerSticky,
          ]}
        >
          <YourPastOrders style={{}} />
          <ScrollView
            ref={categoryScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tabItem}
                activeOpacity={0.7}
                onPress={() => handleCategoryPress(item)}
              >
                <View style={styles.tabInner}>
                  <Text
                    onLayout={(e) =>
                      handleTextLayout(item, e.nativeEvent.layout.width)
                    }
                    style={
                      activeCategory === item
                        ? styles.activeCategoryText
                        : styles.inactiveCategoryText
                    }
                  >
                    {item}
                  </Text>
                  {activeCategory === item && (
                    <View
                      style={[
                        styles.activeIndicator,
                        { width: textWidths[item] || 0 },
                      ]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */
}
