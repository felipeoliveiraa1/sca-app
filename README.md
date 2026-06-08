# SCA Black — App Mock (PWA)

Protótipo de alta fidelidade do app do **Super Carros Alphaville (SCA)** — um presente para apresentar ao **Dr. José Silva**, fundador do clube.

> Tudo é **mock**: dados são seed (fictícios, exceto os assets oficiais do SCA — logo, foto do José e galeria das edições). Não há backend, login ou pagamento real.

Stack: **React + Vite + TypeScript + Tailwind + Framer Motion**, PWA instalável.

## Como rodar

```bash
npm install        # só na primeira vez
npm run dev        # abre em http://localhost:5173
```

No navegador, abra o **modo responsivo / mobile** (DevTools → ícone de celular, largura ~390px) para ver no formato de app. No desktop o app já aparece dentro de uma moldura de celular.

### Mostrar no celular do José (mesma rede Wi-Fi)

```bash
npm run dev -- --host
```

Depois abra no celular: **http://192.168.15.68:5173** (troque pelo IP que o terminal mostrar).
No iPhone/Android dá para "Adicionar à Tela de Início" e abrir como app.

### Outros comandos

```bash
npm run build      # gera a versão de produção em dist/
npm run preview    # serve o build em http://localhost:4173
```

## Roteiro de demonstração (~4 min)

1. **Credencial Black** (Home) — incline o celular: o cartão reflete (holográfico). Toque no story do José.
2. **Convite** — role até a próxima edição, "Confirmar Presença", escolha o carro da garagem → gera o Passe.
3. **Dia do evento** — toque em "Check-in": animação de ignição carimba o selo. Veja o grid de carros e vote no **Carro do Dia**.
4. **Networking** — aba Membros → "Conectar" (QR + vibração) e "Match de Negócios".
5. **Ecossistema** — aba Parceiros: Hall de Marcas acende; resgate um cupom no Clube de Vantagens.
6. **Clímax** — toque no avatar "001" (canto superior direito) → **Painel do Fundador**: KPIs, Portaria VIP (aprove um candidato), Mapa do Domínio, Cofre de Receita.
7. **Fecho** — Press Kit → "Exportar".

## Estrutura

- `src/components/` — componentes reutilizáveis (Credencial holográfica, contadores, QR, etc.)
- `src/screens/` — telas por área (clube, edicoes, membros, parceiros, play, fundador)
- `src/data/` — dados seed e assets
- `public/assets/` — logo, foto do José e galeria oficiais do SCA

## Publicar depois (quando quiser link + QR)

O jeito mais rápido sem conta: rodar `npm run build` e arrastar a pasta `dist/` em **app.netlify.com/drop** → link público na hora.
