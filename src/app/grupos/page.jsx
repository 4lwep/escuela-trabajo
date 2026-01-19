import Form from '@/components/grupos/form'
import ListaGrupos from '@/components/grupos/lista'
import { obtenerGrupos } from '@/lib/data'
import { Suspense } from 'react'


function PaginaGrupos() {

    const promesaGrupos = obtenerGrupos()  // Promesa, no usamos AWAIT

    return (
        <div>
            <h1 className='text-4xl'>Grupos</h1>

            <Form />

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaGrupos
                    promesaGrupos={promesaGrupos}
                />
            </Suspense>
        </div>
    )
}

export default PaginaGrupos


