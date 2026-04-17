import { prisma } from "../../lib/prisma";
import { postCategoriesType, tutorProfile } from "../../types";

const getAllTutors = async () => {
  const result = await prisma.tutorProfiles.findMany({
    include: {
      user: {
        select: {
          name: true,
          profilePhoto: true,
        },
      },
      category: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });
  return result;
};

// get featured teachers
const getFeaturedTutors = async () => {
  const result = await prisma.tutorProfiles.findMany({
    take: 4,
    include: {
      user: {
        select: {
          name: true,
          profilePhoto: true,
        },
      },
      category: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });
  return result;
};

const getSingleTutor = async (id: string) => {
  const result = await prisma.tutorProfiles.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          profilePhoto: true,
        },
      },
      category: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });
  return result;
};

// get all categories
const getAllCategories = async () => {
  const result = await prisma.categories.findMany();
  return result;
};

// post categories
const postCategories = async (payload: postCategoriesType) => {
  const { name, description } = payload;
  const result = await prisma.categories.create({
    data: {
      name,
      description,
    },
  });
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
  getFeaturedTutors,
  getSingleTutor,
  getAllCategories,
  postCategories,
  updateTutorProfile,
  updateAvailability,
};
