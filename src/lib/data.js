'use server'

import prisma from '@/lib/prisma'


// ------------------------- GRUPOS ------------------------- 

export async function obtenerGrupos() {

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const grupos = await prisma.grupo.findMany()
        return grupos
    } catch (error) {
        console.log(error)
    }
}


export async function obtenerGrupo(id) {

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const grupo = await prisma.grupo.findUnique({
            where: {
                id: Number(id)
            }
        })
        return grupo
    } catch (error) {
        console.log(error)
    }
}



// ------------------------- ASIGNATURAS ------------------------- 

export async function obtenerAsignaturas() {

    try {
        const asignaturas = await prisma.asignatura.findMany()
        return asignaturas
    } catch (error) {
        console.log(error)
    }
}


export async function obtenerAsignatura(id) {

    try {
        const asignatura = await prisma.asignatura.findUnique({
            where: {
                id: Number(id)
            }
        })
        return asignatura
    } catch (error) {
        console.log(error)
    }
}