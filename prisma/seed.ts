import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    connectionLimit: 5,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const passwordHash = await bcrypt.hash("Admin_23", 10);

    const admin = await prisma.user.upsert({
        where: {
            username: "admin",
        },
        update: {
            name: "Admin",
            email: "admin@safelearn.com",
            passwordHash,
            role: "admin",
        },
        create: {
            name: "Admin",
            username: "admin",
            email: "admin@safelearn.com",
            passwordHash,
            role: "admin",
        },
    });

    console.log("Admin seeded successfully:");
    console.log({
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role,
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });