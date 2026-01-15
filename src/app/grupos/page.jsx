import Lista from '@/components/grupos/lista'
import { obtenerGrupos } from '@/lib/data'
import { Suspense } from 'react'


async function PaginaGrupos() {

    const promesaGrupos = obtenerGrupos()


    return (
        <div>
            <h1 className='text-4xl'>PaginaGrupos</h1>

            <Suspense fallback={<p className='text-2xl text-blue-300'>Cargando...</p>}>
                <Lista
                    promesaGrupos={promesaGrupos}
                    promesaAsignaturas={promesaAsignaturas}
                />
            </Suspense>

        </div>
    )
}

export default PaginaGrupos


