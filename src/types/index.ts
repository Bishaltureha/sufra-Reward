export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  DiscoverSufraBenefits: undefined;
  CountryandLanguage: undefined;
  Language: undefined;
  Home: undefined;
  Login: undefined;
  Otp: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  InformationScreen: undefined;
  DeliveryScreen: undefined;
  DineInScreen: undefined;
  TopTabScreen: { screen?: "Delivery" | "DineIn" };
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
