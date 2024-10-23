export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};

export type AuthError = {
  response: {
    data: {
      details: string;
    };
  };
};
