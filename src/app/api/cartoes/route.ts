import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const categoria = searchParams.get("categoria") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 12;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { ativo: true };

  if (q) {
    where.OR = [
      { nome: { contains: q } },
      { profissao: { contains: q } },
      { descricao: { contains: q } },
      { categoria: { contains: q } },
    ];
  }

  if (categoria) {
    where.categoria = { contains: categoria };
  }

  const [cartoes, total] = await Promise.all([
    prisma.cartao.findMany({
      where,
      orderBy: [{ destaque: "desc" }, { criadoEm: "desc" }],
      skip,
      take: limit,
    }),
    prisma.cartao.count({ where }),
  ]);

  return NextResponse.json({ cartoes, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();

  const { nome, profissao, categoria } = body;
  if (!nome || !profissao || !categoria) {
    return NextResponse.json({ error: "nome, profissao e categoria são obrigatórios" }, { status: 400 });
  }

  const cartao = await prisma.cartao.create({
    data: {
      nome: body.nome,
      profissao: body.profissao,
      descricao: body.descricao ?? null,
      telefone: body.telefone ?? null,
      whatsapp: body.whatsapp ?? null,
      instagram: body.instagram ?? null,
      email: body.email ?? null,
      website: body.website ?? null,
      logoUrl: body.logoUrl ?? null,
      cidade: body.cidade ?? null,
      estado: body.estado ?? null,
      categoria: body.categoria,
      destaque: body.destaque ?? false,
    },
  });

  return NextResponse.json(cartao, { status: 201 });
}
