'use client'
import Link from 'next/link'
import { use } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/asignaturas/form'
import { eliminarAsignatura, insertarAsignatura, modificarAsignatura } from '@/lib/actions'
import { FilePenLineIcon, PlusIcon, TrashIcon } from 'lucide-react'


export default function Lista({ promesaAsignaturas }) {

    const asignaturas = use(promesaAsignaturas)

    return (
        <div className="flex flex-col gap-4">
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={
                    <PlusIcon size={32}
                        className='text-green-500 border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-green-500 hover:bg-green-300'
                    />}>
                    <h2 className='text-2xl font-bold'>INSERTAR ASIGNATURA</h2>
                    <Form action={insertarAsignatura} textSubmit="Insertar" />
                </Modal>
            </div>




            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {asignaturas.map((asignatura) => <Item asignatura={asignatura} key={asignatura.id} />)}
            </div>
        </div>
    )
}




function Item({ asignatura }) {

    return (
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/asignaturas/${asignatura.id}`} >
                <p>Nombre: {asignatura.nombre} </p>
                <p>Profesor: {asignatura.profesor}</p>
                <p>Horas semanales: {asignatura.horas_semana}</p>
            </Link>
            <div className='flex gap-2 justify-end'>
                <Modal openElement={
                    <FilePenLineIcon size={32}
                        className='text-orange-500 border border-orange-500 rounded-full bg-orange-200 p-2 cursor-pointer hover:text-orange-500 hover:bg-orange-300'
                    />}
                >   <h2 className='text-2xl font-bold'>ACTUALIZAR ASIGNATURA</h2>
                    <Form action={modificarAsignatura} asignatura={asignatura} textSubmit="Actualizar" />
                </Modal>

                <Modal openElement={
                    <TrashIcon size={32}
                        className='text-red-500 border border-red-500 rounded-full bg-red-200 p-2 cursor-pointer hover:text-red-500 hover:bg-red-300'
                    />}
                >
                    <h2 className='text-2xl font-bold'>ELIMINAR ASIGNATURA</h2>
                    <Form action={eliminarAsignatura} asignatura={asignatura} disabled={true} textSubmit="Eliminar" />
                </Modal>
            </div>
        </div>
    )
}