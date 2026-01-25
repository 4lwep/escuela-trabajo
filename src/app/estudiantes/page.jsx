import ListaEstudiantes from '@/components/estudiantes/lista'
import { obtenerAsignaturasIdNombre, obtenerEstudiantes, obtenerGruposIdNombre } from '@/lib/data'
import { Suspense } from 'react'
import Link from 'next/link'




export default function PaginaEstudiantes() {

    const promesaEstudiantes = obtenerEstudiantes()  // Promesa, no usamos AWAIT
    const promesaGruposIdNombre = obtenerGruposIdNombre()
    const promesaAsignaturasIdNombre = obtenerAsignaturasIdNombre()


    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/" className="cursor-pointer hover:text-blue-600">
                        Estudiantes
                    </Link>
                </h1>
            </div>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaEstudiantes
                    promesaEstudiantes={promesaEstudiantes}
                    promesaGruposIdNombre={promesaGruposIdNombre}
                    promesaAsignaturasIdNombre={promesaAsignaturasIdNombre}
                />
            </Suspense>
        </div>
    )
}




