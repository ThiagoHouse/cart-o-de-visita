export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
import CartaoCard from "@/components/CartaoCard";
import { CATEGORIAS } from "@/lib/types";
import { prisma } from "@/lib/prisma";

async function getDestaques() {
  return prisma.cartao.findMany({
    where: { ativo: true, destaque: true },
    orderBy: { criadoEm: "desc" },
    take: 4,
  });
}

export default async function Home() {
  const destaques = await getDestaques();

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Encontre profissionais perto de você
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Fisioterapeutas, eletricistas, cabeleireiros, personal trainers e muito mais.
          </p>
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <AdBanner format="horizontal" />
      </div>

      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold mb-5">Categorias</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat}
              href={"/buscar?categoria=" + encodeURIComponent(cat)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center text-sm font-medium text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {destaques.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold mb-5">Profissionais em Destaque</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destaques.map((c) => (
              <CartaoCard key={c.id} cartao={c} />
            ))}
          </div>
        </section>
      )}

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <AdBanner format="horizontal" />
      </div>

      <section className="bg-blue-50 mt-12 py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-blue-700 font-bold mb-3">É um profissional?</h2>
          <p className="text-gray-600 mb-6">Cadastre seu cartão de visitas digital e seja encontrado por milhares de pessoas.</p>
          <Link
            href="/admin"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Cadastrar meu cartão
          </Link>
        </div>
      </section>
    </div>
  );
}