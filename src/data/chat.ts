import { members, membersById } from "./members";
import type { Member } from "./types";

export interface Conexao {
  membro: Member;
  preview: string;
  hora: string;
  naoLidas?: number;
  online?: boolean;
}

// Minhas conexões (subconjunto dos membros) com prévia da última mensagem.
const seeds: { id: string; preview: string; hora: string; naoLidas?: number; online?: boolean }[] = [
  { id: "m4", preview: "Bora marcar aquele café pra ver o projeto 🤝", hora: "09:42", naoLidas: 2, online: true },
  { id: "m2", preview: "Te encontro na próxima edição então!", hora: "Ontem" },
  { id: "m9", preview: "Top demais sua Ferrari 🔥", hora: "Ontem", naoLidas: 1 },
  { id: "m15", preview: "Fechado, faço a reserva do lounge.", hora: "Seg", online: true },
  { id: "m1", preview: "Valeu pela indicação, fechei negócio!", hora: "Seg" },
  { id: "m6", preview: "Você confirmou presença no SCA JDM?", hora: "Dom" },
  { id: "m11", preview: "Mando os números por aqui mais tarde.", hora: "Sex" },
  { id: "m20", preview: "Prazer enorme te conhecer ontem 👊", hora: "Sex" },
  { id: "m3", preview: "Vamos almoçar essa semana?", hora: "Qui" },
];

export const conexoes: Conexao[] = seeds
  .map((s) => (membersById[s.id] ? { membro: membersById[s.id], preview: s.preview, hora: s.hora, naoLidas: s.naoLidas, online: s.online } : null))
  .filter(Boolean) as Conexao[];

export const conexoesById = Object.fromEntries(conexoes.map((c) => [c.membro.id, c]));

export interface Msg {
  from: "eu" | "ele";
  texto: string;
  hora: string;
}

/** Conversa-semente determinística para um membro. */
export function seedThread(m: Member): Msg[] {
  const nome = m.nome.split(" ")[0];
  return [
    { from: "ele", texto: `Prazer, aqui é o ${nome}! Nos conectamos no SCA. 👊`, hora: "09:30" },
    { from: "eu", texto: `Prazer! Curti demais a sua garagem.`, hora: "09:31" },
    { from: "ele", texto: `Valeu! Trabalho com ${m.setor}. Acho que tem sinergia com o seu negócio.`, hora: "09:33" },
    { from: "eu", texto: `Com certeza. Bora trocar uma ideia na próxima edição?`, hora: "09:34" },
    { from: "ele", texto: `Fechado! Te encontro lá. 🏁`, hora: "09:35" },
  ];
}

export const respostasAuto = [
  "Combinado! 👍",
  "Perfeito, já anoto aqui.",
  "Show, te respondo já já.",
  "Boa! Bora marcar.",
  "Top, valeu! 🤝",
];

// Membros que ainda não são conexão (para o fluxo "conectar")
export const sugestoesParaConectar = members.filter((m) => !conexoesById[m.id]).slice(0, 6);
