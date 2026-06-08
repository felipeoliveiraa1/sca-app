import { createContext, useContext, useState, type ReactNode } from "react";

export type Persona = "membro" | "fundador";

type PersonaCtx = {
  persona: Persona;
  setPersona: (p: Persona) => void;
  toggle: () => void;
};

const Ctx = createContext<PersonaCtx | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("membro");
  const toggle = () => setPersona((p) => (p === "membro" ? "fundador" : "membro"));
  return <Ctx.Provider value={{ persona, setPersona, toggle }}>{children}</Ctx.Provider>;
}

export function usePersona() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePersona must be used within PersonaProvider");
  return ctx;
}
