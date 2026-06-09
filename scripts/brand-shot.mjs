import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",e=>e.type()==="error"&&errs.push(e.text()));
await p.goto(BASE+"/parceiros",{waitUntil:"networkidle"}); await p.waitForTimeout(3000);
await p.screenshot({path:`${OUT}/brand-wall.png`});
// tocar na 1a marca (Boca Mafra = concessionária)
await p.locator("button:has-text('BM')").first().click().catch(()=>{}); await p.waitForTimeout(800);
const sheet = await p.locator("text=Benefício para membros").isVisible().catch(()=>false);
await p.screenshot({path:`${OUT}/brand-detail.png`});
await b.close();
console.log("sheet abriu:", sheet, "| erros:", errs.length?errs:"NENHUM 🎉");
