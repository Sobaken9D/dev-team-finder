import {prisma} from "@/prisma/prisma-client";

export const getUserByEmail = async (email: string) => {
  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: lowerCaseEmail
      }
    })

    return user;
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string | number) => {
  try {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;

    if (isNaN(numericId)) return null; // Если передали не числовую строку

    const user = await prisma.user.findUnique({
      where: {
        id: numericId
      }
    });

    return user;
  } catch (error) {
    return null;
  }
}