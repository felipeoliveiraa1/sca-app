import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",e=>e.type()==="error"&&errs.push(e.text()));
await p.goto(BASE+"/play",{waitUntil:"networkidle"}); await p.waitForTimeout(2600);
const guest=p.getByRole("button",{name:/convidado/i});
if(await guest.isVisible().catch(()=>false)){ await guest.click(); await p.waitForTimeout(350); await p.locator("input[placeholder='Seu nome']").fill("José"); await p.getByRole("button",{name:/Entrar no clube/i}).click(); await p.waitForTimeout(800); }
// listar botões com img e tentar clicar no episódio (texto)
const nBtnImg = await p.locator("button:has(img)").count();
// tentar clicar pelo título de um episódio
let clicked=false;
for(const sel of ["text=Os bastidores do mercado","text=Networking de elite","button:has(img)"]){
  try{ await p.locator(sel).first().click({timeout:3000}); clicked=true; break; }catch{}
}
await p.waitForTimeout(800);
const mp = await p.locator("text=/tocando agora/i").isVisible().catch(()=>false);
console.log("botões com img:", nBtnImg, "| clicou:", clicked, "| mini-player visível:", mp, "| erros:", errs.length?errs:"nenhum");
await p.screenshot({path:`${OUT}/play-recheck.png`});
await b.close();
