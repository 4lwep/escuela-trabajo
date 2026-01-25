import BackButton from '@/components/back-button'
import { obtenerAsignatura } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaAsignatura({ params }) {
    const { id } = await params

    const promesaAsignatura = obtenerAsignatura(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <BackButton className="cursor-pointer hover:text-blue-600">
                <h1 className='text-4xl'>Asignatura</h1>
            </BackButton>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Asignatura promesaAsignatura={promesaAsignatura} />
            </Suspense>

        </div>
    )
}

export default PaginaAsignatura





function Asignatura({ promesaAsignatura }) {
    const asignatura = use(promesaAsignatura)

    return (
        <div className='p-4 md:p-8 border border-blue-400'>
            <p>{asignatura.nombre}</p>
            <p>{asignatura.profesor}</p>
            <p>{asignatura.horas_semana}</p>
        </div>
    )
}