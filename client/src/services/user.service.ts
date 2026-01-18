import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  adminLogin,
  getProfile,
} from "./user.endpoints";

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

//admin login user
export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};

//get profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getProfile(),
  });
};
