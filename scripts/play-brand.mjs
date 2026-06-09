import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
async function enter(p,route){
  await p.goto(BASE+route,{waitUntil:"networkidle"}); await p.waitForTimeout(3300); // splash + fade
  // clique com auto-wait (espera ficar clicável)
  await p.getByRole("button",{name:/convidado/i}).click({timeout:8000});
  await p.locator("input[placeholder='Seu nome']").fill("José");
  await p.getByRole("button",{name:/Entrar no clube/i}).click();
  await p.waitForTimeout(800);
}
const log=[],errs=[];
{ const p=await ctx.newPage(); p.on("pageerror",e=>errs.push(e.message));
  await enter(p,"/play");
  const naPlay = await p.locator("text=Episódios").first().isVisible().catch(()=>false);
  log.push((naPlay?"✅":"❌")+" entrou na tela Play");
  await p.getByText("Em alta").first().click(); await p.waitForTimeout(900);
  const mp=await p.locator("text=Tocando agora").isVisible().catch(()=>false);
  log.push((mp?"✅":"❌")+" Play: mini-player aparece (fixo no rodapé)");
  await p.screenshot({path:`${OUT}/play-fixed.png`});
  // tocar outro episódio também
  await p.getByText("Networking de elite").first().click().catch(()=>{}); await p.waitForTimeout(700);
  log.push((await p.locator("text=Tocando agora").isVisible().catch(()=>false)?"✅":"❌")+" Play: troca de episódio mantém player");
  await p.close(); }
await b.close();
console.log(log.join("\n")); console.log("erros:", errs.length?errs:"nenhum 🎉");
