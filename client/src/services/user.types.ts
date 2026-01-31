export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  whatsapp_number?: string;
  role: "admin" | "staff" | "concierge" | "property_manager" | "external";
  preferred_language?: string;
  country_of_residence?: string;
  is_returning_guest?: boolean,
  // special_preferences: Record<string, any>;
  is_active: boolean;
  is_verified: boolean;
  is_staff: boolean;
  date_joined: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  message?: string;
}

export interface AuthError {
  message: string;
}

export interface MessageResponse {
  message: string;
}


export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface RegisterFormInputs extends LoginFormInputs {
  first_name: string;
  last_name: string;
  phone_number: string;
  whatsapp_number: string;
  password: string;
  password_confirm: string;
}

export interface ForgetPassInput {
  email: string;
}

export interface ResetPassInputs {
  password: string;
  password_confirm: string;
  uidb64: string;
  token: string;
}


export interface FetchUsersParams {
  role?: string;
  is_active?: string;
  is_verified?: string;
  search?: string;
  ordering?: string;
}
