import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const errs=[];
for(const [n,p] of [["v2-home","/"],["v2-membros","/membros"],["v2-edicao","/edicoes/e141"]]){
  const pg=await ctx.newPage();
  pg.on("pageerror",e=>errs.push(n+": "+e.message));
  pg.on("console",m=>m.type()==="error"&&errs.push(n+": "+m.text()));
  await pg.goto(BASE+p,{waitUntil:"networkidle"});
  await pg.waitForTimeout(1500);
  await pg.screenshot({path:`${OUT}/${n}.png`});
  // full-page home capture too
  if(n==="v2-home") await pg.screenshot({path:`${OUT}/v2-home-full.png`, fullPage:true});
  await pg.close();
}
await b.close();
console.log("errors:", errs.length?errs:"none");
