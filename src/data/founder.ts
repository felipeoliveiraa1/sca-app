import { avatar } from "./assets";
import type { Application, StateNode } from "./types";

export const kpis = [
  { label: "Membros ativos", valor: 2147, sufixo: "", delta: "+8,2% no mês" },
  { label: "Edições realizadas", valor: 140, sufixo: "+", delta: "141ª em junho" },
  { label: "Estados alcançados", valor: 12, sufixo: "+", delta: "EUA & Europa" },
  { label: "Marcas parceiras", valor: 32, sufixo: "", delta: "+5 no trimestre" },
];

// Curva de crescimento de membros (últimos 12 meses)
export const crescimento = [
  1180, 1290, 1370, 1450, 1560, 1660, 1740, 1820, 1910, 1980, 2060, 2147,
];

export const mesesCrescimento = [
  "jul", "ago", "set", "out", "nov", "dez", "jan", "fev", "mar", "abr", "mai", "jun",
];

// Receita por fonte (R$ mil / mês) — seed plausível
export const receita = [
  { fonte: "Mensalidades de associação", valor: 642, cor: "#D4AF37" },
  { fonte: "Patrocínios & cotas", valor: 458, cor: "#E8C77A" },
  { fonte: "Ativações em eventos", valor: 296, cor: "#B8902A" },
  { fonte: "Experiências & test drives", valor: 124, cor: "#C9A24B" },
];

export const receitaTotalMes = receita.reduce((s, r) => s + r.valor, 0); // mil
export const receitaAno = receitaTotalMes * 12;

// Cotas de parceiros
export const cotas = [
  { categoria: "Diamante", qtd: 5, valor: "R$ 180 mil/ano", preenchidas: 5 },
  { categoria: "Ouro", qtd: 7, valor: "R$ 90 mil/ano", preenchidas: 6 },
  { categoria: "Prata", qtd: 20, valor: "R$ 36 mil/ano", preenchidas: 14 },
];

export const applications: Application[] = [
  { id: "a1", nome: "Gabriel Fontaine", empresa: "Fontaine Capital", setor: "Private Equity", cidade: "São Paulo · SP", padrinho: "Ricardo Almeida", carro: "Ferrari 296 GTB", avatar: avatar(41) },
  { id: "a2", nome: "Marina Velloso", empresa: "Velloso Incorp.", setor: "Real Estate", cidade: "Balneário Camboriú · SC", padrinho: "Fernanda Costa", carro: "Porsche 911 Turbo S", avatar: avatar(45) },
  { id: "a3", nome: "Sérgio Kawasaki", empresa: "SK Imports", setor: "Importação", cidade: "Curitiba · PR", padrinho: "Eduardo Tavares", carro: "Nissan GT-R Nismo", avatar: avatar(48) },
  { id: "a4", nome: "Pedro Albuquerque", empresa: "Albuquerque Agro", setor: "Agronegócio", cidade: "Goiânia · GO", padrinho: "Marcelo Nogueira", carro: "Lamborghini Urus", avatar: avatar(52) },
  { id: "a5", nome: "Helena Bourbon", empresa: "Bourbon Hotéis", setor: "Hotelaria", cidade: "Gramado · RS", padrinho: "Thiago Bourbon", carro: "Aston Martin DB11", avatar: avatar(55) },
];

// Mapa do Brasil (posições % aproximadas no SVG) + presença internacional
export const estados: StateNode[] = [
  { uf: "SP", nome: "São Paulo", membros: 980, x: 64, y: 74, ultimaEdicao: "141ª — São Roque" },
  { uf: "RJ", nome: "Rio de Janeiro", membros: 240, x: 72, y: 73, ultimaEdicao: "Edição Barra" },
  { uf: "MG", nome: "Minas Gerais", membros: 210, x: 68, y: 66, ultimaEdicao: "Edição BH" },
  { uf: "PR", nome: "Paraná", membros: 180, x: 60, y: 80, ultimaEdicao: "4ª Curitiba" },
  { uf: "SC", nome: "Santa Catarina", membros: 150, x: 62, y: 85, ultimaEdicao: "Edição Floripa" },
  { uf: "RS", nome: "Rio Grande do Sul", membros: 120, x: 56, y: 90, ultimaEdicao: "Edição POA" },
  { uf: "GO", nome: "Goiás", membros: 95, x: 58, y: 60, ultimaEdicao: "Edição Goiânia" },
  { uf: "DF", nome: "Distrito Federal", membros: 88, x: 61, y: 56, ultimaEdicao: "Edição Brasília" },
  { uf: "BA", nome: "Bahia", membros: 70, x: 74, y: 50, ultimaEdicao: "Edição Salvador" },
  { uf: "PE", nome: "Pernambuco", membros: 52, x: 82, y: 42, ultimaEdicao: "Edição Recife" },
  { uf: "ES", nome: "Espírito Santo", membros: 48, x: 74, y: 64, ultimaEdicao: "Edição Vitória" },
  { uf: "CE", nome: "Ceará", membros: 44, x: 78, y: 34, ultimaEdicao: "Edição Fortaleza" },
];

export const internacional = [
  { regiao: "Estados Unidos", cidade: "Orlando / Miami", membros: 60 },
  { regiao: "Europa", cidade: "Lisboa / Porto", membros: 35 },
];

export const pulsoMarca = [
  { canal: "Instagram", valor: "Alcance mensal premium" },
  { canal: "YouTube", valor: "7,05 mil inscritos" },
  { canal: "Eventos/ano", valor: "24 encontros" },
  { canal: "Mídia espontânea", valor: "Cobertura nacional" },
];
