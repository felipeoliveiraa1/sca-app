export type Tier = "Member" | "Black" | "Diamond" | "Founder";

export interface Car {
  marca: string;
  modelo: string;
  ano: number;
  potencia: string;
  img: string;
  selos?: string[]; // partner seals (blindagem / estética)
  categoria?: "Europeu" | "JDM" | "Hipercarro" | "Clássico";
}

export interface Member {
  id: string;
  nome: string;
  empresa: string;
  cargo: string;
  setor: string;
  cidade: string;
  estado: string;
  tier: Tier;
  verificado: boolean;
  avatar: string;
  desde: number;
  carros: Car[];
  bio: string;
  edicoes: number;
  destaque?: boolean;
}

export interface Edition {
  id: string;
  numero: number;
  titulo: string;
  data: string; // ISO
  local: string;
  cidade: string;
  estado: string;
  capa: string;
  status: "proxima" | "passada";
  carrosConfirmados: number;
  membrosConfirmados: number;
  tema?: "JDM" | "Aniversário" | "Regular";
  destaque?: string;
  vencedorCarroDoDia?: string;
  vagasRestantes?: number;
}

export interface Partner {
  id: string;
  nome: string;
  categoria: "Diamante" | "Ouro" | "Prata";
  setor: string;
  logo: string; // text-based logo (initials) — rendered as gold monogram
  cor: string;
  story: string;
  beneficio: string;
}

export interface Benefit {
  id: string;
  parceiro: string;
  titulo: string;
  descricao: string;
  validade: string;
  categoria: "Diamante" | "Ouro" | "Prata";
  relampago?: boolean;
}

export interface Episode {
  id: string;
  titulo: string;
  convidado: string;
  papelConvidado: string;
  duracao: string;
  capa: string;
  destaque?: boolean;
  views: string;
}

export interface MatchSuggestion {
  membroId: string;
  motivo: string;
  forca: number; // 0-100
}

export interface Application {
  id: string;
  nome: string;
  empresa: string;
  setor: string;
  cidade: string;
  padrinho: string;
  carro: string;
  avatar: string;
}

export interface StateNode {
  uf: string;
  nome: string;
  membros: number;
  x: number; // % on the map
  y: number;
  ultimaEdicao?: string;
}

export interface Story {
  id: string;
  titulo: string;
  capa: string;
  visto?: boolean;
  fundador?: boolean;
}

export interface NewsItem {
  id: string;
  tag: string;
  titulo: string;
  resumo: string;
  capa: string;
  data: string;
}
