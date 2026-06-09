import { createContext, useContext, useState, type ReactNode } from "react";

export type Persona = "membro" | "fundador";

type PersonaCtx = {
  persona: Persona;
  setPersona: (p: Persona) => void;
  toggle: () => void;
  // Login fictício / personalização
  entered: boolean;
  userName: string;
  entrar: (nome: string) => void;
};

const Ctx = createContext<PersonaCtx | null>(null);

const SAVED = typeof localStorage !== "undefined" ? localStorage.getItem("sca-nome") || "" : "";

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("membro");
  const [entered, setEntered] = useState(false);
  const [userName, setUserName] = useState(SAVED);

  const toggle = () => setPersona((p) => (p === "membro" ? "fundador" : "membro"));
  const entrar = (nome: string) => {
    const n = nome.trim();
    setUserName(n);
    if (typeof localStorage !== "undefined") localStorage.setItem("sca-nome", n);
    setEntered(true);
  };

  return (
    <Ctx.Provider value={{ persona, setPersona, toggle, entered, userName, entrar }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePersona must be used within PersonaProvider");
  return ctx;
}
