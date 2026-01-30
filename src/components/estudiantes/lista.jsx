'use client'
import Link from 'next/link'
import { use } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/estudiantes/form'
import { eliminarEstudiante, insertarEstudiante, modificarEstudiante } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'





export default function Lista({ promesaEstudiantes, promesaGruposIdNombre, promesaAsignaturasIdNombre }) {

    const estudiantes = use(promesaEstudiantes)
    const gruposIdNombre = use(promesaGruposIdNombre)
    const asignaturasIdNombre = use(promesaAsignaturasIdNombre)

    const Insertar = () =>
        <Modal openElement={<IconoInsertar />}>
            <h2 className='text-2xl font-bold'>INSERTAR ESTUDIANTE</h2>
            <Form
                action={insertarEstudiante}
                textSubmit='Insertar'
                gruposIdNombre={gruposIdNombre}
                asignaturasIdNombre={asignaturasIdNombre}
            />
        </Modal>


    const Editar = ({ estudiante }) =>
        <Modal openElement={<IconoModificar />}>
            <h2 className='text-2xl font-bold'>ACTUALIZAR ESTUDIANTE</h2>
            <Form
                action={modificarEstudiante}
                textSubmit='Actualizar'
                gruposIdNombre={gruposIdNombre}
                asignaturasIdNombre={asignaturasIdNombre}
                estudiante={estudiante}
            />
        </Modal>


    const Eliminar = ({ estudiante }) =>
        <Modal openElement={<IconoEliminar />}>
            <h2 className='text-2xl font-bold'>ELIMINAR ESTUDIANTE</h2>
            <Form
                action={eliminarEstudiante}
                textSubmit='Eliminar'
                gruposIdNombre={gruposIdNombre}
                asignaturasIdNombre={asignaturasIdNombre}
                estudiante={estudiante}
                disabled
            />
        </Modal>


    const Card = ({ estudiante, children }) =>
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/estudiantes/${estudiante.id}`} >
                <p>Nombre: {estudiante.nombre} </p>
                <p>Tutor legal: {estudiante.tutor_legal}</p>
                <p>Fecha de nacimiento: {estudiante.fecha_nacimiento.toLocaleDateString()}</p>
                <p>Grupo: {estudiante.grupo ? estudiante.grupo.nombre : 'Sin grupo'}</p>
            </Link>
            <div className='flex gap-2 justify-end'>
                {children}
            </div>
        </div>


    return (
        <div className="flex flex-col gap-4">

            <div className='flex justify-end items-center gap-4 pb-4'>
                <Insertar />
            </div>

            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {estudiantes.map((estudiante) =>
                    <Card key={estudiante.id} estudiante={estudiante}>
                        <Editar estudiante={estudiante} />
                        <Eliminar estudiante={estudiante} />
                    </Card>
                )}
            </div>
        </div>
    )
}
