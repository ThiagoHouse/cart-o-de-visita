const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const Sqlite = require("better-sqlite3");

// Use the generated Prisma v7 client
// (ESM - test via tsx or convert to async import)
const db = new Sqlite("prisma/dev.db");
const adapter = new PrismaBetterSqlite3(db);

// dynamic import since the generated client is ESM
async function run() {
  const { PrismaClient } = await import("./src/generated/prisma/client.js");
  const prisma = new PrismaClient({ adapter });
  const n = await prisma.cartao.count();
  console.log("count:", n);
  await prisma.$disconnect();
}

run().catch(e => console.error("ERROR:", e.message));
