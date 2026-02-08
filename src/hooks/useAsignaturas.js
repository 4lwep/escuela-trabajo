import sortBy from '@/utils/sort';
import { useState } from 'react';


export default function useAsignaturas(dataAsignaturas) {
    const [propiedad, setPropiedad] = useState('nombre');
    const [orden, setOrden] = useState('asc');
    const [buscar, setBuscar] = useState('');

    let asignaturasFiltradas = sortBy(dataAsignaturas, propiedad, orden);

    if (buscar) {
        const busqueda = buscar.toLowerCase();
        asignaturasFiltradas = asignaturasFiltradas.filter(asignatura =>
            asignatura.nombre.toLowerCase().includes(busqueda) ||
            asignatura.profesor.toLowerCase().includes(busqueda) ||
            asignatura.horas_semana.toString().includes(busqueda)
        );
    }

    return { asignaturasFiltradas, propiedad, setPropiedad, orden, setOrden, buscar, setBuscar };
}
