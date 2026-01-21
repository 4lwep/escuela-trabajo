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
        <div className='p-4 md:p-8 border border-blue-400'>
            <img
                src={estudiante.foto || '/usuario.webp'}
                alt="foto"
                className='size-24'
            />
            <p>Nombre: {estudiante.nombre}</p>
            <p>Tutor Legal: {estudiante.tutor_legal}</p>
            <p>Fecha Nacimiento: {estudiante.fecha_nacimiento.toLocaleDateString()}</p>
            <p>Grupo: {estudiante?.grupo?.nombre}</p>
            <p>Asignaturas: {estudiante?.asignaturas?.map(a => a.nombre).join(', ')}</p>
        </div>
    )
}