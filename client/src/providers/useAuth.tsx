// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   loginUser,
//   registerUser,
//   getProfile,
//   logoutUser,
// } from "@/services/user.endpoints";
// import type {
//   LoginFormInputs,
//   RegisterFormInputs,
//   AuthResponse,
//   User,
// } from "@/services/user.types";

// const AUTH_QUERY_KEY = ["auth-user"];

// export function useAuth() {
//   const queryClient = useQueryClient();

//   // Load user from backend if token exists
//   const userQuery = useQuery<User>({
//     queryKey: AUTH_QUERY_KEY,
//     queryFn: getProfile,
//     enabled: !!localStorage.getItem("auth-token"),
//     retry: false,
//   });

//   // Login mutation
//   const loginMutation = useMutation<AuthResponse, any, LoginFormInputs>({
//     mutationFn: loginUser,
//     onSuccess: async () => {
//       const user = await getProfile();
//       queryClient.setQueryData(AUTH_QUERY_KEY, user);
//     },
//   });

//   // Register mutation
//   const registerMutation = useMutation<AuthResponse, any, RegisterFormInputs>({
//     mutationFn: registerUser,
//     onSuccess: async () => {
//       const user = await getProfile();
//       queryClient.setQueryData(AUTH_QUERY_KEY, user);
//     },
//   });

//   // Logout
//   const logout = async () => {
//     await logoutUser();
//     queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
//   };

//   return {
//     user: userQuery.data ?? null,
//     isAuthenticated: !!userQuery.data,
//     isLoading: userQuery.isLoading,

//     login: loginMutation.mutateAsync,
//     register: registerMutation.mutateAsync,
//     logout,

//     loginLoading: loginMutation.isPending,
//     registerLoading: registerMutation.isPending,
//     error:
//       loginMutation.error ||
//       registerMutation.error ||
//       userQuery.error,
//   };
// }
