import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./user.endpoints";


export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};