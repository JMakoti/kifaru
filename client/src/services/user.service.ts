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
  getAdminStats,
} from "./user.endpoints";
import type {
  DashboardData,
  FetchUsersParams,
  ForgetPassInput,
  MessageResponse,
  ResetPassInputs,
  User,
  UsersPaginatedResponse,
} from "../types/user.types";
import type { AxiosError } from "axios";

//query keys
export const USERS_QUERY_KEY = ["admin-users"];
export const USERPROFILE_QUERY_KEY = ["user-profile"];
export const ADMIN_STATS_DASH = ["admin-stats-dash"];

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
  return useQuery<UsersPaginatedResponse<User>, Error>({
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

//admin stats
export const useDashboardStats = () => {
  return useQuery<DashboardData>({
    queryKey: ADMIN_STATS_DASH,
    queryFn: getAdminStats,
    staleTime: 1000 * 60 * 5,
  });
};
