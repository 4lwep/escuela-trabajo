'use client'
import Link from 'next/link'
import { use } from 'react'


export default function Lista({ promesaEstudiantes }) {

    const estudiantes = use(promesaEstudiantes)


    return (
        <div className='flex flex-wrap gap-10'>
            {estudiantes.map((estudiante) => <Item estudiante={estudiante} key={estudiante.id} />)}
            {/* <button onClick={() => alert('hola')}>Boton</button> */}
        </div>
    )
}




function Item({ estudiante }) {

    return (
        <Link href={`/estudiantes/${estudiante.id}`} >
            <div className='p-4 rounded-lg bg-blue-200'>
                <p>Nombre de estudiante: {estudiante.nombre} </p>
                <p>Tutor legal: {estudiante.tutor_legal}</p>
                <p>Fecha de nacimiento: {estudiante.fecha_nacimiento.toLocaleDateString()}</p>
            </div>
        </Link>
    )
}