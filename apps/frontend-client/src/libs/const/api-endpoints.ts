export const API_ENDPOINTS = {
  // AUTH SERVICE
  SIGN_UP: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signup`,
  VERIFY: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/verify`,
  RESEND_CODE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/resend-code`,
  SIGN_IN: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signin`,
  CHANGE_PASSWORD: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/change-password`,
  RESET_PASSWORD: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/reset-password`,
  CONFIRM_PASSWORD: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/confirm-password`,
  SIGN_IN_WITH_GOOGLE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/google-signin?state=user`,
  LOGOUT: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/logout`,
  REFRESH_TOKEN:`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/refresh-token`,
  // USER SERVICE
  USER_PROFILE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me`,
  USER: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}`,
  ADD_PROPERTY: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/favorite`,
  GET_USER_SAVE_PROPERTY_ID:`${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me/favorites`,
  TOGGLE_FAVOURITE_PROPERTY: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/favorite`,
  GET_PROFILE_USER:`${process.env.NEXT_PUBLIC_USER_ENDPOINT}/profile-user`,
  // PROPERTIES SERVICES
  PROPERTIES: `${process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT}`,
  GET_PROPERTY_BY_ID: `${process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT}/get`,
  MY_PROPERTY: `${process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT}/me`,
  CATEGORIES: `${process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT}/category`,
  NEARLY : `${process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT}/nearby`
};
            