
import { insertarGrupo } from "@/lib/actions"

export default function Form() {

    return (
        <form action={insertarGrupo}>
            <input type="text" name="nombre" placeholder="Nombre" />
            <input type="text" name="tutor" placeholder="Tutor" />
            <input type="text" name="aula" placeholder="Aula" />
            <button type="submit">Enviar</button>
        </form>
    )
}



