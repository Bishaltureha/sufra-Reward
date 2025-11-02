declare module "react-native-navigation-bar-color" {
  export default function changeNavigationBarColor(
    color: string,
    light?: boolean,
    immersive?: boolean
  ): Promise<void>;
}
