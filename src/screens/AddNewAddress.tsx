import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MainStackParamList } from "../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { scale } from "../utils/dimen";
import SearchIcon from "../../assets/svg/SearchIcon";
import LoctionPointer from "../../assets/svg/LoctionPointer";

export default function AddNewAddress() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const [region, setRegion] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerCoord, setMarkerCoord] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
  });
  const [address, setAddress] = useState(
    "Al Barsha Marina Mall 2781 Build Riyadh, SA"
  );
  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        ...region,
        latitude,
        longitude,
      });
      setMarkerCoord({ latitude, longitude });
      getAddressFromCoords(latitude, longitude);
    }
  };

  const getAddressFromCoords = async (latitude: number, longitude: number) => {
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
    } catch (error) {
      console.log("Error getting address:", error);
    }
  };

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoord({ latitude, longitude });
    getAddressFromCoords(latitude, longitude);
  };

  const handleRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
  };

  const refineLocation = () => {
    const { latitude, longitude } = region;
    setMarkerCoord({ latitude, longitude });
    getAddressFromCoords(latitude, longitude);
  };

  const handleUseAddress = () => {
    navigation.navigate("ConfirmAddress", {
      latitude: markerCoord.latitude,
      longitude: markerCoord.longitude,
      address: address,
    });
  };
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <AntDesign name="left" size={scale(20)} color="#017851" />
        </TouchableOpacity>
        <View style={styles.subHeader}>
          <Text style={styles.newAddress}>Add New Address</Text>
        </View>
        <View style={{ width: scale(30) }} />
      </View>

      <View style={styles.searchContainer}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          placeholder="Search address..."
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onRegionChangeComplete={handleRegionChangeComplete}
          onPress={handleMapPress}
        >
          <Marker coordinate={markerCoord}>
            <View>
              <LoctionPointer />
            </View>
          </Marker>
        </MapView>

        <TouchableOpacity style={styles.refineButton} onPress={refineLocation}>
          <Text style={styles.refineButtonText}>
            Move the map to refine pin location
          </Text>
        </TouchableOpacity>

        <View style={styles.addressBadge}>
          <Text style={styles.addressBadgeText}>{address}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.useAddressButton}
        onPress={handleUseAddress}
      >
        <Text style={styles.useAddressButtonText}>Use this Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: scale(12),
  },
  backArrow: {
    fontSize: scale(24),
    color: "#00a86b",
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#000",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    gap: scale(10),
  },
  searchIcon: {
    fontSize: scale(18),
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(14),
    color: "#666",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  refineButton: {
    position: "absolute",
    top: scale(20),
    alignSelf: "center",
    backgroundColor: "#FF617E",
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    borderRadius: scale(25),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  refineButtonText: {
    color: "#fff",
    fontSize: scale(13),
    fontWeight: "500",
  },
  addressBadge: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#017851",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderRadius: scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
    color: "#000000",
    fontSize: scale(18),
    fontWeight: "600",
    fontFamily: "Rubik-SemiBold",
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    marginStart: scale(8),
    flexDirection: "column",
    alignItems: "flex-start",
  },
  newAddress: {
    color: "#4A4A4A",
    fontFamily: "Rubik-SemiBold",
    fontWeight: "600",
    fontSize: scale(17),
  },
});
