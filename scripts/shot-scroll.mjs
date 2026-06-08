import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const pg=await ctx.newPage();
await pg.goto(BASE+"/",{waitUntil:"networkidle"});
await pg.waitForTimeout(1200);
const main = pg.locator("main");
for (const [i,y] of [[1,820],[2,1640],[3,2460]]){
  await main.evaluate((el,top)=>el.scrollTo({top,behavior:"instant"}), y);
  await pg.waitForTimeout(1100);
  await pg.screenshot({path:`${OUT}/v2-home-s${i}.png`});
}
await b.close();
console.log("scroll shots done");
