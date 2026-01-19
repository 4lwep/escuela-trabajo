
import { insertarAsignatura } from "@/lib/actions"

export default function Form() {

    return (
        <form action={insertarAsignatura}>
            <input type="text" name="nombre" placeholder="Nombre" />
            <input type="text" name="profesor" placeholder="Profesor" />
            <input type="number" min="1" name="horas_semana" placeholder="Horas por semana" />
            <button type="submit">Enviar</button>
        </form>
    )
}



