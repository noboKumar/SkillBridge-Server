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

export type bookings = {
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  studentId: string;
  tutorId: string;
  slotId: string;
  bookingDate: Date;
  price: number;
};

export type user = {
  id: string;
  email: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
};

export type tutorProfile = {
  bio: string;
  hourlyRate: number;
  experienceYears: number;
};

export type reviews = {
  rating: number;
  comment: string;
  bookingId: string;
};
