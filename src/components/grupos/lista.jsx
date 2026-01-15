'use client'
import Link from 'next/link'
import { use } from 'react'


export default function Lista({ promesaGrupos }) {

    const grupos = use(promesaGrupos)


    return (
        <div className='flex flex-wrap gap-10'>
            {grupos.map((grupo) => <Item grupo={grupo} key={grupo.id} />)}
            <button onClick={() => alert('hola')}>Boton</button>
        </div>
    )
}




function Item({ grupo }) {

    return (
        <Link href={`/grupos/${grupo.id}`} >
            <div className='bg-blue-100'>
                <p>Nombre de grupo: {grupo.nombre} </p>
                <p>Tutor del grupo: {grupo.tutor}</p>
                <p>Aula {grupo.aula}</p>
            </div>
        </Link>
    )
}