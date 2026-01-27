import { FilePenLineIcon, PlusIcon, TrashIcon } from "lucide-react"



export const IconoInsertar = () => <PlusIcon size={32}
    className='text-green-500 border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-green-500 hover:bg-green-300'
/>


export const IconoModificar = () => <FilePenLineIcon size={32}
    className='text-orange-500 border border-orange-500 rounded-full bg-orange-200 p-2 cursor-pointer hover:text-orange-500 hover:bg-orange-300'
/>


export const IconoEliminar = () => <TrashIcon size={32}
    className='text-red-500 border border-red-500 rounded-full bg-red-200 p-2 cursor-pointer hover:text-red-500 hover:bg-red-300'
/>
