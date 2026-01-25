import axios from "axios";
import type {
  AuthResponse,
  LoginFormInputs,
  RegisterFormInputs,
  User,
} from "./user.types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// endpoints
const REGISTER_URL = "/user/register/";
const LOGIN_URL = "/user/login/";
const PROFILE_URL = "/user/me/";
// const ADMIN_LOGIN_URL = "/admin/login/";
const LOGOUT_URL = "/user/logout/";

// get profile
export const getProfile = async (): Promise<User> => {
  const { data } = await api.get(PROFILE_URL);
  return data;
};

//register user
export const registerUser = async (
  payload: RegisterFormInputs,
): Promise<AuthResponse> => {
  const response = await api.post(REGISTER_URL, payload);
  const { access_token, refresh_token } = response.data;

  // Store access_token in short-lived cookie (1 hour)
  const accessExpiration = new Date();
  accessExpiration.setTime(accessExpiration.getTime() + 60 * 60 * 1000);
  document.cookie = `auth-token=${access_token}; path=/; expires=${accessExpiration.toUTCString()}; SameSite=Strict`;

  // Store refresh_token in secure cookie (7 days)
  const refreshExpiration = new Date();
  refreshExpiration.setTime(
    refreshExpiration.getTime() + 7 * 24 * 60 * 60 * 1000,
  );
  document.cookie = `refresh_token=${refresh_token}; path=/; expires=${refreshExpiration.toUTCString()}; SameSite=Strict`;

  return response.data;
};

//login user
export const loginUser = async (
  credentials: LoginFormInputs,
): Promise<AuthResponse> => {
  const response = await api.post(LOGIN_URL, credentials);
  const { access_token, refresh_token } = response.data;

  // Store access_token in short-lived cookie (1 hour)
  const accessExpiration = new Date();
  accessExpiration.setTime(accessExpiration.getTime() + 60 * 60 * 1000);
  document.cookie = `auth-token=${access_token}; path=/; expires=${accessExpiration.toUTCString()}; SameSite=Strict`;

  // Store refresh_token in secure cookie (7 days)
  const refreshExpiration = new Date();
  refreshExpiration.setTime(
    refreshExpiration.getTime() + 7 * 24 * 60 * 60 * 1000,
  );
  document.cookie = `refresh_token=${refresh_token}; path=/; expires=${refreshExpiration.toUTCString()}; SameSite=Strict`;

  return response.data;
};

//admin login
// export const adminLogin = async (
//   payload: LoginFormInputs,
// ): Promise<AuthResponse> => {
//   const { data } = await api.post(ADMIN_LOGIN_URL, payload);
//   return data;
// };

//logout user
export const logoutUser = async (): Promise<void> => {
  try {
    // Get refresh_token from cookie
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh_token="))
      ?.split("=")[1];

    // Send refresh_token to backend for logout
    if (refreshToken) {
      await api.post(LOGOUT_URL, { refresh_token: refreshToken });
    }
  } finally {
    // Clear all cookies
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict ";
    document.cookie =
      "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
  }
};
