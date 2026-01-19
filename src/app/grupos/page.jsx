import Form from '@/components/grupos/form'
import ListaGrupos from '@/components/grupos/lista'
import Modal from '@/components/modal'
import { obtenerGrupos } from '@/lib/data'
import { insertarGrupo } from '@/lib/actions'
import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'


function PaginaGrupos() {

    const promesaGrupos = obtenerGrupos()  // Promesa, no usamos AWAIT

    return (
        <div>
            <h1 className='text-4xl'>Grupos</h1>


            <Modal openElement={
                <PlusIcon color='green' size={32}
                    className='border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-green-500 hover:bg-green-300'
                />}>
                <Form action={insertarGrupo} />
            </Modal>

            <Suspense fallback={<p className='text-2xl text-blue-400'>Cargando...</p>}>
                <ListaGrupos
                    promesaGrupos={promesaGrupos}
                />
            </Suspense>
        </div>
    )
}

export default PaginaGrupos


