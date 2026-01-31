import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  getProfile,
  forgetPassword,
  resetPassword,
  updateProfile,
  getUsersList,
} from "./user.endpoints";
import type {
  FetchUsersParams,
  ForgetPassInput,
  MessageResponse,
  ResetPassInputs,
  User,
} from "./user.types";
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
      queryClient.setQueryData(["user-profile"], updatedUser);
    },
  });
}

//get guest list
// export function useAdminUsers(params: FetchUsersParams) {
//   const queryFn = () => getUsersList(params);
//   return useQuery<User[], Error>({
//     queryKey: ["admin-users", params],
//     queryFn,
//     keepPreviousData: true,
//   });
// }

export function useAdminUsers(params: FetchUsersParams) {
  return useQuery<User[], Error>({
    queryKey: ["admin-users", params],
    queryFn: () => getUsersList(params),
  });
}
