import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const cartao = await prisma.cartao.findUnique({ where: { id: parseInt(id) } });
  if (!cartao || !cartao.ativo) {
    return NextResponse.json({ error: "Cartão não encontrado" }, { status: 404 });
  }
  return NextResponse.json(cartao);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const cartao = await prisma.cartao.update({
    where: { id: parseInt(id) },
    data: body,
  });

  return NextResponse.json(cartao);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.cartao.update({
    where: { id: parseInt(id) },
    data: { ativo: false },
  });

  return NextResponse.json({ success: true });
}
