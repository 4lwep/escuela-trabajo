'use client'
import { useActionState, useEffect, useId } from "react"
import { toast } from "sonner"

export default function Form({ action, asignatura, disabled = false, textSubmit = "Enviar" }) {
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
        <form id={formId} action={faction} className="flex flex-col gap-2 border p-4 border-blue-400">
            <input type="hidden" name="id" value={asignatura?.id} />
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                defaultValue={asignatura?.nombre}
                disabled={disabled}
            />
            <input
                type="text"
                name="profesor"
                placeholder="Profesor"
                defaultValue={asignatura?.profesor}
                disabled={disabled}
            />
            <input
                type="number" min="1"
                name="horas_semana"
                placeholder="Horas por semana"
                defaultValue={asignatura?.horas_semana}
                disabled={disabled}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending ? 'Procesando...' : textSubmit}
            </button>
        </form>
    )
}



