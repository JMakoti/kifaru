import axios from "axios";
import type {
  AuthResponse,
  DashboardData,
  FetchUsersParams,
  ForgetPassInput,
  LoginFormInputs,
  MessageResponse,
  RegisterFormInputs,
  ResetPassInputs,
  User,
  UsersPaginatedResponse,
} from "../types/user.types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// endpoints
const REGISTER_URL = "/user/register/";
const LOGIN_URL = "/user/login/";
const PROFILE_URL = "/user/me/";
// const ADMIN_LOGIN_URL = "/admin/login/";
const LOGOUT_URL = "/user/logout/";
const FORGETPASS_URL = "/user/password-reset/";
const RESETPASS_URL = `/user/password-reset-confirm/{uidb64}/{token}/`;
const EDITPROFILE_URL = "/user/me/";
const GETUSERS_URL = "/user/admin/users/";
const DELETEUSER_URL = "/user/admin/users";
const GETADMINSTATS_URL = "/user/admin/stats/";

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

//forget password
export const forgetPassword = async (
  inputs: ForgetPassInput,
): Promise<MessageResponse> => {
  const { data } = await api.post<MessageResponse>(FORGETPASS_URL, inputs);
  return data;
};

//reset password
export const resetPassword = async (
  inputs: ResetPassInputs,
): Promise<{ message: string }> => {
  const { uidb64, token, password, password_confirm } = inputs;

  const url = RESETPASS_URL.replace("{uidb64}", uidb64).replace(
    "{token}",
    token,
  );

  const { data } = await api.post(url, {
    password,
    password_confirm,
  });

  return data;
};

// edit user
export const updateProfile = async (data: FormData) => {
  const res = await api.patch(EDITPROFILE_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

//get guest list
export const getAdminUsers = async (
  params?: FetchUsersParams,
): Promise<UsersPaginatedResponse<User>> => {
  const response = await api.get<UsersPaginatedResponse<User>>(GETUSERS_URL, {
    params,
  });
  return response.data;
};

//delete user
export const deleteUser = (id: number) =>
  api.delete(`${DELETEUSER_URL}/${id}/`);

//get admin stats
export const getAdminStats = async (): Promise<DashboardData> => {
  const { data } = await api.get(GETADMINSTATS_URL);
  return data;
};
