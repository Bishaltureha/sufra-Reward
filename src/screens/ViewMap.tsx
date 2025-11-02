import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { scale } from "../utils/dimen";
import LoctionPointer from "../../assets/svg/LoctionPointer";

export default function ViewMap() {
  const navigation = useNavigation();

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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={scale(20)} color="#017851" />
      </TouchableOpacity>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region}>
          <Marker coordinate={markerCoord}>
            <View>
              <LoctionPointer />
            </View>
          </Marker>
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? scale(50) : scale(20),
    left: scale(20),
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: scale(20),
    padding: scale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
