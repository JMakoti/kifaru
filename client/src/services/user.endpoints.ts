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
  headers: {
    "Content-Type": "application/json",
  },
});

// endpoints
const REGISTER_URL = "/user/register/";
const LOGIN_URL = "/user/login/";
const PROFILE_URL = "/user/me/";

// get profile
export const getMe = async (): Promise<User> => {
  const response = await api.get(PROFILE_URL);
  return response.data;
};

//register user
export const registerUser = async (
  payload: RegisterFormInputs
): Promise<AuthResponse> => {
  const { data } = await api.post(REGISTER_URL, payload);
  return data;
};

//login user
export const loginUser = async (
  payload: LoginFormInputs
): Promise<AuthResponse> => {
  const { data } = await api.post(LOGIN_URL, payload);
  return data;
};