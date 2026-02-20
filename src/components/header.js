import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { Home } from "lucide-react";
import { getUserById } from "@/lib/data";

async function Header() {
  const session = await auth();

  const usuario = session ? await getUserById(session.user.id) : null;

  return (
    <header className="bg-blue-700 text-white flex px-10 py-2 justify-between">
      <nav className="flex gap-4">
        <Link href="/">
          <Home />
        </Link>
        <Link href="/grupos">Grupos</Link>
        <Link href="/estudiantes">Estudiantes</Link>
        <Link href="/asignaturas">Asignaturas</Link>
      </nav>
      <div className="flex gap-4">
        {session ? (
          <Link href="/dashboard">
            <img
              src={usuario?.image || "/images/avatar-80.png"}
              className="size-6 rounded-sm"
              alt="Imagen de usuario"
            />
          </Link>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
