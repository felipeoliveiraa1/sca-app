import { chromium } from "playwright";
const BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[], log=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>m.type()==="error"&&errs.push(m.text()));
const top = () => p.evaluate(()=>document.querySelector("main")?.scrollTop ?? -1);
await p.goto(BASE+"/membros",{waitUntil:"networkidle"}); await p.waitForTimeout(2700);
await p.evaluate(()=>document.querySelector("main").scrollTo({top:700})); await p.waitForTimeout(400);
log.push("scroll em /membros antes de navegar: "+await top());
// abrir um perfil
await p.locator("a[href^='/membros/m']").first().click().catch(e=>log.push("click perfil: "+e.message)); await p.waitForTimeout(700);
log.push("scroll no /membros/:id (deve ~0): "+await top());
// voltar e ir pra Edições via bottom nav, após rolar
await p.goBack(); await p.waitForTimeout(500);
await p.evaluate(()=>document.querySelector("main").scrollTo({top:600})); await p.waitForTimeout(300);
await p.getByText("Edições",{exact:true}).first().click(); await p.waitForTimeout(700);
log.push("scroll após bottom-nav -> Edições (deve ~0): "+await top());
await b.close();
console.log("=== LOG ==="); log.forEach(l=>console.log(" - "+l));
console.log("=== ERRORS ==="); console.log(errs.length?errs.join("\n"):"none 🎉");
