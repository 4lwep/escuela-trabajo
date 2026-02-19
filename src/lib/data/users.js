"use server";

import prisma from "@/lib/prisma";

export async function obtenerUsuarios() {
  const users = await prisma.user.findMany();
  return users;
}

export async function obtenerUsuarioPorId(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.log(error.message.split("\n").pop());
    throw new Error(error.message.split("\n").pop());
  }
}

export async function obtenerUsuarioPorEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}
