// import { NavigatorScreenParams } from "@react-navigation/native";

// export type RootStackParamList = {
//   Splash: undefined;
//   OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
//   AuthStack: NavigatorScreenParams<AuthStackParamList>;
//   MainStack: NavigatorScreenParams<MainStackParamList>;
// };

// export type OnboardingStackParamList = {
//   Welcome: undefined;
//   Language: undefined;
//   CountryandLanguage: undefined;
//   DiscoverSufraBenefits: undefined;
// };

// export type AuthStackParamList = {
//   Login: undefined;
//   Otp: undefined;
//   Register: undefined;
//   ForgetPassword: undefined;
//   InformationScreen: undefined;
// };

// // Address interface for type safety
// export interface Address {
//   id?: number;
//   type: "Home" | "Work" | "Other";
//   customType?: string;
//   fullAddress: string;
//   buildingNo: string;
//   floor?: string;
//   apartment?: string;
//   name: string;
//   phone: string;
//   additionalInfo?: string;
//   showMap?: boolean;
// }

// export type MainStackParamList = {
//   Home: NavigatorScreenParams<DrawerParamList>;
//   DeliveryScreen: undefined;
//   DineInScreen: undefined;
//   TopTabScreen: { screen?: "Delivery" | "DineIn" };
//   Notification: undefined;
//   Deals: undefined;
//   GetHelp: undefined;
//   FAQ: undefined;
//   Profile: undefined;
//   FindStores: undefined;
//   Drawer: NavigatorScreenParams<DrawerParamList>;
//   Loyalty: { initialTab?: "transaction" | "tier" } | undefined;
//   BrandDetails: {
//     brandImage: any;
//     brandName: string;
//     brandId: number;
//   };
//   ProductDetails: {
//     productData: any;
//   };
//   ProductDetailsWithImage: {
//     productData: any;
//   };
//   AddNewAddress: undefined;
//   Recommendation: undefined;
//   CartScreen: undefined;
//   Payment: {
//     deliveryAddress?: {
//       latitude: number;
//       longitude: number;
//       fullAddress: string;
//       addressName: string;
//       city: string;
//       area: string;
//       street: string;
//       buildingName: string;
//       floor: string;
//       doorNo: string;
//       instructions: string;
//     };
//   };
//   SelectDeliveryAddress: undefined;
//   ConfirmAddress: {
//     latitude: number;
//     longitude: number;
//     address: string;
//     name?: string;
//     street?: string;
//     city?: string;
//     region?: string;
//   };
//   YourOrder: undefined;
//   Search: undefined;
//   AddEditAddress: {
//     address?: Address;
//   };
//   ViewMap: undefined;
//   TermsAndConditions: undefined;
//   PointsScreen: undefined;
//   Tiers: undefined;
//   ReferAFriend: undefined;
//   ProfileInformation: {
//     fromExtra?: boolean;
//     birthDate?: string;
//     gender?: string;
//     nationality?: string;
//     preferredChannels?: string[];
//     favoriteCuisines?: string[];
//     allergens?: string[];
//   };
//   TransactionHistory: undefined;
//   UserAgreements: undefined;
//   ExtraInformation: undefined;
//   DrawerRoot: NavigatorScreenParams<DrawerParamList>;
// };

// export type DrawerParamList = {
//   Home: undefined;
//   GiftCards: undefined;
//   TopTabScreen: { screen?: "Delivery" | "DineIn" };
//   Deals: undefined;
//   BookCatering: undefined;
//   MyFavorites: undefined;
//   MyOrders: undefined;
//   MyAddresses: undefined;
//   MyPaymentMethods: undefined;
//   GetHelp: undefined;
//   FAQ: undefined;
//   Notification: undefined;
//   Profile: undefined;
//   OrderTracking: undefined;
//   AddEditAddress: {
//     address?: Address;
//   };
//   ProfileInformation: {
//     fromExtra?: boolean;
//     birthDate?: string;
//     gender?: string;
//     nationality?: string;
//     preferredChannels?: string[];
//     favoriteCuisines?: string[];
//     allergens?: string[];
//   };
//   TransactionHistory: undefined;
//   UserAgreements: undefined;
//   ExtraInformation: undefined;
// };

// export type GiftCardStackParamList = {
//   GiftCardsMain: undefined;
//   Payment: {
//     selectedAmount?: string | null;
//     activeCardIndex?: number;
//     isBuyingForMyself?: boolean;
//     recipientName?: string;
//     recipientEmail?: string;
//     verifyRecipientEmail?: string;
//     recipientPhone?: string;
//     personalNote?: string;
//     senderName?: string;
//     senderEmail?: string;
//     senderPhone?: string;
//   };
//   PaymentDone: {
//     selectedAmount: number;
//     selectedCardComponent: React.ComponentType<any>;
//     recipientName: string;
//   };
// };

