import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(e.message));
await p.goto(BASE+"/play",{waitUntil:"networkidle"});
await p.waitForFunction(()=>!!document.querySelector("button"), {timeout:8000}).catch(()=>{});
await p.waitForTimeout(3500);
const guestCount = await p.getByRole("button",{name:/convidado/i}).count();
const anyBtns = await p.locator("button").count();
console.log("convidado btns:", guestCount, "| total btns:", anyBtns);
await p.screenshot({path:`${OUT}/step1.png`});
if(guestCount>0){
  await p.getByRole("button",{name:/convidado/i}).click();
  await p.waitForTimeout(400);
  await p.locator("input[placeholder='Seu nome']").fill("José");
  await p.getByRole("button",{name:/Entrar no clube/i}).click();
  await p.waitForTimeout(900);
  console.log("na Play:", await p.locator("text=Episódios").first().isVisible().catch(()=>false));
  await p.getByText("Em alta").first().click();
  await p.waitForTimeout(900);
  console.log("mini-player:", await p.locator("text=Tocando agora").isVisible().catch(()=>false));
  await p.screenshot({path:`${OUT}/step2.png`});
}
console.log("erros:", errs.length?errs:"nenhum");
await b.close();
