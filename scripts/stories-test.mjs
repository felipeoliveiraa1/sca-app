import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[], log=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>m.type()==="error"&&errs.push(m.text()));
await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2700);
// abrir primeiro story
await p.locator(".no-scrollbar button").first().click(); await p.waitForTimeout(700);
log.push("story aberto (Recado do José?): "+await p.getByText("Recado do José").isVisible().catch(()=>false));
log.push("zona 'Próximo' existe: "+await p.getByRole("button",{name:"Próximo"}).count());
await p.screenshot({path:`${OUT}/s-story1.png`});
// tocar à direita -> próximo
await p.getByRole("button",{name:"Próximo"}).click(); await p.waitForTimeout(600);
const t2 = await p.locator(".t-headline").first().innerText().catch(()=>"?"); log.push("após toque direita, título: "+t2);
await p.screenshot({path:`${OUT}/s-story2.png`});
// auto-avanço: esperar > duração
const before = await p.locator(".t-headline").first().innerText().catch(()=>"?");
await p.waitForTimeout(4600);
const after = await p.locator(".t-headline").first().innerText().catch(()=>"(fechou)");
log.push("auto-avanço: '"+before+"' -> '"+after+"'");
// tocar à esquerda -> anterior (se ainda aberto)
await p.getByRole("button",{name:"Anterior"}).click().catch(()=>log.push("anterior: já fechado"));
await p.waitForTimeout(500);
await b.close();
console.log("=== LOG ==="); log.forEach(l=>console.log(" - "+l));
console.log("=== ERRORS ==="); console.log(errs.length?errs.join("\n"):"none 🎉");
