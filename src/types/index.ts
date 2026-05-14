export type registerUser = {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
  role: "STUDENT" | "TUTOR";
  bio: string;
  hourlyRate: number;
  experienceYears: number;
  categoryId: string;
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

export type userStatusType = {
  status: "ACTIVE" | "BANNED";
};

export type postCategoriesType = {
  name: string;
  description: string;
};

export interface CreatePaymentIntentBody {
  amount: number;          // in cents, e.g. 5000 = $50
  currency?: string;
  session_id: string;
  student_id: string;
  tutor_id: string;
  session_title?: string;
}

export interface PaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
}