import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Splash: undefined;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Language: undefined;
  CountryandLanguage: undefined;
  DiscoverSufraBenefits: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Otp: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  InformationScreen: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  DeliveryScreen: undefined;
  DineInScreen: undefined;
  TopTabScreen: { screen?: "Delivery" | "DineIn" };
  Notification: undefined;
  Deals: undefined;
  GetHelp: undefined;
  FAQ: undefined;
  Profile: undefined;
  FindStores: undefined;
  Loyalty: undefined;
  BrandDetails: {
    brandImage: any;
    brandName: string;
    brandId: number;
  };
};

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
};
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
