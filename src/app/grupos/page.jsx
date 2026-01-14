import { obtenerGrupos } from '@/lib/data'
import Link from 'next/link'


async function PaginaGrupos() {

    const grupos = await obtenerGrupos()

    console.log(grupos)

    return (
        <div>
            <h1 className='text-4xl'>PaginaGrupos</h1>

            <Lista grupos={grupos} />

        </div>
    )
}

export default PaginaGrupos



function Lista({ grupos }) {
    return (
        <div className='flex flex-wrap gap-10'>
            {grupos.map((grupo) => <Item grupo={grupo} key={grupo.id} />)}
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