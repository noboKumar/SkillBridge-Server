import config from "../../config";
import { prisma } from "../../lib/prisma";
import { loginUser, registerUser } from "../../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user service
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

// login user service
const loginUser = async (payload: loginUser) => {
  const { email, password } = payload;

  const result = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!result) {
    throw new Error("User not found");
  }
  const comparePassword = await bcrypt.compare(password, result.password);
  if (!comparePassword) {
    throw new Error("Invalid password");
  }
  if (result.status !== "ACTIVE") {
    throw new Error("User is Suspended");
  }

  // jwt token
  const token = jwt.sign({ email: result.email }, config.jwt_secret as string, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      status: result.status,
    },
  };
};

export const authService = {
  registerUser,
  loginUser,
};
