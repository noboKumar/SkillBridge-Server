import { prisma } from "../../lib/prisma";
import { tutorProfile } from "../../types";

const getAllTutors = async () => {
  const result = await prisma.tutorProfiles.findMany();
  return result;
};

const getSingleTutor = async (id: string) => {
  const result = await prisma.tutorProfiles.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.categories.findMany();
  return result;
};

const updateTutorProfile = async (payload: tutorProfile, userId: string) => {
  const result = await prisma.tutorProfiles.update({
    where: {
      userId,
    },
    data: {
      bio: payload.bio,
      hourlyRate: payload.hourlyRate,
      experienceYears: payload.experienceYears,
    },
  });
  return result;
};

const updateAvailability = async (
  payload: Record<string, unknown>,
  userId: string,
) => {
  const result = await prisma.availabilitySlots.update({
    where: {
      tutorId: userId,
    },
    data: { ...payload },
  });
  return result;
};

export const tutorsService = {
  getAllTutors,
  getSingleTutor,
  getAllCategories,
  updateTutorProfile,
  updateAvailability,
};
