import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as Notifications from "expo-notifications";
// import { Audio } from "expo-av";
// import * as Audio from "expo-audio";

export const requestAllPermissions = async () => {
  try {
    // Camera
    const { status: cameraStatus } =
      await Camera.requestCameraPermissionsAsync();
    console.log("Camera permission:", cameraStatus);

    // Microphone
    // const { status: micStatus } = await Audio.requestPermissionsAsync();
    // console.log("Microphone permission:", micStatus);

    // Location
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();
    console.log("Location permission:", locationStatus);

    // Media Library
    const { status: mediaStatus } =
      await MediaLibrary.requestPermissionsAsync();
    console.log("Media Library permission:", mediaStatus);

    // Notifications
    const { status: notifStatus } =
      await Notifications.requestPermissionsAsync();
    console.log("Notification permission:", notifStatus);

    console.log("All permissions requested successfully!");
  } catch (error) {
    console.error("Permission request error:", error);
  }
};
