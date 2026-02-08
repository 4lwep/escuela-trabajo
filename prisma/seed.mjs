import grupos from './data/grupos.json' with { type: 'json' };
import estudiantes from './data/estudiantes.json' with { type: 'json' };
import asignaturas from './data/asignaturas.json' with { type: 'json' };

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // PELIGRO: Borramos todo
    await prisma.asignatura.deleteMany();
    await prisma.estudiante.deleteMany();
    await prisma.grupo.deleteMany();

    // MYSQL
    // await prisma.$executeRaw`ALTER TABLE Asignatura AUTO_INCREMENT = 1;`
    // await prisma.$executeRaw`ALTER TABLE Estudiante AUTO_INCREMENT = 1;`
    // await prisma.$executeRaw`ALTER TABLE Grupo AUTO_INCREMENT = 1;`


    // POSTGRESQL
    // await prisma.$executeRaw`ALTER SEQUENCE "Asignatura_id_seq" RESTART WITH 1;`;
    // await prisma.$executeRaw`ALTER SEQUENCE "Estudiante_id_seq" RESTART WITH 1;`;
    // await prisma.$executeRaw`ALTER SEQUENCE "Grupo_id_seq" RESTART WITH 1;`;

    console.log("Añadiendo grupos...")
    await prisma.grupo.createMany({
        data: grupos,
        skipDuplicates: true,
    });

    console.log("Añadiendo estudiantes...")
    await prisma.estudiante.createMany({
        data: estudiantes,
        skipDuplicates: true,
    });

    console.log("Añadiendo asignaturas...")
    await prisma.asignatura.createMany({
        data: asignaturas,
        skipDuplicates: true,
    });

    console.log("Listo!")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
