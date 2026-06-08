import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[];
p.on("pageerror",e=>errs.push("PAGEERROR: "+e.message));
p.on("console",m=>m.type()==="error"&&errs.push(m.text()));
const log=[];
await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2700);
log.push("home visível (Boa...José): "+await p.locator("h1:has-text('José')").first().isVisible().catch(()=>false));

// abrir switcher
await p.locator("button",{hasText:"001"}).first().click(); await p.waitForTimeout(500);
log.push("sheet 'Visão do Membro' visível: "+await p.getByText("Visão do Membro").isVisible().catch(()=>false));
log.push("sheet 'Painel do Fundador' visível: "+await p.getByText("Painel do Fundador").isVisible().catch(()=>false));
await p.screenshot({path:`${OUT}/p-sheet.png`});

// ir para Fundador
await p.locator("button",{hasText:"Painel do Fundador"}).first().click(); await p.waitForTimeout(1200);
log.push("fundador visível (Dr. José): "+await p.getByText("Dr. José Silva").first().isVisible().catch(()=>false));

// Sair -> volta membro
await p.getByRole("button",{name:/^Sair$/}).click().catch(e=>log.push("sair click err: "+e.message)); await p.waitForTimeout(1200);
log.push("voltou p/ membro (BottomNav Clube): "+await p.getByText("Clube",{exact:true}).first().isVisible().catch(()=>false));
log.push("home apos sair (José): "+await p.locator("h1:has-text('José')").first().isVisible().catch(()=>false));
await p.screenshot({path:`${OUT}/p-back-member.png`});

// agora testar botão 'Visão do Membro' estando em membro
await p.locator("button",{hasText:"001"}).first().click(); await p.waitForTimeout(500);
await p.getByText("Visão do Membro").click().catch(e=>log.push("visao membro click err: "+e.message)); await p.waitForTimeout(900);
log.push("apos 'Visão do Membro' (José visível): "+await p.locator("h1:has-text('José')").first().isVisible().catch(()=>false));
await p.screenshot({path:`${OUT}/p-visao-membro.png`});

await b.close();
console.log("=== LOG ==="); log.forEach(l=>console.log(" - "+l));
console.log("=== ERRORS ==="); console.log(errs.length?errs.join("\n"):"none");
