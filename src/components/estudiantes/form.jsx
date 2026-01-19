
import { insertarEstudiante } from "@/lib/actions"

export default function Form() {

    return (
        <form action={insertarEstudiante}
            className="flex flex-col gap-2 border p-4 border-blue-400">
            <input type="text" name="nombre" placeholder="Nombre" />
            <input type="text" name="foto" placeholder="Foto" />
            <input type="text" name="tutor_legal" placeholder="Tutor legal" />
            <input type="date" name="fecha_nacimiento" placeholder="Fecha de nacimiento" />
            <button type="submit">Enviar</button>
        </form>
    )
}



