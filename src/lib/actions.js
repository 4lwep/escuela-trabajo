'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"





// ------------------------------ GRUPOS ------------------------------

export async function insertarGrupo(formData) {
    const nombre = formData.get('nombre')
    const tutor = formData.get('tutor')
    const aula = formData.get('aula')
    try {
        await prisma.grupo.create({
            data: {
                nombre,
                tutor,
                aula
            }
        })
        revalidatePath('/grupos')
    } catch (error) {
        console.log(error)
    }
}



export async function modificarGrupo(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const tutor = formData.get('tutor')
    const aula = formData.get('aula')

    try {
        await prisma.grupo.update({
            where: { id },
            data: {
                nombre,
                tutor,
                aula
            }
        })
        revalidatePath('/grupos')
    } catch (error) {
        console.log(error)
    }
}



export async function eliminarGrupo(formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.grupo.delete({
            where: { id },
        })
        revalidatePath('/grupos')
    } catch (error) {
        console.log(error)
    }
}




// ------------------------------ ASIGNATURAS ------------------------------

export async function insertarAsignatura(formData) {
    const nombre = formData.get('nombre')
    const profesor = formData.get('profesor')
    const horas_semana = Number(formData.get('horas_semana'))

    try {
        await prisma.asignatura.create({
            data: {
                nombre,
                profesor,
                horas_semana
            }
        })
        revalidatePath('/asignaturas')
    } catch (error) {
        console.log(error)
    }
}



export async function modificarAsignatura(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const profesor = formData.get('profesor')
    const horas_semana = Number(formData.get('horas_semana'))

    try {
        await prisma.asignatura.update({
            where: { id },
            data: {
                nombre,
                profesor,
                horas_semana
            }
        })
        revalidatePath('/asignaturas')
    } catch (error) {
        console.log(error)
    }
}



export async function eliminarAsignatura(formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.asignatura.delete({
            where: { id },
        })
        revalidatePath('/asignaturas')
    } catch (error) {
        console.log(error)
    }
}





// ------------------------------ ESTUDIANTES ------------------------------

export async function insertarEstudiante(formData) {
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')


    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null  // Este valor puede ser nulo


    // ESTUDIANTE - ASIGNATURAS (N:M)
    // Array con IDs de todas las asignaturas. Formato: [ {id: 1}, {id: 2}, ...]
    const asignaturasIDs = await prisma.asignatura.findMany({
        select: { id: true }
    })

    const connect = asignaturasIDs.filter(asignatura => formData.get(asignatura.id) !== null)
    const asignaturas = { connect }


    try {
        await prisma.estudiante.create({
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas
            }
        })
        revalidatePath('/estudiantes')
    } catch (error) {
        console.log(error)
    }
}



export async function modificarEstudiante(formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')

    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null  // Este valor puede ser nulo


    // ESTUDIANTE - ASIGNATURAS  (N:M)
    // Array con IDs de todas las asignaturas. Formato: [ {id: 1}, {id: 2}, ...]
    const asignaturasIDs = await prisma.asignatura.findMany({
        select: { id: true }
    })

    const connect = asignaturasIDs.filter(asignatura => formData.get(asignatura.id) !== null)
    const disconnect = asignaturasIDs.filter(asignatura => formData.get(asignatura.id) === null)
    const asignaturas = { connect, disconnect }


    try {
        await prisma.estudiante.update({
            where: { id },
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas
            }
        })
        revalidatePath('/estudiantes')
    } catch (error) {
        console.log(error)
    }
}



export async function eliminarEstudiante(formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.estudiante.delete({
            where: { id },
        })
        revalidatePath('/estudiantes')
    } catch (error) {
        console.log(error)
    }
}



