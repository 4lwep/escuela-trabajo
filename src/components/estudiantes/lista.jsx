'use client'
import Link from 'next/link'
import { use } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/estudiantes/form'
import { eliminarEstudiante, modificarEstudiante } from '@/lib/actions'
import { FilePenLine, TrashIcon } from 'lucide-react'




export default function Lista({ promesaEstudiantes, promesaGruposIdNombre, promesaAsignaturasIdNombre }) {

    const estudiantes = use(promesaEstudiantes)
    const gruposIdNombre = use(promesaGruposIdNombre)
    const asignaturasIdNombre = use(promesaAsignaturasIdNombre)

    return (

        <div className="flex flex-col gap-4">

            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {estudiantes.map((estudiante) =>
                    <Item
                        estudiante={estudiante}
                        gruposIdNombre={gruposIdNombre}
                        asignaturasIdNombre={asignaturasIdNombre}
                        key={estudiante.id} />)}
            </div>
        </div>
    )
}




function Item({ estudiante, gruposIdNombre, asignaturasIdNombre }) {

    return (
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/estudiantes/${estudiante.id}`} >
                <p>Nombre: {estudiante.nombre} </p>
                <p>Tutor legal: {estudiante.tutor_legal}</p>
                <p>Fecha de nacimiento: {estudiante.fecha_nacimiento.toLocaleDateString()}</p>
                <p>Grupo: {estudiante.grupo ? estudiante.grupo.nombre : 'Sin grupo'}</p>
            </Link>
            <div className='flex gap-2 justify-end'>
                <Modal openElement={
                    <FilePenLine size={32}
                        className='text-orange-500 border border-orange-500 rounded-full bg-orange-200 p-2 cursor-pointer hover:text-orange-500 hover:bg-orange-300'
                    />}
                >   <h2 className='text-2xl font-bold'>ACTUALIZAR GRUPO</h2>
                    <Form action={modificarEstudiante} estudiante={estudiante} gruposIdNombre={gruposIdNombre} asignaturasIdNombre={asignaturasIdNombre} textSubmit="Actualizar" />
                </Modal>

                <Modal openElement={
                    <TrashIcon size={32}
                        className='text-red-500 border border-red-500 rounded-full bg-red-200 p-2 cursor-pointer hover:text-red-500 hover:bg-red-300'
                    />}
                >
                    <h2 className='text-2xl font-bold'>ELIMINAR GRUPO</h2>
                    <Form action={eliminarEstudiante} estudiante={estudiante} gruposIdNombre={gruposIdNombre} asignaturasIdNombre={asignaturasIdNombre} disabled={true} textSubmit="Eliminar" />
                </Modal>
            </div>
        </div>
    )
}