'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"





// ------------------------------ GRUPOS ------------------------------

export async function insertarGrupo(prevState, formData) {
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
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        // return { error: error.message }
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarGrupo(prevState, formData) {
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
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarGrupo(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.grupo.delete({
            where: { id },
        })
        revalidatePath('/grupos')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}




// ------------------------------ ASIGNATURAS ------------------------------

export async function insertarAsignatura(prevState, formData) {
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
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarAsignatura(prevState, formData) {
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
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarAsignatura(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.asignatura.delete({
            where: { id },
        })
        revalidatePath('/asignaturas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}





// ------------------------------ ESTUDIANTES ------------------------------

export async function insertarEstudiante(prevState, formData) {
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')

    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null  // Este valor puede ser nulo


    // ESTUDIANTE - ASIGNATURAS (N:M)
    const asignaturas = formData.getAll('asignaturas').map(id => ({ id: Number(id) }))


    try {
        await prisma.estudiante.create({
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas: { connect: asignaturas }
            }
        })
        revalidatePath('/estudiantes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarEstudiante(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')

    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null  // Este valor puede ser nulo


    // ESTUDIANTE - ASIGNATURAS  (N:M)
    const asignaturas = formData.getAll('asignaturas').map(id => ({ id: Number(id) }))


    try {
        await prisma.estudiante.update({
            where: { id },
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas: { set: asignaturas }
            }
        })
        revalidatePath('/estudiantes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarEstudiante(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.estudiante.delete({
            where: { id },
        })
        revalidatePath('/estudiantes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



