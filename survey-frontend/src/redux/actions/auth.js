import { createActionType } from '../../utils/functions';

export const LOGIN = createActionType('LOGIN', 'Authentication');
export const LOGOUT = createActionType('LOGOUT', 'Authentication');
export const REGISTER = createActionType('REGISTER', 'Authentication');
export const VERIFY_REGISTRATION_CODE = createActionType(
  'VERIFY_REGISTRATION_CODE',
  'Authentication'
);
export const VERIFY_USER_BY_EMAIL = createActionType(
  'VERIFY_USER_BY_EMAIL',
  'Authentication'
);
export const RESEND_REG_VERIFICATION_CODE = createActionType(
  'RESEND_REG_VERIFICATION_CODE',
  'Authentication'
);
export const SEND_PASSWORD_RESET_EMAIL = createActionType(
  'SEND_PASSWORD_RESET_EMAIL',
  'Authentication'
);
export const UPDATE_PASSWORD = createActionType(
  'UPDATE_PASSWORD',
  'Authentication'
);
export const FACEBOOK_AUTH = createActionType(
  'FACEBOOK_AUTH',
  'Authentication'
);
export const GOOGLE_AUTH = createActionType('GOOGLE_AUTH', 'Authentication');
export const UPDATE_AUTH_SETTINGS = createActionType(
  'UPDATE_AUTH_SETTINGS',
  'Auth'
);
export const RESET_AUTHENTICATION = createActionType(
  'RESET_AUTHENTICATION',
  'Auth'
);
export const SET_SOCIAL_AUTH_MODE = createActionType(
  'SET_SOCIAL_AUTH_MODE',
  'Authentication'
);

export const login = payload => ({
  type: LOGIN.START,
  payload,
});
export const logout = () => ({ type: LOGOUT.START });
export const register = payload => ({
  type: REGISTER.START,
  payload,
});
export const verifyRegistrationCode = payload => ({
  type: VERIFY_REGISTRATION_CODE.START,
  payload,
});
export const verifyUserByEmail = payload => ({
  type: VERIFY_USER_BY_EMAIL.START,
  payload,
});
export const resendRegVerificationCode = payload => ({
  type: RESEND_REG_VERIFICATION_CODE.START,
  payload,
});

export const sendPasswordResetEmail = payload => ({
  type: SEND_PASSWORD_RESET_EMAIL.START,
  payload,
});
export const resetPassword = payload => ({
  type: UPDATE_PASSWORD.START,
  payload,
});
export const doFacebookAuth = payload => ({
  type: FACEBOOK_AUTH.START,
  payload,
});
export const doGoogleAuth = payload => ({
  type: GOOGLE_AUTH.START,
  payload,
});
export const setSocialAuthMode = (mode = false) => ({
  type: SET_SOCIAL_AUTH_MODE.START,
  payload: mode,
});
export const updateAuthSettings = payload => ({
  type: UPDATE_AUTH_SETTINGS.START,
  payload,
});
export const resetAuthentication = () => ({
  type: RESET_AUTHENTICATION.START,
});
