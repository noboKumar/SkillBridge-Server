import { prisma } from "../../lib/prisma";

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


export const tutorsService = {
  getAllTutors,
  getSingleTutor,
  getAllCategories
};
