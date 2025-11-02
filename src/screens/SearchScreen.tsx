import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { scale } from "../utils/dimen";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample data - replace with your actual brands/items
const SAMPLE_BRANDS = [
  "Piatto",
  "Steak House Burgers",
  "Steaks and Grills",
  "Earth Bowl",
  "Pizza Shop",
  "Burger Joint",
];

const RECENT_SEARCHES = [
  "Chicken Pizza",
  "Beef Burger",
  "Pasta",
  "Grilled Chicken",
];

const POPULAR_SEARCHES = [
  "Pizza",
  "Burger",
  "Chicken",
  "Steak",
  "Pasta",
  "Salad",
  "Sandwich",
  "Fries",
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Auto-focus on search input when screen opens
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item !== query);
        return [query, ...filtered].slice(0, 5);
      });

      // Navigate to search results or perform search
      console.log("Searching for:", query);
      // navigation.navigate("SearchResults", { query });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const handleRecentSearchPress = (item: string) => {
    setSearchQuery(item);
    handleSearch(item);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handlePopularSearchPress = (item: string) => {
    setSearchQuery(item);
    handleSearch(item);
  };

  const filteredBrands = SAMPLE_BRANDS.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRecentSearchItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleRecentSearchPress(item)}
    >
      <MaterialIcons name="history" size={20} color="#666" />
      <Text style={styles.listItemText}>{item}</Text>
      <MaterialIcons name="north-west" size={16} color="#999" />
    </TouchableOpacity>
  );

  const renderPopularSearchItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.chipButton}
      onPress={() => handlePopularSearchPress(item)}
    >
      <MaterialIcons name="trending-up" size={16} color="#017851" />
      <Text style={styles.chipText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderBrandItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleSearch(item)}
    >
      <MaterialIcons name="store" size={20} color="#017851" />
      <Text style={styles.listItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Search Header */}
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={22} color="#999" />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search for food, brands..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch(searchQuery)}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <MaterialIcons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          {searchQuery.length > 0 ? (
            // Show filtered results when typing
            <View style={styles.resultsContainer}>
              {filteredBrands.length > 0 ? (
                <>
                  <Text style={styles.sectionTitle}>Brands</Text>
                  <FlatList
                    data={filteredBrands}
                    renderItem={renderBrandItem}
                    keyExtractor={(item, index) => `brand-${index}`}
                    showsVerticalScrollIndicator={false}
                  />
                </>
              ) : (
                <View style={styles.noResultsContainer}>
                  <MaterialIcons name="search-off" size={64} color="#ddd" />
                  <Text style={styles.noResultsText}>
                    No results found for "{searchQuery}"
                  </Text>
                  <Text style={styles.noResultsSubtext}>
                    Try searching for something else
                  </Text>
                </View>
              )}
            </View>
          ) : (
            // Show recent and popular searches when not typing
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <TouchableOpacity onPress={handleClearRecentSearches}>
                      <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                  {recentSearches.map((item, index) => (
                    <TouchableOpacity
                      key={`recent-${index}`}
                      style={styles.listItem}
                      onPress={() => handleRecentSearchPress(item)}
                    >
                      <MaterialIcons name="history" size={20} color="#666" />
                      <Text style={styles.listItemText}>{item}</Text>
                      <MaterialIcons name="north-west" size={16} color="#999" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Popular Searches */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Searches</Text>
                <View style={styles.chipContainer}>
                  {POPULAR_SEARCHES.map((item, index) => (
                    <TouchableOpacity
                      key={`popular-${index}`}
                      style={styles.chipButton}
                      onPress={() => handlePopularSearchPress(item)}
                    >
                      <MaterialIcons
                        name="trending-up"
                        size={16}
                        color="#017851"
                      />
                      <Text style={styles.chipText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Browse Brands */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Browse Brands</Text>
                {SAMPLE_BRANDS.map((item, index) => (
                  <TouchableOpacity
                    key={`browse-${index}`}
                    style={styles.listItem}
                    onPress={() => handleSearch(item)}
                  >
                    <MaterialIcons name="store" size={20} color="#017851" />
                    <Text style={styles.listItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAF1",
  },
  backButton: {
    marginRight: scale(12),
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: scale(12),
    height: scale(44),
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: "#000",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(12),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
    color: "#000",
    marginBottom: scale(12),
  },
  clearText: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#017851",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(12),
    gap: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Rubik-Regular",
    color: "#333",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chipButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9F6",
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderRadius: 20,
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#017851",
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(32),
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
    color: "#333",
    marginTop: scale(16),
    textAlign: "center",
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#999",
    marginTop: scale(8),
    textAlign: "center",
  },
});
