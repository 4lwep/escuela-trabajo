"use server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { obtenerUsuarioPorEmail } from "@/lib/data/users";
import { revalidatePath } from "next/cache";

async function newUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const active = Boolean(formData.get("active"));
  const address = formData.get("address");
  const phone = formData.get("phone");
  const image = formData.get("image");
  const role = formData.get("role");

  const user = await obtenerUsuarioPorEmail(email);
  if (user) return { error: "Este email ya está registrado." };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        active,
        address,
        phone,
        image,
        role,
      },
    });

    revalidatePath("/dashboard");
    return { success: "Usuario guardado" };
  } catch (error) {
    return { error: error.message || "Ha ocurrido un error" };
  }
}

async function editUser(prevState, formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const active = Boolean(formData.get("active"));
  const address = formData.get("address");
  const phone = formData.get("phone");
  const image = formData.get("image");
  const role = formData.get("role");

  const user = await obtenerUsuarioPorEmail(email);
  if (user && user.id != id) return { error: "Este email ya está registrado." };

  let hashedPassword;
  if (password) hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        ...(password && { password: hashedPassword }),
        active,
        address,
        phone,
        image,
        role,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Usuario modificado" };
  } catch (error) {
    return { error: error.message || "Ha ocurrido un error" };
  }
}

// async function deleteUser(prevState, formData) {
//     try {
//         const id = formData.get('id')

//         await prisma.user.delete({
//             where: { id },
//         })
//         revalidatePath('/dashboard')
//         return { success: 'Usuario eliminado' }
//     } catch (error) {
//         return { error }
//     }

// }

async function deleteUser(user) {
  try {
    const id = user.id;

    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    return { success: "Usuario eliminado" };
  } catch (error) {
    return { error: error.message || "Ha ocurrido un error" };
  }
}

async function activeUser(user) {
  if (user) {
    console.log("Usuario actualizado", user);
    await prisma.user.update({
      where: { id: user.id },
      data: { active: !user.active },
    });

    revalidatePath("/dashboard");
  }
}

export { newUser, editUser, deleteUser, activeUser };
