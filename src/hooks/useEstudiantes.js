import sortBy from '@/utils/sort';
import { useState } from 'react';



export default function useEstudiantes(dataEstudiantes) {
    const [propiedad, setPropiedad] = useState('nombre');
    const [orden, setOrden] = useState('asc');
    const [buscar, setBuscar] = useState('');

    let estudiantesFiltrados = sortBy(dataEstudiantes, propiedad, orden);

    if (buscar) {
        const busqueda = buscar.toLowerCase();
        estudiantesFiltrados = estudiantesFiltrados.filter(estudiante =>
            estudiante.nombre.toLowerCase().includes(busqueda) ||
            estudiante.tutor_legal.toLowerCase().includes(busqueda) ||
            estudiante.grupo?.nombre.toLowerCase().includes(busqueda)
        );
    }

    return { estudiantesFiltrados, propiedad, setPropiedad, orden, setOrden, buscar, setBuscar };
}
