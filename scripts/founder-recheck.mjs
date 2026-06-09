import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const m=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await m.newPage(); const log=[], errs=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",e=>e.type()==="error"&&errs.push(e.text()));
await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2900);
await p.getByRole("button",{name:"Trocar de visão"}).click(); await p.waitForTimeout(500);
await p.locator("button",{hasText:"Painel do Fundador"}).first().click(); await p.waitForTimeout(1200);
const header = await p.locator("button",{hasText:"Sair"}).isVisible().catch(()=>false);
log.push((header?"✅":"❌")+" Entrou no Painel do Fundador (botão Sair visível)");
let okTabs=0;
for(const t of ["Portaria","Domínio","Receita","Press"]){
  try{ await p.locator("nav button",{hasText:t}).first().click({timeout:4000}); await p.waitForTimeout(900); okTabs++; }
  catch(e){ log.push("  falhou aba "+t); }
}
log.push((okTabs===4?"✅":"❌")+` Navegação das 4 abas (${okTabs}/4)`);
await p.locator("nav button",{hasText:"Domínio"}).first().click(); await p.waitForTimeout(1600);
const ifr = await p.locator("iframe").count();
log.push((ifr>0?"✅":"❌")+` Mapa real (iframe) no Domínio (${ifr})`);
await p.screenshot({path:`${OUT}/rc-dominio.png`});
// voltar pra membro
await p.locator("button",{hasText:"Sair"}).click().catch(()=>{}); await p.waitForTimeout(800);
const back = await p.getByText("Clube",{exact:true}).first().isVisible().catch(()=>false);
log.push((back?"✅":"❌")+" 'Sair' volta para a visão do Membro");
await b.close();
console.log(log.join("\n")); console.log("erros:", errs.length?errs.join("\n"):"nenhum 🎉");
