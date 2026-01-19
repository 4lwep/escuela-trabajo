import { obtenerEstudiante } from '@/lib/data'
import { Suspense, use } from 'react'


async function PaginaEstudiante({ params }) {
    const { id } = await params

    const promesaEstudiante = obtenerEstudiante(id) // Promesa, no usamos AWAIT

    return (
        <div>
            <h1 className='text-4xl'>Estudiante</h1>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <Estudiante promesaEstudiante={promesaEstudiante} />
            </Suspense>

        </div>
    )
}

export default PaginaEstudiante





function Estudiante({ promesaEstudiante }) {
    const estudiante = use(promesaEstudiante)

    return (
        <>
            <img
                src={estudiante.foto || '/usuario.webp'}
                alt="foto"
                className='size-24'
            />
            <p>{estudiante.nombre}</p>
            <p>{estudiante.tutor_legal}</p>
            <p>{estudiante.fecha_nacimiento.toLocaleDateString()}</p>
        </>
    )
}