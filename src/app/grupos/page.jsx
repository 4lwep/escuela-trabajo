import ListaGrupos from '@/components/grupos/lista'
import { obtenerGrupos } from '@/lib/data'
import Link from 'next/link'
import { Suspense } from 'react'


export default function PaginaGrupos() {

    const promesaGrupos = obtenerGrupos()  // Promesa, no usamos AWAIT

    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/" className="cursor-pointer hover:text-blue-600">
                        Grupos
                    </Link>
                </h1>
            </div>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaGrupos
                    promesaGrupos={promesaGrupos}
                />
            </Suspense>
        </div>
    )
}


