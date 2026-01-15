import Lista from '@/components/grupos/lista'
import { obtenerGrupos } from '@/lib/data'
import { Suspense } from 'react'

async function PaginaGrupos() {

    const promesaGrupos = obtenerGrupos()  // Promesa, no usamos AWAIT

    return (
        <div>
            <h1 className='text-4xl'>PaginaGrupos</h1>

            <Suspense fallback={<p className='text-2xl text-blue-300'>Cargando...</p>}>
                <Lista
                    promesaGrupos={promesaGrupos}
                />
            </Suspense>
        </div>
    )
}

export default PaginaGrupos


