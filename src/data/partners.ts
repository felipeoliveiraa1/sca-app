import type { Benefit, Partner } from "./types";

// 30+ luxury partners. "logo" is rendered as a gold monogram (no external logo files
// needed) for visual cohesion across the Wall of Brands.
const raw: [string, Partner["categoria"], string][] = [
  ["Boca Mafra Premium", "Diamante", "Concessionária Premium"],
  ["Rapidus", "Diamante", "Concessionária Premium"],
  ["BlindCar Armoring", "Diamante", "Blindagem"],
  ["AutoLux Estética", "Diamante", "Estética Automotiva"],
  ["Banco Sovereign", "Diamante", "Serviços Financeiros"],
  ["Veloce Motors", "Ouro", "Concessionária"],
  ["PPF Diamond", "Ouro", "Proteção de Pintura"],
  ["Império Pneus", "Ouro", "Pneus Performance"],
  ["Centurion Watches", "Ouro", "Relojoaria"],
  ["Prime Jets", "Ouro", "Aviação Executiva"],
  ["Nobile Seguros", "Ouro", "Seguros de Alto Valor"],
  ["GT Detailing", "Ouro", "Detailing"],
  ["Lounge Cigars", "Prata", "Charutaria"],
  ["Vinho & Cia", "Prata", "Importadora de Vinhos"],
  ["Sound Garage", "Prata", "Áudio Automotivo"],
  ["Royal Transfer", "Prata", "Transfer Executivo"],
  ["Maison Joias", "Prata", "Joalheria"],
  ["Estilo Alfaiataria", "Prata", "Alfaiataria"],
  ["TrackDay Brasil", "Prata", "Track Experience"],
  ["Café Soberano", "Prata", "Café Especial"],
  ["FitClub Elite", "Prata", "Wellness"],
  ["DroneShot Media", "Prata", "Cobertura Aérea"],
  ["Suite Hotéis", "Prata", "Hotelaria de Luxo"],
  ["Garage 24", "Prata", "Storage de Veículos"],
  ["Velox Rental", "Prata", "Locação Premium"],
  ["Atelier Couro", "Prata", "Restauração Interna"],
  ["Império Eventos", "Prata", "Eventos"],
  ["TechShield", "Prata", "Rastreamento"],
  ["Náutica Prime", "Prata", "Náutica"],
  ["Lente Premium", "Prata", "Fotografia"],
  ["Spa do Carro", "Prata", "Lavagem Premium"],
  ["Mont Blanc Club", "Prata", "Lifestyle"],
];

const cores = ["#D4AF37", "#E8C77A", "#B8902A", "#C9A24B", "#E0C779"];

export const partners: Partner[] = raw.map(([nome, categoria, setor], i) => {
  const iniciais = nome
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return {
    id: `p${i + 1}`,
    nome,
    categoria,
    setor,
    logo: iniciais.toUpperCase(),
    cor: cores[i % cores.length],
    story: `${nome} é parceira ${categoria} do SCA, presente nas principais edições com ativações de ${setor.toLowerCase()} exclusivas para os membros.`,
    beneficio: `Condições exclusivas para membros SCA na ${nome}.`,
  };
});

export const partnersByCat = {
  Diamante: partners.filter((p) => p.categoria === "Diamante"),
  Ouro: partners.filter((p) => p.categoria === "Ouro"),
  Prata: partners.filter((p) => p.categoria === "Prata"),
};

export const benefits: Benefit[] = [
  {
    id: "b1",
    parceiro: "Boca Mafra Premium",
    titulo: "Test drive VIP de hipercarro",
    descricao: "Agende um test drive exclusivo de um modelo do showroom premium.",
    validade: "Válido até 30/07",
    categoria: "Diamante",
  },
  {
    id: "b2",
    parceiro: "AutoLux Estética",
    titulo: "Detailing completo cortesia",
    descricao: "Primeira sessão de detailing premium por conta da casa.",
    validade: "Válido até 15/07",
    categoria: "Diamante",
    relampago: true,
  },
  {
    id: "b3",
    parceiro: "Prime Jets",
    titulo: "1h de jato compartilhado",
    descricao: "Crédito de 1 hora em voo compartilhado para membros Diamond.",
    validade: "Válido até 31/08",
    categoria: "Ouro",
  },
  {
    id: "b4",
    parceiro: "Centurion Watches",
    titulo: "15% em relógios selecionados",
    descricao: "Desconto exclusivo na coleção de alta relojoaria.",
    validade: "Válido até 20/07",
    categoria: "Ouro",
    relampago: true,
  },
  {
    id: "b5",
    parceiro: "Suite Hotéis",
    titulo: "Upgrade de suíte garantido",
    descricao: "Upgrade automático + late check-out na rede Suite.",
    validade: "Válido até 30/09",
    categoria: "Prata",
  },
  {
    id: "b6",
    parceiro: "Vinho & Cia",
    titulo: "Cesta de boas-vindas",
    descricao: "Curadoria de rótulos importados para novos membros.",
    validade: "Válido até 30/07",
    categoria: "Prata",
  },
];

export const relampago = benefits.filter((b) => b.relampago);
