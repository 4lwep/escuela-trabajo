import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getUsers } from "@/lib/data";
import { getUserById } from "@/lib/data";
import { IconoModificar } from "@/components/ui/icons";
import { editUser } from "@/lib/actions";
import { labelModificar } from "@/components/ui/labels";
import Form from "@/components/users/form";
import Modal from "@/components/ui/modal";
import ListaUsuarios from "@/components/users/lista";
import { Spinner1, Spinner2 } from "@/components/ui/spinners";
import { logout } from "@/lib/actions";
import { LockIcon } from "lucide-react";

export default async function Dashboard() {
  const session = await auth();

  if (!session) redirect("/auth/login");

  const isAdminSession = session.user?.role === "ADMIN";

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <form action={logout}>
          <button className="flex gap-2 justify-center items-center px-4 py-2 rounded-full hover:outline hover:outline-slate-300 cursor-pointer">
            <LockIcon /> <span className="hidden md:block">Cerrar sesión</span>
          </button>
        </form>
      </div>

      <Suspense fallback={<Spinner2 />}>
        <UserInfo session={session} />
      </Suspense>

      {isAdminSession && (
        <>
          <h1 className="text-xl font-bold mt-15">Lista de usuarios</h1>
          <Suspense fallback={<Spinner1 />}>
            <ListaUsuarios session={session} promesaUsuarios={getUsers()} />
          </Suspense>
        </>
      )}
    </div>
  );
}

async function UserInfo({ session }) {
  const usuario = await getUserById(session.user.id);
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
