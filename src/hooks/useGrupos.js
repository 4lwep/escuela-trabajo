import sortBy from '@/utils/sort';
import { useState } from 'react';

export default function useGrupos(dataGrupos) {
    const [propiedad, setPropiedad] = useState('nombre');
    const [orden, setOrden] = useState('asc');
    const [buscar, setBuscar] = useState('');

    let gruposFiltrados = sortBy(dataGrupos, propiedad, orden);

    if (buscar) {
        const busqueda = buscar.toLowerCase();
        gruposFiltrados = gruposFiltrados.filter(grupo =>
            grupo.nombre.toLowerCase().includes(busqueda) ||
            grupo.tutor.toLowerCase().includes(busqueda) ||
            grupo.aula.toLowerCase().includes(busqueda)
        );
    }

    return { gruposFiltrados, propiedad, setPropiedad, orden, setOrden, buscar, setBuscar };
}
