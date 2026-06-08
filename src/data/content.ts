import { GALLERY, JOSE } from "./assets";
import type { Episode, NewsItem, Story } from "./types";

export const episodes: Episode[] = [
  {
    id: "ep1",
    titulo: "Como transformar paixão por carros em um império de negócios",
    convidado: "Neto Mafra",
    papelConvidado: "CEO da Boca Mafra Premium",
    duracao: "1h 12min",
    capa: GALLERY[1],
    destaque: true,
    views: "48 mil",
  },
  {
    id: "ep2",
    titulo: "Os bastidores do mercado de hipercarros no Brasil",
    convidado: "Piloto convidado",
    papelConvidado: "Piloto profissional",
    duracao: "58min",
    capa: GALLERY[2],
    views: "31 mil",
  },
  {
    id: "ep3",
    titulo: "Networking de elite: o verdadeiro ativo do SCA",
    convidado: "Empresário do mês",
    papelConvidado: "Membro Diamond",
    duracao: "1h 04min",
    capa: GALLERY[3],
    views: "27 mil",
  },
  {
    id: "ep4",
    titulo: "JDM no Brasil: a cultura por trás dos esportivos japoneses",
    convidado: "Colecionador JDM",
    papelConvidado: "Membro & colecionador",
    duracao: "49min",
    capa: GALLERY[4],
    views: "22 mil",
  },
];

export const stories: Story[] = [
  { id: "s0", titulo: "Recado do José", capa: JOSE, fundador: true },
  { id: "s1", titulo: "Bastidores 140ª", capa: GALLERY[1] },
  { id: "s2", titulo: "Pátio JDM", capa: GALLERY[3] },
  { id: "s3", titulo: "Lounge Diamante", capa: GALLERY[2] },
  { id: "s4", titulo: "Podcast SCA", capa: GALLERY[4] },
  { id: "s5", titulo: "6 Anos SCA", capa: GALLERY[0] },
];

export const news: NewsItem[] = [
  {
    id: "n1",
    tag: "Recorde",
    titulo: "SCA ultrapassa 2.000 membros ativos",
    resumo: "O ecossistema cresce em 12+ estados e segue expandindo conexões nos EUA e na Europa.",
    capa: GALLERY[0],
    data: "Há 2 dias",
  },
  {
    id: "n2",
    tag: "Novo Parceiro",
    titulo: "Prime Jets entra como parceira Ouro",
    resumo: "Aviação executiva passa a oferecer benefícios exclusivos aos membros Diamond.",
    capa: GALLERY[2],
    data: "Há 5 dias",
  },
  {
    id: "n3",
    tag: "Próxima Praça",
    titulo: "SCA anuncia capítulo em Florianópolis",
    resumo: "Nova praça no Sul amplia o alcance nacional do clube já em 2026.",
    capa: GALLERY[4],
    data: "Há 1 semana",
  },
];

export const canais = [
  { nome: "YouTube", handle: "@supercarrosalphaville", metrica: "7,05 mil inscritos", cor: "#FF0000" },
  { nome: "Instagram", handle: "@supercarrosalphaville", metrica: "audiência premium", cor: "#E1306C" },
  { nome: "Podcast SCA", handle: "Super Carros Alphaville", metrica: "novos episódios toda semana", cor: "#D4AF37" },
];
