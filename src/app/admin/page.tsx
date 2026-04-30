"use client";

import { useState, useEffect } from "react";
import { CATEGORIAS, Cartao } from "@/lib/types";

const EMPTY_FORM = {
  nome: "",
  profissao: "",
  descricao: "",
  telefone: "",
  whatsapp: "",
  instagram: "",
  email: "",
  website: "",
  logoUrl: "",
  cidade: "",
  estado: "",
  categoria: "",
  destaque: false,
};

export default function AdminPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/cartoes?page=1")
      .then((r) => r.json())
      .then((d) => setCartoes(d.cartoes ?? []));
  }, [message]);

  async function handleDelete(id: number) {
    if (!secret) {
      setMessage({ type: "error", text: "Informe a senha admin antes de excluir." });
      return;
    }
    if (!confirm("Deseja realmente excluir este cartão?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/cartoes/${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret },
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Cartão excluído com sucesso!" });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Erro ao excluir." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão." });
    } finally {
      setDeletingId(null);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/cartoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Cartão cadastrado com sucesso!" });
        setForm(EMPTY_FORM);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Erro ao cadastrar cartão." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro de conexão. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Painel Admin</h1>
      <p className="text-gray-500 mb-8 text-sm">Cadastre um novo cartão de visitas digital.</p>

      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-5">
        {/* Senha Admin */}
        <div>
          <label className={labelClass}>🔑 Senha Admin *</label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Senha de acesso"
            required
            className={inputClass}
          />
        </div>

        <hr />

        {/* Dados básicos */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nome *</label>
            <input name="nome" value={form.nome} onChange={handleChange} required className={inputClass} placeholder="Ex: João Silva" />
          </div>
          <div>
            <label className={labelClass}>Profissão / Serviço *</label>
            <input name="profissao" value={form.profissao} onChange={handleChange} required className={inputClass} placeholder="Ex: Fisioterapeuta" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Categoria *</label>
          <select name="categoria" value={form.categoria} onChange={handleChange} required className={inputClass}>
            <option value="">Selecione uma categoria</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows={3}
            placeholder="Breve descrição dos serviços..."
            className={inputClass}
          />
        </div>

        {/* Contatos */}
        <hr />
        <h2 className="text-base font-semibold text-gray-700">Contatos</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className={inputClass} placeholder="(11) 99999-9999" />
          </div>
          <div>
            <label className={labelClass}>Telefone</label>
            <input name="telefone" value={form.telefone} onChange={handleChange} className={inputClass} placeholder="(11) 3333-3333" />
          </div>
          <div>
            <label className={labelClass}>Instagram</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} className={inputClass} placeholder="@usuario" />
          </div>
          <div>
            <label className={labelClass}>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="contato@email.com" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Website</label>
          <input name="website" value={form.website} onChange={handleChange} className={inputClass} placeholder="https://seusite.com.br" />
        </div>

        {/* Localização */}
        <hr />
        <h2 className="text-base font-semibold text-gray-700">Localização</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Cidade</label>
            <input name="cidade" value={form.cidade} onChange={handleChange} className={inputClass} placeholder="São Paulo" />
          </div>
          <div>
            <label className={labelClass}>Estado (UF)</label>
            <input name="estado" value={form.estado} onChange={handleChange} className={inputClass} placeholder="SP" maxLength={2} />
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className={labelClass}>URL da Logo / Foto</label>
          <input name="logoUrl" value={form.logoUrl} onChange={handleChange} className={inputClass} placeholder="https://..." />
        </div>

        {/* Destaque */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="destaque"
            id="destaque"
            checked={form.destaque}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label htmlFor="destaque" className="text-sm text-gray-700">Marcar como destaque (aparece na home)</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? "Cadastrando..." : "Cadastrar Cartão"}
        </button>
      </form>

      {/* Lista de cartões para exclusão */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Cartões cadastrados</h2>
        {cartoes.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum cartão encontrado.</p>
        ) : (
          <div className="space-y-3">
            {cartoes.map((c) => (
              <div key={c.id} className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{c.nome}</p>
                  <p className="text-sm text-gray-500 truncate">{c.profissao} · {c.categoria}</p>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  disabled={deletingId === c.id}
                  className="shrink-0 bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {deletingId === c.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
