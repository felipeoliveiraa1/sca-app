import { carImg } from "./assets";
import { members } from "./members";
import type { Car, MatchSuggestion } from "./types";

// The logged-in member viewing the app (the demo persona for "Membro").
export const me = {
  id: "me",
  nome: "José Édson Silva",
  tratamento: "Dr. José Silva",
  empresa: "SCA Super Carros Alphaville",
  cargo: "Fundador & CEO",
  numeroSocio: "001",
  tier: "Founder" as const,
  verificado: true,
  desde: 2019,
  cidade: "Alphaville · Barueri · SP",
  avatar: "/assets/jose.jpeg",
  edicoes: 141,
  conexoes: 318,
  pontosPrestigio: 9870,
};

export const minhaGaragem: Car[] = [
  { marca: "Ferrari", modelo: "SF90 Stradale", ano: 2024, potencia: "1.000 cv", img: carImg(1), categoria: "Hipercarro", selos: ["Blindagem Premium", "PPF Diamante"] },
  { marca: "Lamborghini", modelo: "Revuelto", ano: 2024, potencia: "1.015 cv", img: carImg(9), categoria: "Hipercarro", selos: ["Estética AutoLux"] },
  { marca: "Porsche", modelo: "911 Turbo S", ano: 2023, potencia: "650 cv", img: carImg(10), categoria: "Europeu", selos: ["PPF Diamante", "Som & Cine"] },
  { marca: "Nissan", modelo: "GT-R R34", ano: 2002, potencia: "330 cv", img: carImg(7), categoria: "JDM", selos: ["Estética AutoLux"] },
];

// Tiers e benefícios
export const tiers = [
  { nome: "Member", cor: "#9CA3AF", beneficios: ["Acesso às edições regulares", "Perfil no diretório", "App SCA Black"] },
  { nome: "Black", cor: "#D4AF37", beneficios: ["Tudo do Member", "Lounges exclusivos", "Clube de vantagens completo", "Convites prioritários"] },
  { nome: "Diamond", cor: "#E8C77A", beneficios: ["Tudo do Black", "Concierge de lifestyle", "Test drives de hipercarros", "Mesa VIP nos eventos"] },
];

// Níveis (escala completa) — para a tela "Níveis" com os cartões de exemplo.
export const niveis = [
  {
    nome: "Member",
    resumo: "A porta de entrada do clube.",
    comoChega: "Aprovação na Portaria VIP (curadoria).",
    beneficios: ["Edições regulares", "Perfil no diretório", "Networking", "App SCA"],
    membroExemplo: "Carlos Andrade",
  },
  {
    nome: "Black",
    resumo: "Para os membros mais ativos.",
    comoChega: "Engajamento (presença + indicações) ou plano Black.",
    beneficios: ["Tudo do Member", "Lounges exclusivos", "Clube de vantagens completo", "Convites prioritários"],
    membroExemplo: "Fernanda Costa",
  },
  {
    nome: "Diamond",
    resumo: "A elite do clube.",
    comoChega: "Convite/curadoria + top engajamento ou plano Diamond.",
    beneficios: ["Tudo do Black", "Concierge de lifestyle", "Test-drive de hipercarros", "Mesa VIP nos eventos"],
    membroExemplo: "Ricardo Almeida",
  },
  {
    nome: "Founder",
    resumo: "O comando do ecossistema.",
    comoChega: "Fundador & sócios do SCA.",
    beneficios: ["Acesso total", "Painel do Fundador", "Curadoria do clube"],
    membroExemplo: "Dr. José Silva",
  },
] as const;

export const conquistas = [
  { nome: "Veterano 6 Anos", icone: "🏆", desbloqueada: true },
  { nome: "JDM Master", icone: "🏁", desbloqueada: true },
  { nome: "Embaixador SP", icone: "📍", desbloqueada: true },
  { nome: "Top Networker", icone: "🤝", desbloqueada: true },
  { nome: "100 Edições", icone: "💯", desbloqueada: true },
  { nome: "Padrinho de Ouro", icone: "⭐", desbloqueada: false },
];

// Sugestões de match (apontando para membros reais do seed)
export const matches: (MatchSuggestion & { membro: typeof members[number] })[] = [
  { membroId: "m4", motivo: "Ambos atuam em Real Estate e buscam co-investimento", forca: 94, membro: members[3] },
  { membroId: "m9", motivo: "Sinergia entre Tecnologia e seus projetos de inovação", forca: 88, membro: members[8] },
  { membroId: "m2", motivo: "Interesse comum em hipercarros e Investimentos", forca: 85, membro: members[1] },
  { membroId: "m15", motivo: "Hotelaria de luxo — parceria para eventos SCA", forca: 81, membro: members[14] },
];

// Minha agenda de encontros
export const minhaAgenda = [
  { edicaoId: "e141", confirmado: true },
];
