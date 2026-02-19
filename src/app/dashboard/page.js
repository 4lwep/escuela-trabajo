import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { LockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";
import { obtenerUsuarios } from "@/lib/data/users";
import { obtenerUsuarioPorId } from "@/lib/data/users";
import { IconoEliminar, IconoModificar } from "@/components/ui/icons";
import { editUser } from "@/lib/actions/users";
import { labelModificar } from "@/components/ui/labels";
import Form from "@/components/users/form";
import Modal from "@/components/ui/modal";
import ListaUsuarios from "@/components/users/lista";
import { Spinner1, Spinner2 } from "@/components/ui/spinners";

export default async function Dashboard() {
  const session = await auth();

  if (!session) redirect("/auth/login");

  const isAdminSession = session.user?.role === "ADMIN";

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      </div>

      <Suspense fallback={<Spinner2 />}>
        <UserInfo session={session} />
      </Suspense>

      {isAdminSession && (
        <>
          <h1 className="text-xl font-bold mt-15">Lista de usuarios</h1>
          <Suspense fallback={<Spinner1 />}>
            <ListaUsuarios
              session={session}
              promesaUsuarios={obtenerUsuarios()}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}

async function UserInfo({ session }) {
  const usuario = await obtenerUsuarioPorId(session.user.id);
  const isAdminSession = session.user.role === "ADMIN";

  return (
    <div className="grid md:grid-cols-[160px_auto] gap-2">
      <img
        src={usuario?.image || "/images/avatar-80.png"}
        className="size-36"
        alt="Imagen de usuario"
      />

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <p className="font-bold">{usuario.name}</p>
          <Modal openElement={<IconoModificar />}>
            <Form
              action={editUser}
              isAdminSession={isAdminSession}
              user={usuario}
              labelSubmit={labelModificar}
            />
          </Modal>
        </div>
        <p>{usuario.email}</p>
        <p>{usuario.address}</p>
        <p>{usuario.phone}</p>
        <p>{usuario.role}</p>
      </div>
    </div>
  );
}

const Popover = ({ pedido }) => (
  <div className="absolute left-10 bottom-1 z-50 mt-2 hidden group-hover:block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-2xl p-4 min-w-[320px]">
    <div className="grid grid-cols-[60px_auto] gap-4 mt-4 border border-slate-300 rounded-md p-2">
      <img src={pedido.cliente.image} alt="" className="size-14" />
      <div>
        <p>Cliente: {pedido.cliente.name}</p>
        <p>Dirección: {pedido.cliente.address}</p>
        <p>Teléfono: {pedido.cliente.phone}</p>
      </div>
    </div>

    <div className="mt-4 border border-slate-300 rounded-md p-2">
      <p>Repartidor: {pedido.repartidor?.nombre}</p>
      <p>Tfno repartidor: {pedido.repartidor?.telefono}</p>
    </div>
  </div>
);
