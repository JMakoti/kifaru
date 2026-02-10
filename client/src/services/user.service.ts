import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getProfile,
  forgetPassword,
  resetPassword,
  updateProfile,
  deleteUser,
  getAdminUsers,
} from "./user.endpoints";
import type {
  FetchUsersParams,
  ForgetPassInput,
  MessageResponse,
  ResetPassInputs,
  User,
} from "./user.types";
import type { AxiosError } from "axios";

//query keys
export const USERS_QUERY_KEY = ["admin-users"];
export const USERPROFILE_QUERY_KEY = ["user-profile"];

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
    queryKey: USERPROFILE_QUERY_KEY,
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
  return useMutation<{ message: string }, Error, ResetPassInputs>({
    mutationFn: resetPassword,
  });
};

// update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(USERPROFILE_QUERY_KEY, updatedUser);
    },
  });
}

//get guest list
export function useAdminUsers(params?: FetchUsersParams) {
  return useQuery<User[], Error>({
    queryKey: params ? [USERS_QUERY_KEY, params] : [USERS_QUERY_KEY],
    queryFn: () => getAdminUsers(params),

    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
}

//admin delete user
export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
  });
}
