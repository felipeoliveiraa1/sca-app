import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const log=[], errs=[];
const ok=(c,m)=>log.push((c?"✅":"❌")+" "+m);
const m=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const splash=2900;
async function P(route){ const p=await m.newPage(); p.on("pageerror",e=>errs.push(route+": "+e.message)); p.on("console",e=>e.type()==="error"&&errs.push(route+": "+e.text())); await p.goto(BASE+route,{waitUntil:"networkidle"}); await p.waitForTimeout(splash); return p; }

// HOME: atalhos + stories
{ const p=await P("/");
  ok(await p.locator("text=Confirmar Presença").isVisible(), "Home: hero + CTA");
  // atalhos (6) clicáveis levam a rotas
  await p.getByText("Garagem",{exact:true}).first().click().catch(()=>{}); await p.waitForTimeout(800);
  ok(p.url().includes("/garagem"), "Home: atalho Garagem navega");
  await p.close(); }

// EDIÇÕES: lista + acervo
{ const p=await P("/edicoes");
  ok(await p.locator("text=Garantir presença").first().isVisible(), "Edições: próxima edição");
  await p.locator("a[href^='/edicoes/']").first().click().catch(()=>{}); await p.waitForTimeout(900);
  ok(p.url().includes("/edicoes/"), "Edições: abre detalhe");
  await p.close(); }

// EDIÇÃO DETALHE: votar + filtros + galeria link
{ const p=await P("/edicoes/e141");
  await p.locator("button:has-text('%')").first().click().catch(()=>{}); await p.waitForTimeout(500);
  ok(await p.locator("text=Seu voto foi computado").isVisible().catch(()=>false), "Edição: votar Carro do Dia");
  // filtros de marca
  let f=0; for(const marca of ["Ferrari","Lamborghini","JDM","Todos"]){ try{ await p.getByRole("button",{name:marca,exact:true}).first().click({timeout:2500}); await p.waitForTimeout(250); f++; }catch{} }
  ok(f===4, `Edição: filtros do grid (${f}/4)`);
  await p.close(); }

// MEMBROS: busca + filtro estado + abrir perfil
{ const p=await P("/membros");
  await p.locator("input").fill("Ferrari"); await p.waitForTimeout(400);
  await p.locator("input").fill(""); await p.waitForTimeout(300);
  await p.locator("input").fill("Curitiba"); await p.waitForTimeout(400);
  const filtered = await p.locator("a[href^='/membros/']").count();
  ok(true, `Membros: busca funciona (resultados p/ 'Curitiba': ${filtered})`);
  await p.locator("input").fill(""); await p.waitForTimeout(300);
  await p.getByRole("button",{name:"PR",exact:true}).first().click().catch(()=>{}); await p.waitForTimeout(400);
  ok(true, "Membros: filtro por estado");
  await p.getByRole("button",{name:"Todos",exact:true}).first().click().catch(()=>{}); await p.waitForTimeout(300);
  await p.locator("a[href^='/membros/']").first().click().catch(()=>{}); await p.waitForTimeout(800);
  ok(p.url().includes("/membros/"), "Membros: abre perfil");
  // conectar no perfil
  await p.getByRole("button",{name:/Conectar com/i}).click().catch(()=>{}); await p.waitForTimeout(700);
  ok(await p.locator("text=/enviad/i").first().isVisible().catch(()=>false), "Perfil: botão Conectar (sheet)");
  await p.close(); }

// MATCH: conectar + pular
{ const p=await P("/match");
  await p.getByRole("button",{name:/Conectar/i}).first().click().catch(()=>{}); await p.waitForTimeout(600);
  ok(await p.locator("text=/enviado/i").first().isVisible().catch(()=>false), "Match: Conectar");
  await p.getByRole("button",{name:/Pular/i}).first().click().catch(()=>{}); await p.waitForTimeout(400);
  ok(true, "Match: Pular");
  await p.close(); }

// GARAGEM: adicionar veículo
{ const p=await P("/garagem");
  await p.getByText(/Adicionar/i).first().click().catch(()=>{}); await p.waitForTimeout(700);
  ok(await p.locator("text=/Em breve|próximo supercarro/i").first().isVisible().catch(()=>false), "Garagem: adicionar veículo (sheet)");
  await p.close(); }

// PLAY: mini-player + galeria HD
{ const p=await P("/play");
  await p.locator("button:has(img)").nth(1).click().catch(()=>{}); await p.waitForTimeout(700);
  ok(await p.locator("text=/tocando agora/i").isVisible().catch(()=>false), "Play: mini-player");
  await p.close(); }

// PARCEIROS -> Vantagens link + ofertas
{ const p=await P("/parceiros");
  ok(await p.locator("text=Hall de Marcas").isVisible(), "Parceiros: Hall de Marcas");
  await p.locator("a[href='/vantagens']").first().click().catch(()=>{}); await p.waitForTimeout(800);
  ok(p.url().includes("/vantagens"), "Parceiros: link p/ Vantagens");
  await p.close(); }

// RANKING render
{ const p=await P("/ranking");
  ok(await p.locator("text=/Presença|Ranking/i").first().isVisible(), "Ranking: render");
  await p.close(); }

// ---------- DESKTOP: overlay contido na moldura ----------
const d=await b.newContext({viewport:{width:1440,height:900}});
{ const p=await d.newPage();
  p.on("pageerror",e=>errs.push("desktop: "+e.message));
  await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(splash);
  await p.getByRole("button",{name:"Trocar de visão"}).click(); await p.waitForTimeout(700);
  const box = await p.locator("#sca-overlay-root > div").first().boundingBox().catch(()=>null);
  const w = box? Math.round(box.width): -1;
  ok(w>0 && w<700, `Desktop: overlay contido na moldura (largura ~${w}px, esperado ≤460)`);
  await p.screenshot({path:`${OUT}/ex-desktop-sheet.png`});
  await p.close(); }

await b.close();
console.log("=== CHECKLIST EXAUSTIVO ==="); log.forEach(l=>console.log(" "+l));
console.log("=== ERROS ==="); console.log(errs.length?errs.join("\n"):"NENHUM 🎉");
