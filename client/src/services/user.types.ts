export interface User {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  whatsapp_number: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface AuthError {
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
