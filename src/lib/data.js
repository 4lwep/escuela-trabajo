'use server'

import prisma from '@/lib/prisma'


// ------------------------- GRUPOS ------------------------- 


export async function obtenerGrupos() {

    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        const grupos = await prisma.grupo.findMany({
            include: {
                estudiantes: {
                    select: {
                        id: true,
                        nombre: true
                    }
                }
            }
        })
        return grupos
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}


export async function obtenerGrupo(id) {

    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        const grupo = await prisma.grupo.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                estudiantes: true
            }
        })
        return grupo
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}


export async function obtenerGruposIdNombre() {

    try {
        const grupos = await prisma.grupo.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return grupos
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}



// ------------------------- ASIGNATURAS ------------------------- 

export async function obtenerAsignaturas() {

    try {
        const asignaturas = await prisma.asignatura.findMany({
            include: {
                estudiantes: {
                    select: {
                        id: true,
                        nombre: true
                    }
                }
            }
        })
        return asignaturas
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}


export async function obtenerAsignatura(id) {

    try {
        const asignatura = await prisma.asignatura.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                estudiantes: true
            }
        })
        return asignatura
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}


export async function obtenerAsignaturasIdNombre() {

    try {
        const asignaturas = await prisma.asignatura.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return asignaturas
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}



// ------------------------- ESTUDIANTES ------------------------- 

export async function obtenerEstudiantes() {

    try {
        const estudiantes = await prisma.estudiante.findMany({
            select: {
                id: true,
                nombre: true,
                tutor_legal: true,
                fecha_nacimiento: true,
                foto: true,
                grupoId: true,
                grupo: {
                    select: {
                        id: true,
                        nombre: true
                    }
                },
                asignaturas: {
                    select: {
                        id: true,
                        nombre: true
                    }
                }
            }
        })
        // console.log(estudiantes)
        return estudiantes
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}


export async function obtenerEstudiante(id) {

    try {
        const estudiante = await prisma.estudiante.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                grupo: true,
                asignaturas: true
            }
        })
        return estudiante
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}


export async function obtenerEstudiantesIdNombre() {

    try {
        const estudiantes = await prisma.estudiante.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return estudiantes
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }
}