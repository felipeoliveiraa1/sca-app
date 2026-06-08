import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const errs=[];
// splash capture (early)
{ const pg=await ctx.newPage(); await pg.goto(BASE+"/",{waitUntil:"domcontentloaded"}); await pg.waitForTimeout(900); await pg.screenshot({path:`${OUT}/v3-splash.png`}); await pg.close(); }
const routes=[["home","/"],["edicoes","/edicoes"],["galeria","/galeria/e140"],["perfil","/membros/m1"],["garagem","/garagem"],["match","/match"],["conectar","/conectar"],["ranking","/ranking"],["parceiros","/parceiros"],["vantagens","/vantagens"],["play","/play"],["edicao","/edicoes/e141"]];
for(const [n,p] of routes){
  const pg=await ctx.newPage();
  pg.on("pageerror",e=>errs.push(n+": "+e.message));
  pg.on("console",m=>m.type()==="error"&&errs.push(n+": "+m.text()));
  await pg.goto(BASE+p,{waitUntil:"networkidle"});
  await pg.waitForTimeout(3000); // deixa a splash terminar
  await pg.screenshot({path:`${OUT}/v3-${n}.png`});
  await pg.close();
}
await b.close();
console.log("errors:", errs.length?errs:"none 🎉");
