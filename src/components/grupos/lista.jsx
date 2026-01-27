'use client'
import Link from 'next/link'
import { use } from 'react'
import Modal from '@/components/modal'
import Filtro from '@/components/grupos/filtro'
import Form from '@/components/grupos/form'
import { eliminarGrupo, insertarGrupo, modificarGrupo } from '@/lib/actions'
import { IconoInsertar, IconoModificar, IconoEliminar } from '@/components/icons'
import useGrupos from '@/hooks/useGrupos'



export default function Lista({ promesaGrupos }) {

    const grupos = use(promesaGrupos)

    const {
        gruposFiltrados,
        propiedad, setPropiedad,
        orden, setOrden,
        buscar, setBuscar
    } = useGrupos(grupos);

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

                    <h2 className='text-2xl font-bold'>INSERTAR GRUPO</h2>
                    <Form action={insertarGrupo} textSubmit="Insertar" />

                </Modal>
            </div>


            {/* <div className='flex flex-wrap gap-10'> */}
            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {gruposFiltrados.map((grupo) => <Item grupo={grupo} key={grupo.id} />)}
            </div>
        </div >
    )
}


function Item({ grupo }) {

    return (
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/grupos/${grupo.id}`} >
                <p>Nombre de grupo: {grupo.nombre} </p>
                <p>Tutor del grupo: {grupo.tutor}</p>
                <p>Aula {grupo.aula}</p>
            </Link>

            <div className='flex gap-2 justify-end'>
                <Modal openElement={<IconoModificar />}>

                    <h2 className='text-2xl font-bold'>ACTUALIZAR GRUPO</h2>
                    <Form action={modificarGrupo} grupo={grupo} textSubmit="Actualizar" />

                </Modal>

                <Modal openElement={<IconoEliminar />}           >

                    <h2 className='text-2xl font-bold'>ELIMINAR GRUPO</h2>
                    <Form action={eliminarGrupo} grupo={grupo} disabled={true} textSubmit="Eliminar" />

                </Modal>
            </div>
        </div>
    )
}