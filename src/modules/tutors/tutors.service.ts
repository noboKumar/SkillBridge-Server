import { prisma } from "../../lib/prisma";
import { postCategoriesType, tutorProfile } from "../../types";

const getAllTutors = async (query: any) => {
  const { searchTerm, rating, minPrice, maxPrice, category } = query;

  const whereCondition: any = {};

  if (searchTerm) {
    whereCondition.OR = [
      { user: { name: { contains: searchTerm as string, mode: "insensitive" } } },
      { category: { name: { contains: searchTerm as string, mode: "insensitive" } } },
    ];
  }

  if (rating) {
    whereCondition.ratingAverage = { gte: Number(rating) };
  }

  if (minPrice || maxPrice) {
    whereCondition.hourlyRate = {};
    if (minPrice) whereCondition.hourlyRate.gte = Number(minPrice);
    if (maxPrice) whereCondition.hourlyRate.lte = Number(maxPrice);
  }

  if (category) {
    whereCondition.categoryId = category;
  }

  const result = await prisma.tutorProfiles.findMany({
    where: whereCondition,
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
      availabilitySlots: {
        where: { isBooked: false }
      },
      reviews: {
        include: {
          student: {
            select: { name: true, profilePhoto: true }
          }
        }
      }
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

const getMyTutorProfile = async (userId: string) => {
  const result = await prisma.tutorProfiles.findUnique({
    where: { userId },
    include: {
      availabilitySlots: true,
    },
  });
  return result;
};

const updateAvailability = async (
  payload: Record<string, unknown>,
  userId: string,
) => {
  // Find tutor profile by userId
  const tutorProfile = await prisma.tutorProfiles.findUnique({
    where: { userId },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found. Please update your profile first.");
  }

  const tutorId = tutorProfile.id;

  // Upsert: create if not exists, update if exists
  const result = await prisma.availabilitySlots.upsert({
    where: { tutorId },
    create: {
      tutorId,
      daysOfWeek: payload.daysOfWeek as any,
      startTime: payload.startTime as string,
      endTime: payload.endTime as string,
      isBooked: false,
    },
    update: {
      daysOfWeek: payload.daysOfWeek as any,
      startTime: payload.startTime as string,
      endTime: payload.endTime as string,
      isBooked: false,
    },
  });
  return result;
};

export const tutorsService = {
  getAllTutors,
  getFeaturedTutors,
  getSingleTutor,
  getMyTutorProfile,
  getAllCategories,
  postCategories,
  updateTutorProfile,
  updateAvailability,
};
