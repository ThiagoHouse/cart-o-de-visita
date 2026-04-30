import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "../dev.db"); // project root
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const cartoes = [
    {
      nome: "Dra. Ana Paula Rodrigues",
      profissao: "Fisioterapeuta",
      descricao: "Especialista em fisioterapia esportiva e ortopédica. Atendimento domiciliar disponível.",
      whatsapp: "11991112222",
      instagram: "@anapaula.fisio",
      email: "anapaula@fisio.com",
      cidade: "São Paulo",
      estado: "SP",
      categoria: "Saúde e Bem-estar",
      destaque: true,
    },
    {
      nome: "Studio Pilates Move",
      profissao: "Pilates e Bem-estar",
      descricao: "Studio de pilates com equipamentos modernos. Turmas reduzidas para melhor acompanhamento.",
      whatsapp: "11992223333",
      instagram: "@studiomove",
      cidade: "Campinas",
      estado: "SP",
      categoria: "Saúde e Bem-estar",
      destaque: true,
    },
    {
      nome: "Lava Rápido Express",
      profissao: "Lavagem de Veículos",
      descricao: "Lavagem completa, cera e higienização interna. Atendemos com hora marcada.",
      whatsapp: "11993334444",
      telefone: "(11) 3333-4444",
      cidade: "Santo André",
      estado: "SP",
      categoria: "Transporte e Automóveis",
      destaque: false,
    },
    {
      nome: "João Construções",
      profissao: "Pedreiro e Reformas",
      descricao: "Reformas em geral, construções, pisos, revestimentos. Orçamento grátis.",
      whatsapp: "11994445555",
      cidade: "São Bernardo do Campo",
      estado: "SP",
      categoria: "Construção e Reformas",
      destaque: true,
    },
    {
      nome: "Salão Beleza Total",
      profissao: "Cabeleireiro e Estética",
      descricao: "Cortes, coloração, tratamentos capilares e manicure. Agende pelo WhatsApp.",
      whatsapp: "11995556666",
      instagram: "@belezatotal",
      cidade: "Guarulhos",
      estado: "SP",
      categoria: "Beleza e Estética",
      destaque: false,
    },
    {
      nome: "TechFix Soluções",
      profissao: "Manutenção de Computadores",
      descricao: "Formatação, instalação de programas, redes e suporte técnico. Atendimento a domicílio.",
      whatsapp: "11996667777",
      email: "techfix@email.com",
      website: "https://techfix.com.br",
      cidade: "São Paulo",
      estado: "SP",
      categoria: "Tecnologia",
      destaque: false,
    },
    {
      nome: "Dog & Cat Petshop",
      profissao: "Banho, Tosa e Pet Hotel",
      descricao: "Cuidamos do seu pet com carinho. Banho, tosa, veterinário e hotel para pets.",
      whatsapp: "11997778888",
      instagram: "@dogcatpet",
      cidade: "Osasco",
      estado: "SP",
      categoria: "Pets",
      destaque: false,
    },
    {
      nome: "Dra. Carla Mendes",
      profissao: "Nutricionista",
      descricao: "Consultas presenciais e online. Foco em emagrecimento saudável e qualidade de vida.",
      whatsapp: "11998889999",
      instagram: "@dracarla.nutri",
      email: "carla@nutricao.com",
      cidade: "São Paulo",
      estado: "SP",
      categoria: "Saúde e Bem-estar",
      destaque: true,
    },
  ];

  console.log("?? Iniciando seed...");

  for (const data of cartoes) {
    await prisma.cartao.upsert({
      where: { id: cartoes.indexOf(data) + 1 },
      update: {},
      create: data,
    });
  }

  console.log(`? ${cartoes.length} cartões criados com sucesso!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
