import { prisma } from "../../lib/prisma";
import { userStatusType } from "../../types";

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

const updateUserStatus = async (payload: userStatusType, userId: string) => {
  const result = await prisma.users.update({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      profilePhoto: true,
    },
    data: {
      status: payload.status,
    },
  });
  return result;
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
};
