

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import type {
//   User,
//   LoginFormInputs,
//   RegisterFormInputs,
//   AuthResponse,
// } from "@/services/user.types";
// import {
//   getProfile,
//   loginUser,
//   logoutUser,
//   registerUser,
// } from "../services/user.endpoints";
// import { setupTokenInterceptor } from "@/services/tokenutils";

// interface AuthState {
//   isAuthenticated: boolean;
//   user: User | null;
//   login: (credentials: LoginFormInputs) => Promise<AuthResponse>;
//   register: (credentials: RegisterFormInputs) => Promise<AuthResponse>;
//   logout: () => Promise<void>;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   isLoading: boolean;
//   error: string | null;
//   clearError: () => void;
// }

// const AuthContext = createContext<AuthState | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Setup token interceptor
//   useEffect(() => {
//     setupTokenInterceptor();
//   }, []);

//   const clearError = useCallback(() => setError(null), []);

//   // Restore auth state on app load
//   useEffect(() => {
//     const restoreAuth = async () => {
//       try {
//         const token = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("auth-token="))
//           ?.split("=")[1];

//         if (token) {
//           const userData = await getProfile();
//           setUser(userData);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Failed to restore auth:", error);
//         document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
//         document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict';
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     restoreAuth();
//   }, []);

//   const login = async (credentials: LoginFormInputs): Promise<AuthResponse> => {
//     setIsLoading(true);
//     clearError();
//     try {
//       const authResponse = await loginUser(credentials);
//       const userResponse = await getProfile();
//       setUser(userResponse);
//       setIsLoading(false);
//       return {
//         ...authResponse,
//         user: userResponse,
//       };
//     } catch (error) {
//       setUser(null);
//       setIsLoading(false);
//       throw error;
//     }
//   };

//   // const login = async (credentials: LoginFormInputs) => {
//   //   try {
//   //     await loginUser(credentials);
//   //     const userResponse = await getProfile();
//   //     setUser(userResponse);
//   //     return userResponse;
//   //   } catch (error) {
//   //     console.error("Login failed:", error);
//   //     setUser(null);
//   //     throw error;
//   //   }
//   // };

//   const register = async (credentials: RegisterFormInputs) => {
//     try {
//       const authResponse = await registerUser(credentials);
//       setUser(authResponse.user);
//       return authResponse;
//     } catch (error) {
//       console.error("Register failed:", error);
//       setUser(null);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await logoutUser();
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       // Clear all auth states
//       setUser(null);
//       setError(null);
//       setIsLoading(false);

//       // Clear all localStorage
//       localStorage.removeItem("auth-token");
//       localStorage.removeItem("refresh_token");
//     }
//   };

//   // Check if user is authenticated by checking if token exists in cookies
//   const tokenExists = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("auth-token="))
//     ?.split("=")[1];
  
//   const isAuthenticated = !!user && !!tokenExists;

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         login,
//         register,
//         logout,
//         setUser,
//         isLoading,
//         error,
//         clearError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

