export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};

export type AuthError = {
  code: string;
  message: string;
  response?: {
    data: {
      details: string;
    };
  };
};
