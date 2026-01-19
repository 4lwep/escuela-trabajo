import Form from '@/components/asignaturas/form'
import ListaAsignaturas from '@/components/asignaturas/lista'
import { obtenerAsignaturas } from '@/lib/data'
import { Suspense } from 'react'


function PaginaAsignaturas() {

    const promesaAsignaturas = obtenerAsignaturas()  // Promesa, no usamos AWAIT

    return (
        <div>
            <h1 className='text-4xl'>Asignaturas</h1>

            <Form />

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaAsignaturas
                    promesaAsignaturas={promesaAsignaturas}
                />
            </Suspense>
        </div>
    )
}

export default PaginaAsignaturas


