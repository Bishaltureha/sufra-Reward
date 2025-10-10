// src/hooks/useLocation.ts
import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import * as Location from "expo-location";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setLocationLoading,
  setLocationEnabled,
  setLocationData,
  setLocationError,
} from "../store/slice/location";

export const useLocation = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location);

  // Check location permission status
  const checkLocationStatus = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        // Permission granted, get location
        await fetchLocation();
      } else {
        // Permission not granted
        dispatch(setLocationEnabled(false));
      }
    } catch (error) {
      console.error("Error checking location status:", error);
      dispatch(setLocationEnabled(false));
    }
  };

  // Fetch current location
  const fetchLocation = async () => {
    try {
      dispatch(setLocationLoading(true));

      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const addressData = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });

      if (addressData && addressData.length > 0) {
        dispatch(
          setLocationData({
            coords: {
              latitude: locationData.coords.latitude,
              longitude: locationData.coords.longitude,
            },
            address: {
              street: addressData[0].street || undefined,
              city: addressData[0].city || undefined,
              region: addressData[0].region || undefined,
              country: addressData[0].country || undefined,
              postalCode: addressData[0].postalCode || undefined,
              name: addressData[0].name || undefined,
              district: addressData[0].district || undefined,
            },
          })
        );
      }

      dispatch(setLocationLoading(false));
    } catch (error) {
      console.error("Error fetching location:", error);
      dispatch(setLocationError("Failed to fetch location"));
      dispatch(setLocationLoading(false));
    }
  };

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        await fetchLocation();
        return true;
      } else {
        dispatch(setLocationEnabled(false));
        return false;
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
      dispatch(setLocationError("Failed to request permission"));
      return false;
    }
  };

  // Monitor app state changes (detects when user enables/disables location from settings)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          // App came to foreground, check location status
          checkLocationStatus();
        }
      }
    );

    // Initial check
    checkLocationStatus();

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    ...location,
    checkLocationStatus,
    fetchLocation,
    requestLocationPermission,
  };
};
