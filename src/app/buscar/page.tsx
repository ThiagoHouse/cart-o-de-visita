import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import CartaoCard from "@/components/CartaoCard";
import AdBanner from "@/components/AdBanner";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{ q?: string; categoria?: string; page?: string }>;
}

async function getCartoes(q: string, categoria: string, page: number) {
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

  return { cartoes, total, totalPages: Math.ceil(total / limit) };
}

export default async function BuscarPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q ?? "";
  const categoria = sp.categoria ?? "";
  const page = parseInt(sp.page ?? "1");

  const { cartoes, total, totalPages } = await getCartoes(q, categoria, page);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        {q || categoria ? `Resultados para "${q || categoria}"` : "Todos os profissionais"}
      </h1>

      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>

      {/* Anúncio */}
      <div className="mt-6">
        <AdBanner format="horizontal" />
      </div>

      <p className="mt-6 text-gray-500 text-sm">{total} profissional(is) encontrado(s)</p>

      {cartoes.length === 0 ? (
        <div className="mt-12 text-center text-gray-400 text-lg">
          Nenhum resultado encontrado. Tente outra busca.
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cartoes.map((c, i) => (
            <>
              <CartaoCard key={c.id} cartao={c} />
              {/* Anúncio a cada 8 cards */}
              {(i + 1) % 8 === 0 && (
                <div key={`ad-${i}`} className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <AdBanner format="horizontal" />
                </div>
              )}
            </>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (categoria) params.set("categoria", categoria);
            params.set("page", String(p));
            return (
              <a
                key={p}
                href={`/buscar?${params}`}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {p}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
