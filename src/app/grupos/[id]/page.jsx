import { obtenerGrupo } from '@/lib/data'


async function PaginaGrupo({ params }) {

    const { id } = await params

    const grupo = await obtenerGrupo(id)

    return (
        <div>
            <h1 className='text-4xl'>Grupo</h1>
            <p>{grupo.nombre}</p>
            <p>{grupo.tutor}</p>
            <p>{grupo.aula}</p>
        </div>
    )
}

export default PaginaGrupo