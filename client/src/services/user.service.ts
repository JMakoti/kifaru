import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getProfile,
  forgetPassword,
  resetPassword,
} from "./user.endpoints";
import type { ForgetPassInput, MessageResponse, ResetPassInputs } from "./user.types";
import type { AxiosError } from "axios";

//register user
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

//login user
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

//get profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getProfile(),
  });
};

//forget password
export const useForgetPassword = () => {
  return useMutation<MessageResponse, AxiosError, ForgetPassInput>({
    mutationFn: forgetPassword,
  });
};

//reset password
export const useResetPassword = () => {
  return useMutation<{ message: string }, Error, ResetPassInputs
  >({
    mutationFn: resetPassword,
  });
};
