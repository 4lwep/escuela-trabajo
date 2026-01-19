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