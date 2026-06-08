import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:5173";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
// splash
{ const p=await ctx.newPage(); await p.goto(BASE+"/",{waitUntil:"domcontentloaded"}); await p.waitForTimeout(900); await p.screenshot({path:`${OUT}/v4-splash.png`}); await p.close(); }
// home after splash
{ const p=await ctx.newPage(); await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(3000); await p.screenshot({path:`${OUT}/v4-home.png`}); await p.close(); }
await b.close(); console.log("done");
