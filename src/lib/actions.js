"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "./data";

async function newUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const active = Boolean(formData.get("active"));
  const address = formData.get("address");
  const phone = formData.get("phone");
  const image = formData.get("image");
  const role = formData.get("role");

  const user = await getUserByEmail(email);
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

  const user = await getUserByEmail(email);
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

//------------------------------- OAUTH ------------------------------
// https://authjs.dev/reference/nextjs#signin
export async function loginGoogle() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    throw error;
  }
}

export async function loginGithub() {
  try {
    await signIn("github", { redirectTo: "/dashboard" });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginDiscord() {
  try {
    await signIn("discord", { redirectTo: "/dashboard" });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ------------------------------ AUTH CREDENTIALS ------------------------
export async function register(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Comprobamos si el usuario ya está registrado
  const user = await getUserByEmail(email);

  if (user) {
    return {
      error: "El email ya está registrado",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  // Encriptamos password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Guardamos credenciales en base datos
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect("/auth/login");
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Comprobamos si el usuario está registrado
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: "Usuario no registrado.",
      fields: Object.fromEntries(formData.entries()),
    };
  }

  if (!user.active) {
    return {
      error: "Usuario deshabilitado. Consulte al administrador de esta app.",
    };
  }

  // Comparamos password
  const matchPassword = user.password
    ? await bcrypt.compare(password, user.password)
    : false;

  if (user && matchPassword) {
    // && user.emailVerified
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } else {
    return {
      error: "Credenciales incorrectas.",
      fields: Object.fromEntries(formData.entries()),
    };
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

// ------------------------------ GRUPOS ------------------------------

export async function insertarGrupo(prevState, formData) {
  const nombre = formData.get("nombre");
  const tutor = formData.get("tutor");
  const aula = formData.get("aula");

  try {
    await prisma.grupo.create({
      data: {
        nombre,
        tutor,
        aula,
      },
    });
    revalidatePath("/grupos");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    // return { error: error.message }
    return { error: error.message.split("\n").pop() };
  }
}

export async function modificarGrupo(prevState, formData) {
  const id = Number(formData.get("id"));
  const nombre = formData.get("nombre");
  const tutor = formData.get("tutor");
  const aula = formData.get("aula");

  try {
    await prisma.grupo.update({
      where: { id },
      data: {
        nombre,
        tutor,
        aula,
      },
    });
    revalidatePath("/grupos");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}

export async function eliminarGrupo(prevState, formData) {
  const id = Number(formData.get("id"));

  try {
    await prisma.grupo.delete({
      where: { id },
    });
    revalidatePath("/grupos");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}

// ------------------------------ ASIGNATURAS ------------------------------

export async function insertarAsignatura(prevState, formData) {
  const nombre = formData.get("nombre");
  const profesor = formData.get("profesor");
  const horas_semana = Number(formData.get("horas_semana"));

  try {
    await prisma.asignatura.create({
      data: {
        nombre,
        profesor,
        horas_semana,
      },
    });
    revalidatePath("/asignaturas");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}

export async function modificarAsignatura(prevState, formData) {
  const id = Number(formData.get("id"));
  const nombre = formData.get("nombre");
  const profesor = formData.get("profesor");
  const horas_semana = Number(formData.get("horas_semana"));

  try {
    await prisma.asignatura.update({
      where: { id },
      data: {
        nombre,
        profesor,
        horas_semana,
      },
    });
    revalidatePath("/asignaturas");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}

export async function eliminarAsignatura(prevState, formData) {
  const id = Number(formData.get("id"));

  try {
    await prisma.asignatura.delete({
      where: { id },
    });
    revalidatePath("/asignaturas");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}

// ------------------------------ ESTUDIANTES ------------------------------

export async function insertarEstudiante(prevState, formData) {
  const nombre = formData.get("nombre");
  const tutor_legal = formData.get("tutor_legal");
  const fecha_nacimiento = new Date(formData.get("fecha_nacimiento"));
  const foto = formData.get("foto");

  // GRUPO - ESTUDIANTE (1:N)
  const grupoId = formData.get("grupoId")
    ? Number(formData.get("grupoId"))
    : null; // Este valor puede ser nulo

  // ESTUDIANTE - ASIGNATURAS (N:M)
  const asignaturas = formData
    .getAll("asignaturas")
    .map((id) => ({ id: Number(id) }));

  try {
    await prisma.estudiante.create({
      data: {
        nombre,
        tutor_legal,
        fecha_nacimiento,
        foto,
        grupoId,
        asignaturas: { connect: asignaturas },
      },
    });
    revalidatePath("/estudiantes");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}

export async function modificarEstudiante(prevState, formData) {
  const id = Number(formData.get("id"));
  const nombre = formData.get("nombre");
  const tutor_legal = formData.get("tutor_legal");
  const fecha_nacimiento = new Date(formData.get("fecha_nacimiento"));
  const foto = formData.get("foto");

  // GRUPO - ESTUDIANTE (1:N)
  const grupoId = formData.get("grupoId")
    ? Number(formData.get("grupoId"))
    : null; // Este valor puede ser nulo

  // ESTUDIANTE - ASIGNATURAS  (N:M)
  const asignaturas = formData
    .getAll("asignaturas")
    .map((id) => ({ id: Number(id) }));

  try {
    await prisma.estudiante.update({
      where: { id },
      data: {
        nombre,
        tutor_legal,
        fecha_nacimiento,
        foto,
        grupoId,
        asignaturas: { set: asignaturas },
      },
    });
    revalidatePath("/estudiantes");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}

export async function eliminarEstudiante(prevState, formData) {
  const id = Number(formData.get("id"));

  try {
    await prisma.estudiante.delete({
      where: { id },
    });
    revalidatePath("/estudiantes");
    return { success: "Operación realizada con éxito" };
  } catch (error) {
    console.log(error);
    return { error: error.message.split("\n").pop() };
  }
}
