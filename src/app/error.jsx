'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex min-h-screen flex-col items-center justify-center p-4 text-center'>
            <h2 className='mb-4 text-2xl font-bold font-heading text-red-600 text-shadow-2xl text-shadow-amber-500'>
                ¡Algo ha salido mal!
            </h2>

            <p className='mb-8 text-neutral-600 dark:text-neutral-400 max-w-md'>
                Ha ocurrido un error al intentar conectar con el servidor o la base de datos.
                <br />
                <span className='text-sm mt-2 block opacity-70 font-mono bg-neutral-100 dark:bg-neutral-800 p-2 rounded overflow-x-auto'>
                    {error.message || "Error desconocido"}
                </span>
            </p>

            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className='rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
                Intentar de nuevo
            </button>
        </div>
    )
}
