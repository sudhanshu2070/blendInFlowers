/**
 * Defines the parameter list for the root stack navigator in the application.
 * Each key represents a screen name, and the value represents the parameters
 * that the screen expects.
 * 
 * @typedef {Object} RootStackParamList
 * 
 * @property {undefined} Login - Screen for user login.
 * @property {undefined} Register - Screen for user registration.
 * @property {undefined} OTPVerification - Screen for OTP verification.
 * @property {undefined} Home - Main home screen.
 * @property {undefined} Profile - User profile screen.
 * @property {Object} UserDetail - Screen for displaying user details.
 * @property {string} UserDetail.name - Name of the user.
 * @property {string} UserDetail.hobby - Hobby of the user.
 * @property {string} UserDetail.image - Image URL of the user.
 * @property {undefined} HelpSupport - Screen for help and support.
 * @property {undefined} ReferWin - Screen for referral and win.
 * @property {undefined} AppGuide - Screen for application guide.
 * @property {undefined} LoggedInUserProfileScreen - Screen for logged-in user's profile.
 * @property {undefined} Sidebar - Sidebar screen.
 * @property {Object} ProfileSettings - Screen for profile settings.
 * @property {string} ProfileSettings.image - Image URL for profile settings.
 * @property {string} ProfileSettings.name - Name for profile settings.
 * @property {undefined} ThemeSelector - Screen for selecting themes.
 * @property {undefined} YourSpace - Screen for user's personal space.
 * @property {undefined} NotesScreen - Screen for notes.
 * @property {undefined} Calendar - Screen for calendar.
 * @property {undefined} ImageEditor - Screen for image editing.
 * @property {undefined} AIChatScreen - Screen for AI chat.
 * @property {undefined} UserChatScreen - Screen for user chat.
 * @property {undefined} WeatherScreen - Screen for weather information.
 */

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
    YourSpace: undefined;
    NotesScreen: undefined;
    Calendar: undefined;
    ImageEditor: undefined;
    AIChatScreen: undefined;
    UserChatScreen: undefined;
    WeatherScreen: undefined;
  };
  
export type ThemeType = 'light' | 'dark' | 'custom' | 'default'; // for theme slice