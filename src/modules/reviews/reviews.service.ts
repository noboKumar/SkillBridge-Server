import { prisma } from "../../lib/prisma";
import { reviews } from "../../types";

const postReview = async (payload: reviews, studentId: string) => {
  const booking = await prisma.bookings.findUnique({
    where: { id: payload.bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.studentId !== studentId) {
    throw new Error("Unauthorized");
  }

  if (booking.status !== "COMPLETED") {
    throw new Error("Cannot review before completion");
  }

  const existing = await prisma.reviews.findUnique({
    where: { bookingId: payload.bookingId },
  });

  if (existing) {
    throw new Error("Review already exists");
  }

  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const result = await prisma.reviews.create({
    data: {
      bookingId: payload.bookingId,
      studentId: studentId,
      tutorId: booking.tutorId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
  return result;
};

export const reviewService = {
  postReview,
};
