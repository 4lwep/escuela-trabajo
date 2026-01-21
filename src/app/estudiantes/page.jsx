import Form from '@/components/estudiantes/form'
import ListaEstudiantes from '@/components/estudiantes/lista'
import { obtenerAsignaturasIdNombre, obtenerEstudiantes, obtenerGruposIdNombre } from '@/lib/data'
import { Suspense, use } from 'react'
import { insertarEstudiante } from '@/lib/actions'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import Modal from '@/components/modal'



export default function PaginaEstudiantes() {

    const promesaEstudiantes = obtenerEstudiantes()  // Promesa, no usamos AWAIT
    const promesaGruposIdNombre = obtenerGruposIdNombre()
    const promesaAsignaturasIdNombre = obtenerAsignaturasIdNombre()
    const gruposIdNombre = use(promesaGruposIdNombre)
    const asignaturasIdNombre = use(promesaAsignaturasIdNombre)

    return (
        <div className='p-4'>

            <div className='flex justify-center items-center gap-4 pb-4'>
                <h1 className='text-4xl'>
                    <Link href="/">Estudiantes</Link>
                </h1>

                <Modal openElement={
                    <PlusIcon size={32}
                        className='text-green-500 border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-green-500 hover:bg-green-300'
                    />}>
                    <h2 className='text-2xl font-bold'>INSERTAR ESTUDIANTE</h2>
                    <Form action={insertarEstudiante} gruposIdNombre={gruposIdNombre} asignaturasIdNombre={asignaturasIdNombre} />
                </Modal>

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