import { NavigatorScreenParams } from "@react-navigation/native";

// 🏁 Root Stack
export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

// 🎬 Onboarding Stack
export type OnboardingStackParamList = {
  Welcome: undefined;
  Language: undefined;
  CountryandLanguage: undefined;
  DiscoverSufraBenefits: undefined;
};

// 🔐 Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Otp: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  InformationScreen: undefined;
};

// 🏠 Address Interface
export interface Address {
  id?: number;
  type: "Home" | "Work" | "Other";
  customType?: string;
  fullAddress: string;
  buildingNo: string;
  floor?: string;
  apartment?: string;
  name: string;
  phone: string;
  additionalInfo?: string;
  showMap?: boolean;
}

// 🧾 Cart + Order Types
export interface CartItem {
  id: number;
  name: string;
  image: any;
  quantity: number;
  price: number;
}

export interface OrderSummary {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  restaurantName: string;
}

// 🚀 Main Stack
export type MainStackParamList = {
  Home: NavigatorScreenParams<DrawerParamList>;
  DeliveryScreen: undefined;
  DineInScreen: undefined;
  TopTabScreen: { screen?: "Delivery" | "DineIn" };
  Notification: undefined;
  Deals: undefined;
  GetHelp: undefined;
  FAQ: undefined;
  Profile: undefined;
  FindStores: undefined;
  Drawer: NavigatorScreenParams<DrawerParamList>;
  Loyalty: { initialTab?: "transaction" | "tier" } | undefined;

  // 🔥 Brand & Product Flow
  BrandDetails: {
    brandImage: any;
    brandName: string;
    brandId: number;
  };
  ProductDetails: {
    productData: any;
  };
  ProductDetailsWithImage: {
    productData: any;
  };

  AddNewAddress: undefined;
  Recommendation: undefined;

  // 🛒 Order Flow
  CartScreen: {
    cartItems: CartItem[];
  };
  Payment: {
    deliveryAddress?: {
      latitude: number;
      longitude: number;
      fullAddress: string;
      addressName: string;
      city: string;
      area: string;
      street: string;
      buildingName: string;
      floor: string;
      doorNo: string;
      instructions: string;
    };
    cartItems: CartItem[];
  };
  YourOrder: {
    order: OrderSummary;
  };

  SelectDeliveryAddress: undefined;
  ConfirmAddress: {
    latitude: number;
    longitude: number;
    address: string;
    name?: string;
    street?: string;
    city?: string;
    region?: string;
  };
  Search: undefined;

  // 🧭 Address Management
  AddEditAddress: {
    address?: Address;
  };
  ViewMap: undefined;

  // 📋 Miscellaneous
  TermsAndConditions: undefined;
  PointsScreen: undefined;
  Tiers: undefined;
  ReferAFriend: undefined;
  ProfileInformation: {
    fromExtra?: boolean;
    birthDate?: string;
    gender?: string;
    nationality?: string;
    preferredChannels?: string[];
    favoriteCuisines?: string[];
    allergens?: string[];
  };
  TransactionHistory: undefined;
  UserAgreements: undefined;
  ExtraInformation: undefined;
  DrawerRoot: NavigatorScreenParams<DrawerParamList>;
};

// 📂 Drawer Stack
export type DrawerParamList = {
  Home: undefined;
  GiftCards: undefined;
  TopTabScreen: { screen?: "Delivery" | "DineIn" };
  Deals: undefined;
  BookCatering: undefined;
  MyFavorites: undefined;
  MyOrders: undefined;
  MyAddresses: undefined;
  MyPaymentMethods: undefined;
  GetHelp: undefined;
  FAQ: undefined;
  Notification: undefined;
  Profile: undefined;
  OrderTracking: undefined;
  AddEditAddress: {
    address?: Address;
  };
  ProfileInformation: {
    fromExtra?: boolean;
    birthDate?: string;
    gender?: string;
    nationality?: string;
    preferredChannels?: string[];
    favoriteCuisines?: string[];
    allergens?: string[];
  };
  TransactionHistory: undefined;
  UserAgreements: undefined;
  ExtraInformation: undefined;
};

// 🎁 Gift Card Flow
export type GiftCardStackParamList = {
  GiftCardsMain: undefined;
  Payment: {
    selectedAmount?: string | null;
    activeCardIndex?: number;
    isBuyingForMyself?: boolean;
    recipientName?: string;
    recipientEmail?: string;
    verifyRecipientEmail?: string;
    recipientPhone?: string;
    personalNote?: string;
    senderName?: string;
    senderEmail?: string;
    senderPhone?: string;
  };
  PaymentDone: {
    selectedAmount: number;
    selectedCardComponent: React.ComponentType<any>;
    recipientName: string;
  };
};
