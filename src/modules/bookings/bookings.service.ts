import { prisma } from "../../lib/prisma";
import { bookings, user } from "../../types";

const createBookings = async (payload: bookings, user: user) => {
  if (user.role !== "STUDENT") {
    throw new Error("User is not a student");
  }

  const slot = await prisma.availabilitySlots.findUnique({
    where: {
      id: payload.slotId,
    },
    include: {
      tutor: true,
    },
  });

  if (!slot) {
    throw new Error("Slot not found");
  }

  if (!slot.tutor) {
    throw new Error("Tutor profile not found");
  }

  const existingBooking = await prisma.bookings.findFirst({
    where: {
      slotId: payload.slotId,
    },
  });

  if (existingBooking) {
    throw new Error("slot already booked");
  }

  const userId = user.id;
  const tutorId = slot.tutor.id;
  const slotId = slot.id;
  const bookingDate = new Date();
  const price = slot.tutor?.hourlyRate || 0;
  const status = "CONFIRMED";

  const result = await prisma.bookings.create({
    data: {
      studentId: userId,
      tutorId,
      slotId,
      bookingDate,
      price,
      status,
    },
  });

  return result;
};

export const bookingsService = {
  createBookings,
};
