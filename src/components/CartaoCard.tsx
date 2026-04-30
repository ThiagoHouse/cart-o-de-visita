"use client";

import { Cartao } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  cartao: Cartao;
}

export default function CartaoCard({ cartao }: Props) {
  return (
    <Link href={`/cartao/${cartao.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 h-full">
        {/* Header colorido */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-16 flex items-end px-5 pb-0 relative">
          <div className="absolute -bottom-7 left-5">
            {cartao.logoUrl ? (
              <Image
                src={cartao.logoUrl}
                alt={cartao.nome}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full border-4 border-white object-cover bg-white"
              />
            ) : (
              <div className="w-14 h-14 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                {cartao.nome.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {cartao.destaque && (
            <span className="absolute top-2 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
              ⭐ Destaque
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <div className="pt-9 px-5 pb-5">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{cartao.nome}</h3>
          <p className="text-blue-600 text-sm font-medium">{cartao.profissao}</p>
          <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
            {cartao.categoria}
          </span>
          {cartao.descricao && (
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">{cartao.descricao}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {cartao.whatsapp && (
              <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                📱 WhatsApp
              </span>
            )}
            {cartao.instagram && (
              <span className="flex items-center gap-1 text-xs text-pink-700 bg-pink-50 rounded-full px-2 py-0.5">
                📸 Instagram
              </span>
            )}
            {cartao.cidade && (
              <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-full px-2 py-0.5">
                📍 {cartao.cidade}
                {cartao.estado ? `, ${cartao.estado}` : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
