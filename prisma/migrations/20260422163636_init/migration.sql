-- CreateTable
CREATE TABLE "Cartao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "descricao" TEXT,
    "telefone" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "email" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "categoria" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);
