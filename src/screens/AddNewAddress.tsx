import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MainStackParamList, Address } from "../types";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { scale } from "../utils/dimen";
import SearchIcon from "../../assets/svg/SearchIcon";
import LoctionPointer from "../../assets/svg/LoctionPointer";

type AddNewAddressRouteProp = RouteProp<MainStackParamList, "AddNewAddress">;

export default function AddNewAddress() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<AddNewAddressRouteProp>();
  const { mode, address: existingAddress } = route.params || {};

  const [region, setRegion] = useState({
    latitude: existingAddress?.showMap
      ? Number(existingAddress.fullAddress?.split(",")[0]) || 24.7136
      : 24.7136,
    longitude: existingAddress?.showMap
      ? Number(existingAddress.fullAddress?.split(",")[1]) || 46.6753
      : 46.6753,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [markerCoord, setMarkerCoord] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
  });

  const [address, setAddress] = useState(
    existingAddress?.fullAddress || "Searching current location..."
  );

  const mapRef = useRef<MapView>(null);

  // Get current user location
  useEffect(() => {
    (async () => {
      if (mode === "edit" && existingAddress?.fullAddress) return; // skip geolocation if editing

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        setRegion((prev) => ({ ...prev, latitude, longitude }));
        setMarkerCoord({ latitude, longitude });
        getAddress(latitude, longitude);
      }
    })();
  }, []);

  // Reverse geocode
  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (result[0]) {
        const addr = `${result[0].name || ""}, ${result[0].street || ""}, ${
          result[0].city || ""
        }, ${result[0].region || ""}`;
        setAddress(addr);
      }
    } catch (e) {
      console.warn("Error getting address:", e);
    }
  };

  const handleBack = () => navigation.goBack();

  // Go to ConfirmAddress with data
  const handleUseAddress = () => {
    navigation.navigate("ConfirmAddress", {
      latitude: markerCoord.latitude,
      longitude: markerCoord.longitude,
      address,
      from: route.params?.from,
      mode: route.params?.mode ?? "add",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconWrapper} onPress={handleBack}>
          <AntDesign name="left" size={scale(20)} color="#017851" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {mode === "edit" ? "Edit Address" : "Add New Address"}
        </Text>
        <View style={styles.headerIconWrapper} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Search address..."
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onPress={(e) => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            setMarkerCoord({ latitude, longitude });
            getAddress(latitude, longitude);
          }}
        >
          <Marker coordinate={markerCoord}>
            <LoctionPointer />
          </Marker>
        </MapView>

        <TouchableOpacity style={styles.refineButton}>
          <Text style={styles.refineButtonText}>
            Move the map to refine pin location
          </Text>
        </TouchableOpacity>

        <View style={styles.addressBadge}>
          <Text style={styles.addressBadgeText} numberOfLines={2}>
            {address}
          </Text>
        </View>
      </View>

      {/* Continue */}
      <TouchableOpacity
        style={styles.useAddressButton}
        onPress={handleUseAddress}
      >
        <Text style={styles.useAddressButtonText}>
          {mode === "edit" ? "Update Address" : "Use this Address"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: scale(1),
    borderColor: "#E6EAF1",
  },
  headerIconWrapper: {
    width: scale(30),
    height: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: scale(17),
    fontWeight: "600",
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: scale(16),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: "#e0e0e0",
    gap: scale(10),
  },
  searchInput: { flex: 1, fontSize: scale(14), color: "#666" },
  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },
  refineButton: {
    position: "absolute",
    top: scale(20),
    alignSelf: "center",
    backgroundColor: "#FF617E",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(25),
  },
  refineButtonText: { color: "#fff", fontSize: scale(13), fontWeight: "500" },
  addressBadge: {
    position: "absolute",
    bottom: scale(100),
    left: scale(20),
    right: scale(20),
    backgroundColor: "#017851",
    padding: scale(12),
    borderRadius: scale(20),
  },
  addressBadgeText: {
    color: "#fff",
    fontSize: scale(13),
    fontWeight: "500",
  },
  useAddressButton: {
    backgroundColor: "#F6B01F",
    marginHorizontal: scale(20),
    marginVertical: scale(20),
    paddingVertical: scale(16),
    borderRadius: scale(5),
    alignItems: "center",
  },
  useAddressButtonText: {
    color: "#000",
    fontSize: scale(17),
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
  },
});
