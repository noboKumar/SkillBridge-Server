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

  const result = await prisma.$transaction(async (tx) => {
    const booking = await tx.bookings.create({
      data: {
        studentId: userId,
        tutorId,
        slotId,
        bookingDate,
        price,
        status,
      },
    });

    await tx.availabilitySlots.update({
      where: { id: slotId },
      data: { isBooked: true }
    });

    return booking;
  });

  return result;
};

const getBookings = async (user: user) => {
  let whereCondition: any = {};

  if (user.role === "STUDENT") {
    whereCondition.studentId = user.id;
  } else if (user.role === "TUTOR") {
    const tutorProfile = await prisma.tutorProfiles.findUnique({
      where: { userId: user.id }
    });
    if (!tutorProfile) throw new Error("Tutor profile not found");
    whereCondition.tutorId = tutorProfile.id;
  } else if (user.role === "ADMIN") {
    whereCondition = {};
  }

  const result = await prisma.bookings.findMany({
    where: whereCondition,
    include: {
      slot: true,
      student: { select: { id: true, name: true, email: true, profilePhoto: true } },
      tutor: { include: { user: { select: { id: true, name: true, email: true, profilePhoto: true } } } },
      reviews: true
    },
    orderBy: {
      bookingDate: 'desc'
    }
  });

  return result;
};

const getSingleBookings = async (id: string) => {
  if (!id) {
    throw new Error("id is required");
  }

  const result = await prisma.bookings.findUnique({
    where: {
      id,
    },
    include: {
      slot: true,
    },
  });

  return result;
};

const updateBookingStatus = async (id: string, status: any, user: user) => {
  const booking = await prisma.bookings.findUnique({
    where: { id },
    include: { tutor: true }
  });

  if (!booking) throw new Error("Booking not found");

  if (user.role !== "ADMIN" && booking.tutor.userId !== user.id) {
    throw new Error("Unauthorized to update this booking");
  }

  return await prisma.bookings.update({
    where: { id },
    data: { status }
  });
};

export const bookingsService = {
  createBookings,
  getBookings,
  getSingleBookings,
  updateBookingStatus
};
