export interface Cartao {
  id: number;
  nome: string;
  profissao: string;
  descricao: string | null;
  telefone: string | null;
  whatsapp: string | null;
  instagram: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;
  cidade: string | null;
  estado: string | null;
  categoria: string;
  ativo: boolean;
  destaque: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export const CATEGORIAS = [
  "Saúde e Bem-estar",
  "Beleza e Estética",
  "Construção e Reformas",
  "Educação e Cursos",
  "Alimentação",
  "Transporte e Automóveis",
  "Tecnologia",
  "Pets",
  "Casa e Jardim",
  "Moda e Vestuário",
  "Eventos",
  "Consultoria e Finanças",
  "Advocacia e Jurídico",
  "Outros",
];
