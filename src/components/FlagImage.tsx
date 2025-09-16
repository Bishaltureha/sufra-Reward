// components/FlagImage.js - Create this new component
import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { SvgUri } from "react-native-svg";

interface FlagImageProps {
  source: string | ImageSourcePropType;
  style: any;
  onError?: () => void;
}

const FlagImage: React.FC<FlagImageProps> = ({ source, style, onError }) => {
  // Handle string URLs (including SVG URLs)
  if (typeof source === "string") {
    if (source.endsWith(".svg")) {
      return (
        <SvgUri
          width={style.width}
          height={style.height}
          uri={source}
          onError={onError}
        />
      );
    }
    // For other string URLs (PNG, JPG, etc.)
    return <Image source={{ uri: source }} style={style} onError={onError} />;
  }

  // For require() sources
  return <Image source={source} style={style} onError={onError} />;
};

export default FlagImage;
