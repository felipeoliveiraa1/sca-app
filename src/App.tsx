import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PhoneFrame from "./components/PhoneFrame";
import BottomNav from "./components/BottomNav";
import PersonaSwitch from "./components/PersonaSwitch";
import PageTransition from "./components/PageTransition";
import Splash from "./components/Splash";
import Welcome from "./components/Welcome";
import { usePersona } from "./store/persona";

import Home from "./screens/clube/Home";
import Edicoes from "./screens/edicoes/Edicoes";
import EdicaoDetalhe from "./screens/edicoes/EdicaoDetalhe";
import Galeria from "./screens/edicoes/Galeria";
import Membros from "./screens/membros/Membros";
import MembroPerfil from "./screens/membros/MembroPerfil";
import Garagem from "./screens/membros/Garagem";
import Match from "./screens/membros/Match";
import Conectar from "./screens/membros/Conectar";
import Conexoes from "./screens/membros/Conexoes";
import Conversa from "./screens/membros/Conversa";
import Niveis from "./screens/membros/Niveis";
import Ranking from "./screens/membros/Ranking";
import Parceiros from "./screens/parceiros/Parceiros";
import Vantagens from "./screens/parceiros/Vantagens";
import Play from "./screens/play/Play";
import FounderApp from "./screens/fundador/FounderApp";

function MemberApp() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Sempre que a rota muda, volta o scroll para o topo.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <>
      <PersonaSwitch />
      <main ref={mainRef} className="no-scrollbar relative flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/edicoes" element={<Edicoes />} />
              <Route path="/edicoes/:id" element={<EdicaoDetalhe />} />
              <Route path="/galeria/:id" element={<Galeria />} />
              <Route path="/membros" element={<Membros />} />
              <Route path="/membros/:id" element={<MembroPerfil />} />
              <Route path="/garagem" element={<Garagem />} />
              <Route path="/match" element={<Match />} />
              <Route path="/conectar" element={<Conectar />} />
              <Route path="/conexoes" element={<Conexoes />} />
              <Route path="/conversas/:id" element={<Conversa />} />
              <Route path="/niveis" element={<Niveis />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/parceiros" element={<Parceiros />} />
              <Route path="/vantagens" element={<Vantagens />} />
              <Route path="/play" element={<Play />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <BottomNav />
    </>
  );
}

export default function App() {
  const { persona, entered, entrar } = usePersona();
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <PhoneFrame>
      {persona === "fundador" ? <FounderApp /> : <MemberApp />}
      <AnimatePresence>
        {!splash && !entered && <Welcome onEnter={entrar} />}
      </AnimatePresence>
      <AnimatePresence>{splash && <Splash />}</AnimatePresence>
    </PhoneFrame>
  );
}
