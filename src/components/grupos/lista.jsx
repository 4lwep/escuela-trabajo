'use client'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { use, useState } from 'react'
import Modal from '@/components/modal'
import Form from '@/components/grupos/form'
import { eliminarGrupo, modificarGrupo } from '@/lib/actions'


export default function Lista({ promesaGrupos }) {

    const dataGrupos = use(promesaGrupos)
    const [propiedad, setPropiedad] = useState('nombre')
    const [orden, setOrden] = useState('')


    let grupos = dataGrupos
    if (orden === 'asc') grupos = dataGrupos.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
    if (orden === 'desc') grupos = dataGrupos.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))

    return (
        <div className="p-4 flex flex-col gap-4">
            <fieldset className="flex flex-wrap gap-2 mb-2">
                <legend className='font-bold'>Ordenación</legend>
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

            {/* <div className='flex flex-wrap gap-10'> */}
            <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10'>
                {grupos.map((grupo) => <Item grupo={grupo} key={grupo.id} />)}
            </div>
        </div >
    )
}


// 'use client'
// import Link from 'next/link'
// import { use, useState } from 'react'
// import { ArrowDownAZ, ArrowDownZA } from 'lucide-react';

// export default function Lista({ promesaGrupos }) {

//     const gruposData = use(promesaGrupos)
//     const [grupos, setGrupos] = useState(gruposData)

//     const ordenAscendente = (propiedad) => grupos.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
//     const ordenDescendente = (propiedad) => grupos.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))


//     return (
//         <>
//             <button onClick={() => setGrupos(ordenAscendente("nombre"))}><ArrowDownAZ /></button>
//             <button onClick={() => setGrupos(ordenDescendente("nombre"))}><ArrowDownZA /></button>
//             <div className='flex flex-wrap gap-10'>
//                 {grupos.map((grupo) => <Item grupo={grupo} key={grupo.id} />)}
//             </div>
//         </>
//     )
// }



function Item({ grupo }) {

    return (
        <div className='p-4 rounded-lg bg-blue-200'>
            <Link href={`/grupos/${grupo.id}`} >
                <p>Nombre de grupo: {grupo.nombre} </p>
                <p>Tutor del grupo: {grupo.tutor}</p>
                <p>Aula {grupo.aula}</p>
            </Link>
            <Modal openElement={<EditIcon color='blue' size={32}
                className='border border-blue-500 rounded-full bg-blue-200 p-2 cursor-pointer hover:text-blue-500 hover:bg-blue-300'
            />}
            >   <h2>ACTUALIZAR GRUPO</h2>
                <Form action={modificarGrupo} grupo={grupo} textSubmit="Actualizar" />
            </Modal>

            <Modal openElement={<TrashIcon color='red' size={32}
                className='border border-red-500 rounded-full bg-red-200 p-2 cursor-pointer hover:text-red-500 hover:bg-red-300'
            />}
            >
                <h2>ELIMINAR GRUPO</h2>
                <Form action={eliminarGrupo} grupo={grupo} disabled={true} textSubmit="Eliminar" />
            </Modal>
        </div>
    )
}