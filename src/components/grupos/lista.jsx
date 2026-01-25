'use client'
import { FilePenLineIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { use, useState } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/grupos/form'
import { eliminarGrupo, insertarGrupo, modificarGrupo } from '@/lib/actions'


export default function Lista({ promesaGrupos }) {

    const dataGrupos = use(promesaGrupos)
    const [propiedad, setPropiedad] = useState('nombre')
    const [orden, setOrden] = useState('')
    const [buscar, setBuscar] = useState('')

    let grupos = dataGrupos
    if (orden === 'asc') grupos = dataGrupos.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
    if (orden === 'desc') grupos = dataGrupos.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))

    if (buscar) grupos = grupos.filter((grupo) =>
        grupo.nombre.toLowerCase().includes(buscar.toLowerCase())
        || grupo.tutor.toLowerCase().includes(buscar.toLowerCase())
        || grupo.aula.toLowerCase().includes(buscar.toLowerCase())
    )

    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-wrap gap-2 mb-2">

                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Filtrar</legend>
                    <input type="search" placeholder="Buscar"
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    />
                </fieldset>
                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Ordenar</legend>
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="">Orden por defecto</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <select
                        value={propiedad}
                        onChange={(e) => setPropiedad(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="nombre">Nombre</option>
                        <option value="tutor">Tutor</option>
                        <option value="aula">Aula</option>
                    </select>
                </fieldset>

            </div>

            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={
                    <PlusIcon size={32}
                        className='text-green-500 border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-green-500 hover:bg-green-300'
                    />}>
                    <h2 className='text-2xl font-bold'>INSERTAR GRUPO</h2>
                    <Form action={insertarGrupo} textSubmit="Insertar" />
                </Modal>
            </div>


            {/* <div className='flex flex-wrap gap-10'> */}
            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {grupos.map((grupo) => <Item grupo={grupo} key={grupo.id} />)}
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
                <Modal openElement={
                    <FilePenLineIcon size={32}
                        className='text-orange-500 border border-orange-500 rounded-full bg-orange-200 p-2 cursor-pointer hover:text-orange-500 hover:bg-orange-300'
                    />}
                >   <h2 className='text-2xl font-bold'>ACTUALIZAR GRUPO</h2>
                    <Form action={modificarGrupo} grupo={grupo} textSubmit="Actualizar" />
                </Modal>

                <Modal openElement={
                    <TrashIcon size={32}
                        className='text-red-500 border border-red-500 rounded-full bg-red-200 p-2 cursor-pointer hover:text-red-500 hover:bg-red-300'
                    />}
                >
                    <h2 className='text-2xl font-bold'>ELIMINAR GRUPO</h2>
                    <Form action={eliminarGrupo} grupo={grupo} disabled={true} textSubmit="Eliminar" />
                </Modal>
            </div>
        </div>
    )
}