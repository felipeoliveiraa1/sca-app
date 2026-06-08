import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>m.type()==="error"&&errs.push(m.text()));
await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2700);
await p.locator("button",{hasText:"001"}).first().click(); await p.waitForTimeout(500);
await p.locator("button",{hasText:"Painel do Fundador"}).first().click(); await p.waitForTimeout(1200);
await p.screenshot({path:`${OUT}/g-founder-visao.png`});
await p.getByText("Domínio",{exact:true}).first().click(); await p.waitForTimeout(1600);
await p.screenshot({path:`${OUT}/g-founder-dominio.png`});
// scroll dominio to see ranking
await p.locator("main, .overflow-y-auto").first().evaluate(el=>el.scrollTo({top:400})).catch(()=>{});
await p.waitForTimeout(800); await p.screenshot({path:`${OUT}/g-founder-dominio2.png`});
await p.getByText("Press",{exact:true}).first().click(); await p.waitForTimeout(900);
await p.screenshot({path:`${OUT}/g-founder-press.png`});
await b.close();
console.log("errors:", errs.length?errs:"none 🎉");
