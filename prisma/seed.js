require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const { PrismaClient } = require("@prisma/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");
const path = require("path");

const libsql = createClient({ url: "file:" + path.join(__dirname, "dev.db").replace(/\\/g, "/") });
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });

const cartoes = [
  {
    nome: "Dra. Ana Paula Rodrigues",
    profissao: "Fisioterapeuta",
    descricao: "Especialista em fisioterapia esportiva e ortopedica. Atendimento domiciliar disponivel.",
    whatsapp: "11991112222",
    instagram: "@anapaula.fisio",
    email: "anapaula@fisio.com",
    cidade: "Sao Paulo",
    estado: "SP",
    categoria: "Saude e Bem-estar",
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
    categoria: "Saude e Bem-estar",
    destaque: true,
  },
  {
    nome: "Lava Rapido Express",
    profissao: "Lavagem de Veiculos",
    descricao: "Lavagem completa, cera e higienizacao interna. Atendemos com hora marcada.",
    whatsapp: "11993334444",
    telefone: "(11) 3333-4444",
    cidade: "Santo Andre",
    estado: "SP",
    categoria: "Transporte e Automoveis",
    destaque: false,
  },
  {
    nome: "Joao Construcoes",
    profissao: "Pedreiro e Reformas",
    descricao: "Reformas em geral, construcoes, pisos, revestimentos. Orcamento gratis.",
    whatsapp: "11994445555",
    cidade: "Sao Bernardo do Campo",
    estado: "SP",
    categoria: "Construcao e Reformas",
    destaque: true,
  },
  {
    nome: "Salao Beleza Total",
    profissao: "Cabeleireiro e Estetica",
    descricao: "Cortes, coloracao, tratamentos capilares e manicure. Agende pelo WhatsApp.",
    whatsapp: "11995556666",
    instagram: "@belezatotal",
    cidade: "Guarulhos",
    estado: "SP",
    categoria: "Beleza e Estetica",
    destaque: false,
  },
  {
    nome: "TechFix Solucoes",
    profissao: "Manutencao de Computadores",
    descricao: "Formatacao, instalacao de programas, redes e suporte tecnico. Atendimento a domicilio.",
    whatsapp: "11996667777",
    email: "techfix@email.com",
    website: "https://techfix.com.br",
    cidade: "Sao Paulo",
    estado: "SP",
    categoria: "Tecnologia",
    destaque: false,
  },
  {
    nome: "Dog and Cat Petshop",
    profissao: "Banho, Tosa e Pet Hotel",
    descricao: "Cuidamos do seu pet com carinho. Banho, tosa, veterinario e hotel para pets.",
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
    descricao: "Consultas presenciais e online. Foco em emagrecimento saudavel e qualidade de vida.",
    whatsapp: "11998889999",
    instagram: "@dracarla.nutri",
    email: "carla@nutricao.com",
    cidade: "Sao Paulo",
    estado: "SP",
    categoria: "Saude e Bem-estar",
    destaque: true,
  },
];

async function main() {
  console.log("Iniciando seed...");
  for (const data of cartoes) {
    await prisma.cartao.create({ data });
  }
  console.log(cartoes.length + " cartoes criados com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
