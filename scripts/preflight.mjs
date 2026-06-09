import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const errs=[], log=[];
const ok=(c,m)=>log.push((c?"✅":"❌")+" "+m);
const m=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});

// 1) Todas as rotas, erros de console
const routes=["/","/edicoes","/edicoes/e141","/galeria/e140","/membros","/membros/m1","/garagem","/match","/conectar","/ranking","/parceiros","/vantagens","/play"];
let routeErr=0;
for(const r of routes){
  const p=await m.newPage();
  const local=[];
  p.on("pageerror",e=>local.push(e.message));
  p.on("console",e=>e.type()==="error"&&local.push(e.text()));
  await p.goto(BASE+r,{waitUntil:"networkidle"}).catch(e=>local.push("NAV "+e.message));
  await p.waitForTimeout(2900);
  if(local.length){ routeErr++; errs.push(r+": "+local.join(" | ")); }
  await p.close();
}
ok(routeErr===0, `${routes.length} rotas carregaram (${routeErr} com erro)`);

// 2) Interações no detalhe da edição
{ const p=await m.newPage();
  await p.goto(BASE+"/edicoes/e141",{waitUntil:"networkidle"}); await p.waitForTimeout(2900);
  try{
    await p.getByRole("button",{name:/Confirmar Presença/i}).first().click({timeout:5000});
    await p.waitForTimeout(700);
    const rsvp=await p.getByText("Gerar meu Passe").isVisible();
    await p.getByRole("button",{name:/Gerar meu Passe/i}).click({timeout:5000}); await p.waitForTimeout(700);
    await p.getByRole("button",{name:/Simular check-in/i}).click({timeout:5000}); await p.waitForTimeout(2300);
    const ci=await p.locator("text=/Bem-vindo à/").isVisible();
    ok(rsvp&&ci,"RSVP → Passe → Check-in (ignição)");
  }catch(e){ ok(false,"RSVP/Check-in — "+e.message.split("\n")[0]); }
  await p.close(); }

// 3) Painel do Fundador + navegação das abas
{ const p=await m.newPage();
  await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2900);
  try{
    await p.getByRole("button",{name:"Trocar de visão"}).click({timeout:5000}); await p.waitForTimeout(500);
    await p.getByText("Painel do Fundador").first().click({timeout:5000}); await p.waitForTimeout(1100);
    const fund=await p.getByText("Dr. José Silva").first().isVisible();
    await p.screenshot({path:`${OUT}/pf-founder.png`});
    let tabsOk=0;
    for(const t of ["Portaria","Domínio","Receita","Press"]){
      try{ await p.getByRole("button",{name:t}).click({timeout:4000}); await p.waitForTimeout(900); tabsOk++; }catch{}
    }
    const ifr=await p.locator("iframe").count();
    ok(fund,"Entrou no Painel do Fundador");
    ok(tabsOk===4, `Navegação das 4 abas (${tabsOk}/4)`);
    ok(ifr>0,"Mapa real (iframe) no Domínio");
    await p.screenshot({path:`${OUT}/pf-founder-press.png`});
  }catch(e){ ok(false,"Fundador — "+e.message.split("\n")[0]); }
  await p.close(); }

// 4) Outras interações
async function testar(rota, abrir, conferir, nome){
  const p=await m.newPage();
  await p.goto(BASE+rota,{waitUntil:"networkidle"}); await p.waitForTimeout(2900);
  try{ await abrir(p); await p.waitForTimeout(900); ok(await conferir(p), nome); }
  catch(e){ ok(false, nome+" — "+e.message.split("\n")[0]); }
  await p.close();
}
await testar("/galeria/e140", p=>p.locator("button:has(img)").nth(3).click({timeout:5000}), p=>p.locator("text=Toque para fechar").isVisible(), "Galeria → visualizador");
await testar("/conectar", p=>p.getByRole("button",{name:/Simular conex/i}).click({timeout:5000}), p=>p.locator("text=/conectad/i").first().isVisible(), "Conectar → animação de conexão");
await testar("/vantagens", p=>p.getByRole("button",{name:/Resgatar/i}).first().click({timeout:5000}), p=>p.locator("text=/Apresente este código/i").isVisible(), "Vantagens → voucher QR");
await testar("/", p=>p.locator(".no-scrollbar button").first().click({timeout:5000}), p=>p.getByRole("button",{name:"Próximo"}).isVisible(), "Stories → abre player");

// 5) Desktop (telão via laptop)
const d=await b.newContext({viewport:{width:1440,height:900}});
{ const p=await d.newPage();
  p.on("pageerror",e=>errs.push("desktop: "+e.message));
  await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2900);
  await p.screenshot({path:`${OUT}/pf-desktop-home.png`});
  ok(true,"Desktop/telão renderizou (screenshot salvo)");
  await p.close(); }

await b.close();
console.log("=== CHECKLIST ==="); log.forEach(l=>console.log(" "+l));
console.log("=== DETALHE DE ERROS ==="); console.log(errs.length?errs.join("\n"):"nenhum 🎉");
