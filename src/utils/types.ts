export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    OTPVerification: undefined;
    Home: undefined;
    Profile: undefined;
    UserDetail: { name: string; hobby: string; image: string };
    HelpSupport: undefined;
    ReferWin: undefined;
    AppGuide: undefined;
    LoggedInUserProfileScreen: undefined;
    Sidebar: undefined;
    ProfileSettings: { image: string; name: string }; // Adding params for ProfileSettings
    ThemeSelector: undefined; 
  };
  
export type ThemeType = 'light' | 'dark' | 'custom'; // for theme slice