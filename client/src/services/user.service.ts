import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "./user.endpoints";

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
