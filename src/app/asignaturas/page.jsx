import ListaAsignaturas from '@/components/asignaturas/lista'
import { obtenerAsignaturas } from '@/lib/data'
import { Suspense } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'

export default function PaginaAsignaturas() {
    
    const promesaSession = auth();
    const promesaAsignaturas = obtenerAsignaturas()  // Promesa, no usamos AWAIT

    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/" className="cursor-pointer hover:text-blue-600">
                        Asignaturas
                    </Link>
                </h1>
            </div>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaAsignaturas
                    promesaSesion={promesaSession}
                    promesaAsignaturas={promesaAsignaturas}
                />
            </Suspense>
        </div>
    )
}


