"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CATEGORIAS } from "@/lib/types";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (categoria) params.set("categoria", categoria);
    router.push(`/buscar?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ex: fisioterapia, lava jato, pedreiro..."
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">Todas as categorias</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
