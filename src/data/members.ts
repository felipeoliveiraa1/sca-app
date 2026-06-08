import { avatar, carImg } from "./assets";
import type { Car, Member, Tier } from "./types";

const nomes = [
  "Ricardo Almeida", "Fernanda Costa", "Eduardo Tavares", "Patrícia Lemos",
  "Bruno Carvalho", "Carolina Pires", "Marcelo Nogueira", "Juliana Bastos",
  "Rafael Monteiro", "Camila Rocha", "André Vasconcelos", "Letícia Moraes",
  "Gustavo Pacheco", "Renata Siqueira", "Thiago Bourbon", "Aline Fontana",
  "Leonardo Drummond", "Mariana Caldeira", "Felipe Andrade", "Vanessa Setúbal",
  "Otávio Bernardes", "Beatriz Galvão", "Henrique Salles", "Daniela Prado",
  "Vinícius Aragão", "Larissa Bittencourt", "Rodrigo Mascarenhas", "Sofia Linhares",
  "Caio Vilella", "Isabela Toledo", "Murilo Resende", "Priscila Marchetti",
];
const empresas = [
  "Almeida Holding", "FC Capital", "Tavares Construtora", "Lemos Incorporações",
  "BC Logística", "Pires Med", "Nogueira Agro", "Bastos Participações",
  "Monteiro Tech", "Rocha Energia", "Vasconcelos Imóveis", "Moraes Cosméticos",
  "Pacheco Distribuidora", "Siqueira Seguros", "Bourbon Hotéis", "Fontana Foods",
  "Drummond Mineração", "Caldeira Educação", "Andrade Motors", "Setúbal Invest",
  "Bernardes Farma", "Galvão Eng.", "Salles Advogados", "Prado Estética",
  "Aragão Têxtil", "Bittencourt Café", "Mascarenhas Bank", "Linhares Mídia",
  "Vilella Wines", "Toledo Joias", "Resende Frotas", "Marchetti Design",
];
const cargos = ["CEO", "Fundador", "Presidente", "Sócio-Diretor", "CEO & Founder", "Diretora-Geral"];
const setores = [
  "Incorporação", "Investimentos", "Construção", "Real Estate", "Logística",
  "Saúde", "Agronegócio", "Holding", "Tecnologia", "Energia", "Imobiliário",
  "Beleza", "Distribuição", "Seguros", "Hotelaria", "Alimentos", "Mineração",
  "Educação", "Automotivo", "Private Equity", "Farmacêutico", "Engenharia",
  "Jurídico", "Estética", "Indústria", "Café", "Banking", "Mídia", "Vinhos",
  "Luxo", "Frotas", "Design",
];
const cidades: [string, string][] = [
  ["Alphaville", "SP"], ["São Paulo", "SP"], ["Curitiba", "PR"], ["Campinas", "SP"],
  ["Rio de Janeiro", "RJ"], ["Belo Horizonte", "MG"], ["Goiânia", "GO"], ["Brasília", "DF"],
  ["Florianópolis", "SC"], ["Porto Alegre", "RS"], ["Salvador", "BA"], ["Recife", "PE"],
  ["Vitória", "ES"], ["Fortaleza", "CE"], ["Orlando", "EUA"], ["Lisboa", "PT"],
];
const marcas = [
  ["Ferrari", "296 GTB", "830 cv"], ["Lamborghini", "Huracán EVO", "640 cv"],
  ["Porsche", "911 Turbo S", "650 cv"], ["McLaren", "720S", "720 cv"],
  ["Mercedes-AMG", "GT 63 S", "639 cv"], ["Audi", "R8 V10", "620 cv"],
  ["BMW", "M8 Competition", "625 cv"], ["Nissan", "GT-R Nismo", "600 cv"],
  ["Toyota", "Supra MK4", "330 cv"], ["Aston Martin", "DB11", "639 cv"],
  ["Lamborghini", "Urus Performante", "666 cv"], ["Ferrari", "Roma", "620 cv"],
];
const categorias: Car["categoria"][] = ["Europeu", "JDM", "Hipercarro", "Clássico"];
const selosPool = ["Blindagem Premium", "Estética AutoLux", "PPF Diamante", "Som & Cine"];

function tierFor(i: number): Tier {
  if (i % 11 === 0) return "Diamond";
  if (i % 3 === 0) return "Black";
  return "Member";
}

function carsFor(i: number): Car[] {
  const count = (i % 3) + 1;
  return Array.from({ length: count }, (_, k) => {
    const m = marcas[(i + k) % marcas.length];
    const isJdm = m[0] === "Nissan" || m[0] === "Toyota";
    return {
      marca: m[0],
      modelo: m[1],
      ano: 2020 + ((i + k) % 5),
      potencia: m[2],
      img: carImg(i + k * 5),
      categoria: isJdm ? "JDM" : categorias[(i + k) % categorias.length],
      selos: k === 0 ? [selosPool[i % selosPool.length], selosPool[(i + 1) % selosPool.length]] : [selosPool[(i + k) % selosPool.length]],
    } satisfies Car;
  });
}

export const members: Member[] = nomes.map((nome, i) => {
  const [cidade, estado] = cidades[i % cidades.length];
  return {
    id: `m${i + 1}`,
    nome,
    empresa: empresas[i],
    cargo: cargos[i % cargos.length],
    setor: setores[i % setores.length],
    cidade,
    estado,
    tier: tierFor(i),
    verificado: i % 4 !== 0,
    avatar: avatar(i + 5),
    desde: 2019 + (i % 6),
    carros: carsFor(i),
    bio: `${cargos[i % cargos.length]} da ${empresas[i]}. Apaixonado por alta performance e por conexões que geram negócios reais dentro do SCA.`,
    edicoes: 4 + ((i * 7) % 60),
    destaque: i < 3,
  } satisfies Member;
});

export const membersById = Object.fromEntries(members.map((m) => [m.id, m]));

export const destaques = members.filter((m) => m.destaque);

export const rankingPresenca = [...members]
  .sort((a, b) => b.edicoes - a.edicoes)
  .slice(0, 8);
