export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  response?: {
    status: number;
    data: {
      details: string;
    };
  };
}
