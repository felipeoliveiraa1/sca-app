import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",e=>e.type()==="error"&&errs.push(e.text()));
await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2800);
await p.getByRole("button",{name:/convidado/i}).click();   // auto-wait
await p.locator("input[placeholder='Seu nome']").fill("José");
await p.getByRole("button",{name:/Entrar no clube/i}).click();
await p.waitForTimeout(900);
console.log("entrou (Home):", await p.locator("h1:has-text('José')").first().isVisible().catch(()=>false));
// navega pro Play pela barra inferior (sem recarregar)
await p.locator("nav a", {hasText:"Play"}).click();
await p.waitForTimeout(900);
console.log("na Play:", await p.getByText("Episódios").first().isVisible().catch(()=>false));
await p.getByText("Em alta").first().click();
await p.waitForTimeout(900);
console.log("MINI-PLAYER 'Tocando agora':", await p.getByText("Tocando agora").isVisible().catch(()=>false));
await p.screenshot({path:`${OUT}/play-final.png`});
console.log("erros:", errs.length?errs:"nenhum 🎉");
await b.close();
