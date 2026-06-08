import { GALLERY } from "./assets";
import type { Edition } from "./types";

export const proximaEdicao: Edition = {
  id: "e141",
  numero: 141,
  titulo: "141ª Edição — Sunset Supercars",
  data: "2026-06-28T16:00:00-03:00",
  local: "Complexo Dream Car Museum",
  cidade: "São Roque",
  estado: "SP",
  capa: GALLERY[0],
  status: "proxima",
  carrosConfirmados: 38,
  membrosConfirmados: 212,
  tema: "Regular",
  destaque: "Pôr do sol entre hipercarros, lounge dos parceiros Diamante e gravação ao vivo do Podcast SCA.",
  vagasRestantes: 12,
};

export const edicoes: Edition[] = [
  proximaEdicao,
  {
    id: "e140",
    numero: 140,
    titulo: "140ª Edição — Fazenda Dimep",
    data: "2026-05-24T15:00:00-03:00",
    local: "Fazenda Dimep",
    cidade: "Itu",
    estado: "SP",
    capa: GALLERY[1],
    status: "passada",
    carrosConfirmados: 96,
    membrosConfirmados: 320,
    tema: "Regular",
    destaque: "Marco histórico: a 140ª edição reuniu o maior pátio do ano.",
    vencedorCarroDoDia: "Ferrari SF90 Stradale",
  },
  {
    id: "e6anos",
    numero: 138,
    titulo: "6 Anos SCA — Dream Car Museum",
    data: "2026-03-15T14:00:00-03:00",
    local: "Complexo Dream Car Museum",
    cidade: "São Roque",
    estado: "SP",
    capa: GALLERY[2],
    status: "passada",
    carrosConfirmados: 400,
    membrosConfirmados: 540,
    tema: "Aniversário",
    destaque: "Megaencontro de aniversário com cerca de 400 esportivos.",
    vencedorCarroDoDia: "Lamborghini Revuelto",
  },
  {
    id: "ejdm1",
    numero: 132,
    titulo: "1ª Edição SCA JDM",
    data: "2025-11-09T13:00:00-03:00",
    local: "Autódromo de Interlagos",
    cidade: "São Paulo",
    estado: "SP",
    capa: GALLERY[3],
    status: "passada",
    carrosConfirmados: 120,
    membrosConfirmados: 280,
    tema: "JDM",
    destaque: "Edição temática dedicada aos esportivos japoneses.",
    vencedorCarroDoDia: "Nissan GT-R R34",
  },
  {
    id: "ecwb4",
    numero: 129,
    titulo: "4ª Edição Curitiba",
    data: "2025-09-21T14:00:00-03:00",
    local: "Campo Magro",
    cidade: "Curitiba",
    estado: "PR",
    capa: GALLERY[4],
    status: "passada",
    carrosConfirmados: 140,
    membrosConfirmados: 300,
    tema: "Regular",
    destaque: "Expansão nacional reunindo ícones do automobilismo no Sul.",
    vencedorCarroDoDia: "Porsche 911 GT3 RS",
  },
];

export const passadas = edicoes.filter((e) => e.status === "passada");
export const edicoesById = Object.fromEntries(edicoes.map((e) => [e.id, e]));

// Programação da próxima edição
export const programacao = [
  { hora: "16:00", titulo: "Abertura dos portões & welcome", local: "Pátio principal" },
  { hora: "16:45", titulo: "Exposição & julgamento Carro do Dia", local: "Pista de exposição" },
  { hora: "17:30", titulo: "Ativações dos parceiros Diamante", local: "Lounge dos parceiros" },
  { hora: "18:15", titulo: "Podcast SCA ao vivo — convidado surpresa", local: "Palco SCA Play" },
  { hora: "19:00", titulo: "Pôr do sol & networking premium", local: "Deck panorâmico" },
  { hora: "20:00", titulo: "Premiação Carro do Dia", local: "Palco principal" },
];

// Pontos do mapa do venue (% relativo)
export const venuePontos = [
  { nome: "Pátio de Exposição", x: 30, y: 38, tipo: "exposicao" },
  { nome: "Lounge dos Parceiros", x: 64, y: 30, tipo: "parceiro" },
  { nome: "Palco SCA Play", x: 50, y: 62, tipo: "palco" },
  { nome: "Deck Panorâmico", x: 76, y: 64, tipo: "lounge" },
  { nome: "Recepção / Check-in", x: 18, y: 72, tipo: "checkin" },
];

// Carros em votação "Carro do Dia"
export const carroDoDia = [
  { nome: "Ferrari SF90 Stradale", dono: "Ricardo Almeida", img: GALLERY[1], votos: 312 },
  { nome: "Lamborghini Revuelto", dono: "Eduardo Tavares", img: GALLERY[2], votos: 287 },
  { nome: "Porsche 911 GT3 RS", dono: "Bruno Carvalho", img: GALLERY[3], votos: 241 },
  { nome: "McLaren 750S", dono: "Rafael Monteiro", img: GALLERY[4], votos: 198 },
];
