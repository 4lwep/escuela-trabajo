export const labelDefault = (
  <span className="flex gap-2 justify-center items-center w-full font-bold bg-blue-700 text-white p-2 rounded-md">
    Enviar
  </span>
);

export const labelInsertar = (
  <span className="flex gap-2 justify-center items-center w-full font-bold bg-green-700 text-white p-2 rounded-md">
    Guardar
  </span>
);

export const labelModificar = (
  <span className="flex gap-2 justify-center items-center w-full font-bold bg-amber-700 text-white p-2 rounded-md">
    Actualizar
  </span>
);

export const labelEliminar = (
  <span className="flex gap-2 justify-center items-center w-full font-bold bg-red-700 text-white p-2 rounded-md">
    Eliminar
  </span>
);

export const Label = ({ color, children }) => (
  <span
    className={`flex gap-2 justify-center items-center w-full font-bold bg-${color}-700 text-white p-2 rounded-md`}
  >
    {children}
  </span>
);
