import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const errs=[], log=[];
async function page(){ const p=await ctx.newPage(); p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>m.type()==="error"&&errs.push(m.text())); return p; }
const settle = async (p)=>{ await p.waitForTimeout(2600); }; // splash

// 1. Galeria viewer
{ const p=await page(); await p.goto(BASE+"/galeria/e140",{waitUntil:"networkidle"}); await settle(p);
  const fotos = await p.locator("button:has(img)").count(); log.push("galeria fotos clicáveis: "+fotos);
  await p.locator("button:has(img)").nth(2).click(); await p.waitForTimeout(900);
  const viewer = await p.locator("text=Toque para fechar").isVisible().catch(()=>false); log.push("galeria viewer abriu: "+viewer);
  await p.screenshot({path:`${OUT}/f-galeria-viewer.png`}); await p.close(); }

// 2. EdicaoDetalhe: votar + RSVP + checkin
{ const p=await page(); await p.goto(BASE+"/edicoes/e141",{waitUntil:"networkidle"}); await settle(p);
  // votar
  const antes = await p.locator("text=Seu voto foi computado").isVisible().catch(()=>false);
  await p.locator("button:has-text('%')").first().click().catch(()=>{}); await p.waitForTimeout(600);
  const votou = await p.locator("text=Seu voto foi computado").isVisible().catch(()=>false); log.push("votou (antes/depois): "+antes+"/"+votou);
  // RSVP
  await p.getByRole("button",{name:/Confirmar Presença/i}).first().click().catch(e=>log.push("rsvp click: "+e.message));
  await p.waitForTimeout(700);
  const rsvp = await p.locator("text=Gerar meu Passe").isVisible().catch(()=>false); log.push("RSVP sheet abriu: "+rsvp);
  await p.screenshot({path:`${OUT}/f-rsvp.png`});
  await p.getByRole("button",{name:/Gerar meu Passe/i}).click().catch(()=>{}); await p.waitForTimeout(800);
  const passe = await p.locator("text=Simular check-in").isVisible().catch(()=>false); log.push("Passe gerado: "+passe);
  await p.getByRole("button",{name:/Simular check-in/i}).click().catch(()=>{}); await p.waitForTimeout(2300);
  const done = await p.locator("text=/Bem-vindo à/").isVisible().catch(()=>false); log.push("check-in concluído: "+done);
  await p.screenshot({path:`${OUT}/f-checkin.png`}); await p.close(); }

// 3. Mapa real (iframe presente)
{ const p=await page(); await p.goto(BASE+"/edicoes/e141",{waitUntil:"networkidle"}); await settle(p);
  const if_ = await p.locator("iframe[title='Mapa do local']").count(); log.push("mapa iframe: "+if_);
  await p.locator("iframe[title='Mapa do local']").scrollIntoViewIfNeeded().catch(()=>{}); await p.waitForTimeout(1500);
  await p.screenshot({path:`${OUT}/f-mapa.png`}); await p.close(); }

// 4. Founder portaria aprovar
{ const p=await page(); await p.goto(BASE+"/",{waitUntil:"networkidle"}); await settle(p);
  await p.locator("button",{hasText:"001"}).first().click(); await p.waitForTimeout(500);
  await p.locator("button",{hasText:"Painel do Fundador"}).first().click(); await p.waitForTimeout(1000);
  await p.locator("button",{hasText:"Portaria VIP"}).first().click(); await p.waitForTimeout(800);
  await p.getByRole("button",{name:/Aprovar/i}).click().catch(e=>log.push("aprovar: "+e.message)); await p.waitForTimeout(1100);
  await p.screenshot({path:`${OUT}/f-portaria.png`}); await p.close(); }

// 5. Match conectar
{ const p=await page(); await p.goto(BASE+"/match",{waitUntil:"networkidle"}); await settle(p);
  await p.getByRole("button",{name:/Conectar/i}).first().click().catch(e=>log.push("match conectar: "+e.message)); await p.waitForTimeout(700);
  const enviado = await p.locator("text=/enviado/i").first().isVisible().catch(()=>false); log.push("match convite enviado: "+enviado);
  await p.screenshot({path:`${OUT}/f-match.png`}); await p.close(); }

// 6. Vantagens resgatar
{ const p=await page(); await p.goto(BASE+"/vantagens",{waitUntil:"networkidle"}); await settle(p);
  await p.getByRole("button",{name:/Resgatar/i}).first().click().catch(e=>log.push("resgatar: "+e.message)); await p.waitForTimeout(800);
  const voucher = await p.locator("text=/Apresente este código/i").isVisible().catch(()=>false); log.push("voucher abriu: "+voucher);
  await p.screenshot({path:`${OUT}/f-voucher.png`}); await p.close(); }

// 7. Conectar simular
{ const p=await page(); await p.goto(BASE+"/conectar",{waitUntil:"networkidle"}); await settle(p);
  await p.getByRole("button",{name:/Simular conex/i}).click().catch(e=>log.push("conectar: "+e.message)); await p.waitForTimeout(900);
  const ok = await p.locator("text=/conectad/i").first().isVisible().catch(()=>false); log.push("conexão simulada: "+ok);
  await p.screenshot({path:`${OUT}/f-conectar.png`}); await p.close(); }

// 8. Play mini-player
{ const p=await page(); await p.goto(BASE+"/play",{waitUntil:"networkidle"}); await settle(p);
  await p.locator("button:has(img)").nth(1).click().catch(()=>{}); await p.waitForTimeout(700);
  const mp = await p.locator("text=/tocando agora/i").isVisible().catch(()=>false); log.push("mini-player: "+mp);
  await p.screenshot({path:`${OUT}/f-play.png`}); await p.close(); }

await b.close();
console.log("=== LOG ==="); log.forEach(l=>console.log(" - "+l));
console.log("=== ERRORS ==="); console.log(errs.length?errs.join("\n"):"none 🎉");
