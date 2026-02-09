import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen grid place-items-center">

      <h1 className="p-6 w-5/6 text-center text-4xl font-extrabold text-indigo-800  bg-slate-300/30 rounded-full border border-slate-300">
        Escuela 2026
      </h1>

      <div className="flex flex-col gap-4 font-bold text-white">
        <Link
          href="/grupos"
          className="rounded-lg text-center text-2xl py-10 px-20 bg-radial-[at_20%_20%] from-white to-indigo-900 to-75% shadow-neutral-700 shadow-lg"
        >
          GRUPOS
        </Link>
        <Link
          href="/asignaturas"
          className="rounded-lg text-center text-2xl py-10 px-20 bg-radial-[at_20%_20%] from-white to-emerald-900 to-75% shadow-neutral-700 shadow-lg"
        >
          ASIGNATURAS
        </Link>
        <Link
          href="/estudiantes"
          className="rounded-lg text-center text-2xl py-10 px-20 bg-radial-[at_20%_20%] from-white to-amber-900 to-75% shadow-neutral-700 shadow-lg"
        >
          ESTUDIANTES
        </Link>
      </div>
    </div>
  );
}
