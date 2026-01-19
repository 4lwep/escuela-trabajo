'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function insertarGrupo(formData) {
    const nombre = formData.get('nombre')
    const tutor = formData.get('tutor')
    const aula = formData.get('aula')

    await prisma.grupo.create({
        data: {
            nombre,
            tutor,
            aula
        }
    })
    revalidatePath('/grupos')
}



export async function modificarGrupo(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const tutor = formData.get('tutor')
    const aula = formData.get('aula')

    await prisma.grupo.update({
        where: { id },
        data: {
            nombre,
            tutor,
            aula
        }
    })
    revalidatePath('/grupos')
}

export async function eliminarGrupo(formData) {
    const id = Number(formData.get('id'))

    await prisma.grupo.delete({
        where: { id },
    })
    revalidatePath('/grupos')
}



export async function insertarAsignatura(formData) {
    const nombre = formData.get('nombre')
    const profesor = formData.get('profesor')
    const horas_semana = Number(formData.get('horas_semana'))

    await prisma.asignatura.create({
        data: {
            nombre,
            profesor,
            horas_semana
        }
    })
    revalidatePath('/asignaturas')
}



export async function insertarEstudiante(formData) {
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')

    await prisma.estudiante.create({
        data: {
            nombre,
            tutor_legal,
            fecha_nacimiento,
            foto
        }
    })
    revalidatePath('/estudiantes')
}