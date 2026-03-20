import { prisma } from "../../lib/prisma";
import { registerUser } from "../../types";
import bcrypt from "bcrypt";

const registerUser = async (payload: registerUser) => {
  const { name, email, password, profilePhoto } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profilePhoto: profilePhoto
        ? profilePhoto
        : "https://i.ibb.co/pB4pgNhr/depositphotos-119671346-stock-illustration-user-icon-vector-male-person.webp",
      role: "STUDENT",
      status: "ACTIVE",
    },
  });
  return {
    id: result.id,
    name: result.name,
    email: result.email,
    profilePhoto: result.profilePhoto,
    role: result.role,
    status: result.status,
  };
};

export const authService = {
  registerUser,
};
