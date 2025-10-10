import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import Drawerlogo from "../../assets/svg/Drawerlogo";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../utils/dimen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../types";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFavorite } from "../store/slice/favorites";
import Icon from "react-native-vector-icons/MaterialIcons";

type MyFavoritesScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "MyFavorites"
>;

const MyFavoritesScreen = () => {
  const navigation = useNavigation<MyFavoritesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  const handleDrawerToggle = () => {
    try {
      navigation.dispatch(DrawerActions.openDrawer());
    } catch {
      try {
        navigation.openDrawer();
      } catch (fallbackError) {
        console.error("Drawer not working:", fallbackError);
      }
    }
  };

  const handleRemoveFavorite = (id: number, type: string) => {
    dispatch(removeFavorite({ id, type }));
  };

  const handleFavoritePress = (item: any) => {
    if (item.type === "brand") {
      console.log("Navigate to brand:", item.name);
    } else {
      console.log("Navigate to restaurant:", item.name);
    }
  };

  const renderFavoriteItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() => handleFavoritePress(item)}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.favoriteImage} />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoriteType}>
          {item.type === "brand" ? "Brand" : "Restaurant"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFavorite(item.id, item.type)}
        style={styles.removeButton}
      >
        <Icon name="favorite" size={24} color="#FF617E" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={80} color="#E0E0E0" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding your favorite brands and restaurants
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={{ backgroundColor: "#fff" }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={handleDrawerToggle}
          >
            <Drawerlogo />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Favorites</Text>
          </View>
          <View style={styles.spacer} />
        </View>
        <View
          style={{
            height: Platform.OS === "android" ? 0 : 0,
            backgroundColor: "rgba(0,0,0,1)",
          }}
        />
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MyFavoritesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    height: scale(50),
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: scale(1),
    paddingVertical: scale(0),
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
  listContent: {
    padding: scale(16),
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(12),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(8),
    resizeMode: "cover",
  },
  favoriteInfo: {
    flex: 1,
    marginLeft: scale(12),
  },
  favoriteName: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(16),
    color: "#4A4A4A",
    marginBottom: scale(4),
  },
  favoriteType: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#6D6D6D",
  },
  removeButton: {
    padding: scale(8),
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: scale(40),
  },
  emptyTitle: {
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(20),
    color: "#4A4A4A",
    marginTop: scale(16),
    marginBottom: scale(8),
  },
  emptySubtitle: {
    fontFamily: "Rubik-Regular",
    fontWeight: "400",
    fontSize: scale(14),
    color: "#6D6D6D",
    textAlign: "center",
  },
});
