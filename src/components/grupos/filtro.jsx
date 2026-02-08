'use client'



export default function Filtro({ buscar, setBuscar, propiedad = 'nombre', setPropiedad, orden = 'asc', setOrden }) {
    return (
        <div className="flex flex-wrap gap-2 mb-2">

            <fieldset className="flex flex-wrap gap-2 mb-2">
                <legend className='font-bold'>Filtrar</legend>

                <input
                    type="search"
                    placeholder="Buscar"
                    value={buscar}
                    onChange={e => setBuscar(e.target.value)}
                    className="p-2 border rounded-md w-fit"
                />
            </fieldset>

            <fieldset className="flex flex-wrap gap-2 mb-2">
                <legend className='font-bold'>Ordenar</legend>

                <select value={propiedad} onChange={e => setPropiedad(e.target.value)} className="p-2 border rounded-md w-fit">
                    <option value="nombre">Nombre</option>
                    <option value="tutor">Tutor</option>
                    <option value="aula">Aula</option>
                </select>
                <select value={orden} onChange={e => setOrden(e.target.value)} className="p-2 border rounded-md w-fit">
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </fieldset>
        </div>
    )
}
