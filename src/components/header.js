import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { Home } from "lucide-react";

async function Header() {
  const session = await auth();

  return (
    <header className="bg-blue-700 text-white flex px-10 py-2 justify-between">
      <nav className="flex gap-4">
        <Link href="/">
          <Home />
        </Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/about">About</Link>
      </nav>
      <div className="flex gap-4">
        {session ? (
          <form>
            <button formAction={logout}>Logout</button>
          </form>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
