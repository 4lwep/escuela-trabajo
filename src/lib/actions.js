"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "./data";

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
