import UKFlag from "../../assets/flags/1x1/gb.svg";
import SaudiFlag from "../../assets/flags/1x1/sa.svg";

export const languages = [
  { id: "en", name: "English", flag: UKFlag, isRTL: false },
  { id: "ar", name: "العربية", flag: SaudiFlag, isRTL: true },
];

export const translations = {
  en: {
    common: {
      language: "Language",
      confirm: "Confirm",
      ok: "OK",
      cancel: "Cancel",
      continue: "Continue",
      registerNow: "Register Now",
      countryAndLanguage: "Country & Language",
    },
    language: {
      chooseYourLanguage: "Choose Your Language",
      selectedAlertTitle: "Language Selected",
      selectedAlertMessage: "You have selected: {{name}}",
    },
    login: {
      title: "Enter your phone number\nand password",
      passwordPlaceholder: "Password",
      forgotPassword: "Forgot Password",
      signIn: "Sign In",
      noAccount: "If you don't have an account",
      registerNow: "Register Now",
    },
    register: {
      title: "Enter your phone number \nand continue",
    },
    forgotPassword: {
      title: "Forgot Password",
      subtitle: "Please enter the phone number you \nregistered with",
      sendPassword: "Send Password",
    },
    otp: {
      title: "Verify your phone and login \nyour account",
      codeLabel: "2FA Confirmation Code",
      leftSuffix: "Left",
      didntReceive: "Didn't receive the code?",
      resendCode: "Resend Code",
    },
    benefits: {
      tiersTitle: "Tiers",
      bannerTitle: "T I E R S",
      bannerSubtitle: "From Star to Legend",
      tierNames: ["STAR", "ICON", "LEGEND"],
      matrix: [
        [
          "Earn and burn\npoints on dine-in\nand online orders",
          "All Star Tier\ndenefits",
          "All Star and Icon\nTier benefits",
        ],
        [
          "Member-only\ndining in and\ndelivery promoti...",
          "Tier upgrade gift",
          "Invitations to\nspecial events",
        ],
        [
          "Birthday gift",
          "Enhanced bonus\npoints\nopportunities",
          "VIP Hotline",
        ],
        [
          "Bonus points\nopportunities",
          "Priority seating",
          "EArly accesee to\nnew menu items",
        ],
        [
          "Loyalty Tier for\nkids",
          "More chances to\nwin at prize draws",
          "Access ti Chef",
        ],
        ["-", "Complimentary \n delights and \n surprises", "-"],
      ],
    },
    info: {
      title: "Enter your information to \ncontinue",
      firstName: "First Name*",
      lastName: "Last Name*",
      email: "Email Address*",
      acceptTerms: "I accept the ",
      termsAndConditions: "Terms and Conditions",
      receiveOffers: "Receive offers and promotions",
    },
    welcome: {
      continueAsGuest: "Continue as Guest",
      login: "Login",
      register: "Register",
      discoverBenefits: "Discover Sufra Benefits",
    },
    countryPicker: {
      selectTitle: "Select Country",
      searchPlaceholder: "Search country or language",
      noResultsTitle: "No countries found",
      noResultsSubtitle: "Try adjusting your search terms",
    },
    phone: {
      placeholder: "Phone number",
      invalid: "Please enter a valid phone number",
    },
    onboarding: [
      {
        title: "Welcome to Sufra!",
        subtitle:
          "Your favorite restaurants, personalized rewards, and seamless ordering—all in one place.",
      },
      {
        title: "Crave It, Order It",
        subtitle:
          "Explore a variety of dishes from our award-winning restaurants, delivered to your door or ready for pickup.",
      },
      {
        title: "Rewards That Taste Better",
        subtitle:
          "Earn points with every order and unlock exclusive perks. The more you dine, the more you save!",
      },
      {
        title: "Your Personalized Dining Experience",
        subtitle:
          "Enjoy tailored offers, exclusive discounts, and effortless ordering. Let's get started!",
      },
    ],
  },
  ar: {
    common: {
      language: "اللغة",
      confirm: "تأكيد",
      ok: "حسناً",
      cancel: "إلغاء",
      continue: "متابعة",
      registerNow: "سجّل الآن",
      countryAndLanguage: "الدولة واللغة",
    },
    language: {
      chooseYourLanguage: "اختر لغتك",
      selectedAlertTitle: "تم اختيار اللغة",
      selectedAlertMessage: "لقد اخترت: {{name}}",
    },
    login: {
      title: "أدخل رقم هاتفك\nوكلمة المرور",
      passwordPlaceholder: "كلمة المرور",
      forgotPassword: "هل نسيت كلمة المرور",
      signIn: "تسجيل الدخول",
      noAccount: "إذا لم يكن لديك حساب",
      registerNow: "سجّل الآن",
    },
    register: {
      title: "أدخل رقم هاتفك \nوتابع",
    },
    forgotPassword: {
      title: "نسيت كلمة المرور",
      subtitle: "يرجى إدخال رقم الهاتف الذي \nسجلت به",
      sendPassword: "إرسال كلمة المرور",
    },
    otp: {
      title: "تحقق من هاتفك وسجل \nالدخول إلى حسابك",
      codeLabel: "رمز التحقق الثنائي",
      leftSuffix: "متبقي",
      didntReceive: "لم تستلم الرمز؟",
      resendCode: "إعادة إرسال الرمز",
    },
    benefits: {
      tiersTitle: "الدرجات",
      bannerTitle: "الــدرجــات",
      bannerSubtitle: "من ستار إلى ليجند",
      tierNames: ["STAR", "ICON", "LEGEND"],
      matrix: [
        [
          "Earn and burn\npoints on dine-in\nand online orders",
          "All Star Tier\ndenefits",
          "All Star and Icon\nTier benefits",
        ],
        [
          "Member-only\ndining in and\ndelivery promoti...",
          "Tier upgrade gift",
          "Invitations to\nspecial events",
        ],
        [
          "Birthday gift",
          "Enhanced bonus\npoints\nopportunities",
          "VIP Hotline",
        ],
        [
          "Bonus points\nopportunities",
          "Priority seating",
          "EArly accesee to\nnew menu items",
        ],
        [
          "Loyalty Tier for\nkids",
          "More chances to\nwin at prize draws",
          "Access ti Chef",
        ],
        ["-", "Complimentary \n delights and \n surprises", "-"],
      ],
    },
    info: {
      title: "أدخل معلوماتك \nللمتابعة",
      firstName: "الاسم الأول*",
      lastName: "اسم العائلة*",
      email: "البريد الإلكتروني*",
      acceptTerms: "أوافق على ",
      termsAndConditions: "الشروط والأحكام",
      receiveOffers: "استقبال العروض والترويجات",
    },
    welcome: {
      continueAsGuest: "المتابعة كضيف",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      discoverBenefits: "اكتشف مزايا سفرة",
    },
    countryPicker: {
      selectTitle: "اختر الدولة",
      searchPlaceholder: "ابحث عن دولة أو لغة",
      noResultsTitle: "لا توجد دول",
      noResultsSubtitle: "جرّب تعديل كلمات البحث",
    },
    phone: {
      placeholder: "رقم الهاتف",
      invalid: "يرجى إدخال رقم هاتف صالح",
    },
    onboarding: [
      {
        title: "مرحبًا بك في سفرة!",
        subtitle:
          "مطاعمك المفضلة، ومكافآت مخصصة، وطلب سلس — كل ذلك في مكان واحد.",
      },
      {
        title: "اشتهِه واطلبه",
        subtitle:
          "استكشف مجموعة متنوعة من الأطباق من مطاعمنا الحائزة على جوائز، والتوصيل إلى بابك أو الاستلام.",
      },
      {
        title: "مكافآت تَزداد لذّة",
        subtitle:
          "اكسب نقاطًا مع كل طلب وافتح مزايا حصرية. كلما تناولت أكثر، ادّخرت أكثر!",
      },
      {
        title: "تجربة طعام مخصصة لك",
        subtitle: "استمتع بعروض مخصصة وخصومات حصرية وطلب دون عناء. هيا نبدأ!",
      },
    ],
  },
} as const;

export type AppTranslations = typeof translations;
export type AppLocale = keyof AppTranslations;
