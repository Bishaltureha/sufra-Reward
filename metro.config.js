const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

// Alias react-native-maps to @teovilla/react-native-web-maps for web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native-maps" && platform === "web") {
    return context.resolveRequest(
      context,
      "@teovilla/react-native-web-maps",
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
