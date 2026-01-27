

// Función para acceder a propiedades anidadas de un objeto
function getValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

// Función de ordenamiento genérica. Ordena un array de objetos
export default function sortBy(array, path, orden = 'asc') {
    return array.toSorted((a, b) => {
        const valA = getValue(a, path);
        const valB = getValue(b, path);

        // Valores seguros para undefined/null
        const valorA = valA ?? (typeof valA === 'number' ? -Infinity : valA instanceof Date ? new Date(0) : '');
        const valorB = valB ?? (typeof valB === 'number' ? -Infinity : valB instanceof Date ? new Date(0) : '');

        // Comparación automática
        let cmp;
        if (typeof valorA === 'number' && typeof valorB === 'number') cmp = valorA - valorB;
        else if (valorA instanceof Date && valorB instanceof Date) cmp = valorA - valorB;
        else cmp = String(valorA).localeCompare(String(valorB));

        return orden === 'asc' ? cmp : -cmp;
    })
}