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