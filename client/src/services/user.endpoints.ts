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
const ADMIN_LOGIN_URL = "/admin/login/";
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
  const { data } = await api.post(REGISTER_URL, payload);
  localStorage.setItem("auth-token", data.access_token);
  return data;
};

//login user
export const loginUser = async (
  credentials: LoginFormInputs,
): Promise<AuthResponse> => {
  const response = await api.post(LOGIN_URL, credentials);
  localStorage.setItem("auth-token", response.data.access_token);
  return response.data;
};

//admin login
export const adminLogin = async (
  payload: LoginFormInputs,
): Promise<AuthResponse> => {
  const { data } = await api.post(ADMIN_LOGIN_URL, payload);
  return data;
};

//logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post(LOGOUT_URL);
  } finally {
    // Clear all auth tokens and storage
    localStorage.removeItem("auth-token");
    localStorage.removeItem("refresh_token");
  }
};
