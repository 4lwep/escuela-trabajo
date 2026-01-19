


export default function Form({ action, grupo, disabled = false, textSubmit = "Enviar" }) {

    return (
        <form action={action} className="flex flex-col gap-2 border p-4 border-blue-400">
            <input type="hidden" name="id" value={grupo?.id} />
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                defaultValue={grupo?.nombre}
                disabled={disabled}
            />
            <input
                type="text"
                name="tutor"
                placeholder="Tutor"
                defaultValue={grupo?.tutor}
                disabled={disabled}
            />
            <input
                type="text"
                name="aula"
                placeholder="Aula"
                defaultValue={grupo?.aula}
                disabled={disabled}
            />
            <button type="submit">{textSubmit}</button>
        </form>
    )
}



