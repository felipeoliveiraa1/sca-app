import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage();
await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2800);
await p.screenshot({path:`${OUT}/wel-lambo.png`});
await b.close(); console.log("done");
