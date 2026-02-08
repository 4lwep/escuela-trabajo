
'use client'
import { RefreshCwIcon } from "lucide-react"
import { useActionState, useId, useEffect } from "react"
import { toast } from "sonner"



export default function Form({ action, estudiante, gruposIdNombre, asignaturasIdNombre, disabled = false, textSubmit = "Enviar" }) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog').close()
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <form id={formId} action={faction} className="flex flex-col gap-2 border p-4 border-blue-400" >
            <input type="hidden" name="id" value={estudiante?.id} />
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                defaultValue={estudiante?.nombre}
                disabled={disabled}
            />
            <input
                type="text"
                name="foto"
                placeholder="Foto"
                defaultValue={estudiante?.foto}
                disabled={disabled}
            />
            <input
                type="text"
                name="tutor_legal"
                placeholder="Tutor legal"
                defaultValue={estudiante?.tutor_legal}
                disabled={disabled}
            />
            <input
                type="date"
                name="fecha_nacimiento"
                placeholder="Fecha de nacimiento"
                defaultValue={estudiante?.fecha_nacimiento?.toISOString().split('T')[0] || '2000-01-01'}
                disabled={disabled}
            />


            {/* Usar Select o Radio, pero no ambos a la vez */}
            {/* Select */}
            {disabled
                ? <p>Grupo: {estudiante?.grupo?.nombre}</p>
                : <details>
                    <summary>Grupo ({estudiante?.grupo?.nombre})</summary>
                    <select className="w-full p-2 border border-blue-400 rounded-md"
                        key={estudiante?.grupoId}
                        name="grupoId"
                        defaultValue={estudiante?.grupoId}
                        size={4}
                        disabled={disabled}
                    >
                        <option value="">Seleccionar grupo</option>
                        {gruposIdNombre.map((grupo) => (
                            <option value={grupo.id} key={grupo.id}>
                                {grupo.nombre}
                            </option>
                        ))}
                    </select>
                </details>
            }


            {/* Radio */}
            {/* {disabled
                ? <p>Grupo: {estudiante?.grupo?.nombre}</p>
                : <details>
                    <summary>Grupo ({estudiante?.grupo?.nombre})</summary>

                    {gruposIdNombre?.map((grupo) =>
                        <label key={grupo.id} className="block">
                            <input
                                type='radio'
                                name='grupoId'
                                value={grupo.id}
                                defaultChecked={estudiante?.grupo?.id == grupo.id}
                            />
                            {grupo.nombre}
                        </label>
                    )}
                </details >
            } */}




            {/* Checkbox */}
            {
                disabled
                    ? <p>Asignaturas: {estudiante?.asignaturas?.map(a => a.nombre).join(', ')}</p>
                    : <details>
                        <summary>Asignaturas ({estudiante?.asignaturas?.map(a => a.nombre).join(', ')})</summary>

                        {asignaturasIdNombre?.map((asignatura) => (
                            <label key={asignatura.id} className='block'>
                                <input
                                    type='checkbox'
                                    name="asignaturas"
                                    value={asignatura.id}
                                    defaultChecked={estudiante?.asignaturas?.some(a => a.id == asignatura.id)}
                                />

                                {asignatura.nombre}
                            </label>
                        ))}

                    </details>
            }


            <button
                type="submit"
                className="flex justify-center items-center bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending
                    ? <RefreshCwIcon size={20} className="animate-spin" />
                    : textSubmit
                }
            </button>
        </form >
    )
}



