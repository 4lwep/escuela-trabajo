'use client'
import { use } from 'react'
import { eliminarAsignatura, insertarAsignatura, modificarAsignatura } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'
import Link from 'next/link'
import Filtro from '@/components/asignaturas/filtro'
import Modal from '@/components/modal'
import Form from '@/components/asignaturas/form'
import useAsignaturas from '@/hooks/useAsignaturas'




export default function Lista({ promesaAsignaturas }) {

    const asignaturas = use(promesaAsignaturas)

    const {
        asignaturasFiltradas,
        propiedad, setPropiedad,
        orden, setOrden,
        buscar, setBuscar
    } = useAsignaturas(asignaturas);

    return (
        <div className="flex flex-col gap-4">

            {/* Filtrado y ordenación */}
            <Filtro
                buscar={buscar}
                setBuscar={setBuscar}
                propiedad={propiedad}
                setPropiedad={setPropiedad}
                orden={orden}
                setOrden={setOrden}
            />

            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={<IconoInsertar />}>

                    <h2 className='text-2xl font-bold'>INSERTAR ASIGNATURA</h2>
                    <Form action={insertarAsignatura} textSubmit="Insertar" />

                </Modal>
            </div>

            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {asignaturasFiltradas.map((asignatura) => <Item asignatura={asignatura} key={asignatura.id} />)}
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
                <Modal openElement={<IconoModificar />}>

                    <h2 className='text-2xl font-bold'>ACTUALIZAR ASIGNATURA</h2>
                    <Form action={modificarAsignatura} asignatura={asignatura} textSubmit="Actualizar" />

                </Modal>

                <Modal openElement={<IconoEliminar />}>

                    <h2 className='text-2xl font-bold'>ELIMINAR ASIGNATURA</h2>
                    <Form action={eliminarAsignatura} asignatura={asignatura} disabled={true} textSubmit="Eliminar" />

                </Modal>
            </div>
        </div>
    )
}