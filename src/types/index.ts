export type registerUser = {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
};

export type loginUser = {
  email: string;
  password: string;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};
