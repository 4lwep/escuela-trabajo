


export default function Form({ action, estudiante, gruposIdNombre, asignaturasIdNombre, disabled = false, textSubmit = "Enviar" }) {

    return (
        <form action={action} className="flex flex-col gap-2 border p-4 border-blue-400">
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

            {/* {disabled
                ? <p>Grupo: {estudiante?.grupo?.nombre}</p>
                : <details>
                    <summary>Grupo</summary>
                    <select className="w-fit p-2 border border-blue-400 rounded-md"
                        name="grupoId"
                        key={estudiante?.grupoId}
                        defaultValue={estudiante?.grupoId}
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
            } */}

            {disabled
                ? <p>Grupo: {estudiante?.grupo?.nombre}</p>
                : <details>
                    <summary>Grupo</summary>
                    {gruposIdNombre?.map((grupo) => <div key={grupo.id}>
                        {estudiante?.grupo?.id == grupo.id
                            ? <input key={`radio-${grupo.id}`} type='radio' name='grupoId' value={grupo.id} defaultChecked />
                            : <input type='radio' name='grupoId' value={grupo.id} />
                        }
                        {grupo.nombre}
                    </div>)}
                </details>
            }


            {disabled
                ? <p>Asignaturas: {estudiante?.asignaturas?.map(a => a.nombre).join(', ')}</p>
                : <details>
                    <summary>Asignaturas</summary>

                    {asignaturasIdNombre?.map((asignatura) => (
                        <label key={asignatura.id} className='block'>
                            <input
                                type='checkbox'
                                name={asignatura.id}
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
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                {textSubmit}
            </button>
        </form>
    )
}



