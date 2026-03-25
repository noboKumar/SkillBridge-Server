import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const result = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      profilePhoto: true,
    },
  });
  return result;
};

export const adminService = {
  getAllUsers,
};
