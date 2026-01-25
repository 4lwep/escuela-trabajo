import BackButton from '@/components/back-button'
import { obtenerGrupo } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaGrupo({ params }) {
    const { id } = await params

    const promesaGrupo = obtenerGrupo(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Grupo</h1>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Grupo promesaGrupo={promesaGrupo} />
            </Suspense>

        </div>
    )
}

export default PaginaGrupo





function Grupo({ promesaGrupo }) {
    const grupo = use(promesaGrupo)

    return (
        <div className='p-4 md:p-8 border border-blue-400'>
            <p>{grupo.nombre}</p>
            <p>{grupo.tutor}</p>
            <p>{grupo.aula}</p>
        </div>
    )
}