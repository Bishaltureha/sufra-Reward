import '@expo/metro-runtime';
import './gesture-handler';
import { registerRootComponent } from "expo";

import "./src/utils/i18n";
import './src/utils/unistyles'

import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
