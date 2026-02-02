import { createContext } from "react";
import type { AuthContextValue } from "./authprovider";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
