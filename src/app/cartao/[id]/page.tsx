import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

async function getCartao(id: string) {
  const parsed = parseInt(id);
  if (isNaN(parsed)) return null;
  return prisma.cartao.findFirst({ where: { id: parsed, ativo: true } });
}

export default async function CartaoPage({ params }: Props) {
  const { id } = await params;
  const cartao = await getCartao(id);
  if (!cartao) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Card principal */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 h-28 relative">
          {cartao.destaque && (
            <span className="absolute top-3 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
              ? Destaque
            </span>
          )}
          <div className="absolute -bottom-10 left-6">
            {cartao.logoUrl ? (
              <Image
                src={cartao.logoUrl}
                alt={cartao.nome}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                {cartao.nome.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="pt-14 px-6 pb-6">
          <h1 className="text-2xl font-bold text-gray-900">{cartao.nome}</h1>
          <p className="text-blue-600 font-medium">{cartao.profissao}</p>
          <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-1">
            {cartao.categoria}
          </span>

          {cartao.descricao && (
            <p className="mt-4 text-gray-600 leading-relaxed">{cartao.descricao}</p>
          )}

          {/* Localização */}
          {(cartao.cidade || cartao.estado) && (
            <p className="mt-3 text-gray-500 text-sm">
              ?? {[cartao.cidade, cartao.estado].filter(Boolean).join(", ")}
            </p>
          )}

          {/* Contatos */}
          <div className="mt-6 flex flex-col gap-3">
            {cartao.whatsapp && (
              <a
                href={`https://wa.me/${cartao.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-xl px-4 py-3 transition-colors"
              >
                <span className="text-xl">??</span>
                <span>Chamar no WhatsApp</span>
                <span className="ml-auto text-sm text-green-600">{cartao.whatsapp}</span>
              </a>
            )}

            {cartao.telefone && (
              <a
                href={`tel:${cartao.telefone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-xl px-4 py-3 transition-colors"
              >
                <span className="text-xl">??</span>
                <span>Ligar</span>
                <span className="ml-auto text-sm">{cartao.telefone}</span>
              </a>
            )}

            {cartao.instagram && (
              <a
                href={`https://instagram.com/${cartao.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium rounded-xl px-4 py-3 transition-colors"
              >
                <span className="text-xl">??</span>
                <span>Ver no Instagram</span>
                <span className="ml-auto text-sm">{cartao.instagram}</span>
              </a>
            )}

            {cartao.email && (
              <a
                href={`mailto:${cartao.email}`}
                className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl px-4 py-3 transition-colors"
              >
                <span className="text-xl">??</span>
                <span>Enviar e-mail</span>
                <span className="ml-auto text-sm">{cartao.email}</span>
              </a>
            )}

            {cartao.website && (
              <a
                href={cartao.website.startsWith("http") ? cartao.website : `https://${cartao.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl px-4 py-3 transition-colors"
              >
                <span className="text-xl">??</span>
                <span>Visitar site</span>
                <span className="ml-auto text-sm truncate max-w-[150px]">{cartao.website}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Anúncio */}
      <div className="mt-6">
        <AdBanner format="rectangle" className="mx-auto" />
      </div>

      <div className="mt-6 text-center">
        <Link href="/buscar" className="text-blue-600 hover:underline text-sm">
          ← Voltar para busca
        </Link>
      </div>
    </div>
  );
}
