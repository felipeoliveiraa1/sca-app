import { chromium } from "playwright";
const BASE="http://localhost:4319";
const b=await chromium.launch();
const m=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const log=[], errs=[];
const ok=(c,s)=>log.push((c?"✅":"❌ FALHOU:")+" "+s);
// helper: navega, passa splash + welcome
async function enter(route){
  const p=await m.newPage();
  p.on("pageerror",e=>errs.push(route+": "+e.message));
  p.on("console",e=>e.type()==="error"&&errs.push(route+": "+e.text()));
  await p.goto(BASE+route,{waitUntil:"networkidle"});
  await p.waitForTimeout(2600);
  const guest=p.getByRole("button",{name:/convidado/i});
  if(await guest.isVisible().catch(()=>false)){
    await guest.click(); await p.waitForTimeout(350);
    await p.locator("input[placeholder='Seu nome']").fill("José");
    await p.getByRole("button",{name:/Entrar no clube/i}).click(); await p.waitForTimeout(700);
  }
  return p;
}
const T=async(route,name,fn)=>{ let p; try{ p=await enter(route); ok(await fn(p), name);}catch(e){ ok(false, name+" — "+e.message.split("\n")[0]); } finally{ if(p) await p.close(); } };

// 0) Login
{ const p=await m.newPage();
  p.on("pageerror",e=>errs.push("login: "+e.message));
  await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(2600);
  const wel=await p.getByText("Bem-vindo ao clube").isVisible().catch(()=>false);
  await p.getByRole("button",{name:/convidado/i}).click().catch(()=>{}); await p.waitForTimeout(350);
  await p.locator("input[placeholder='Seu nome']").fill("José").catch(()=>{});
  await p.getByRole("button",{name:/Entrar no clube/i}).click().catch(()=>{}); await p.waitForTimeout(800);
  const home=await p.locator("h1:has-text('José')").first().isVisible().catch(()=>false);
  ok(wel&&home,"Login: Welcome → nome → Home personalizada");
  await p.close(); }

// 1) Rotas sem erro de console (enter já cobre)
await T("/", "Home carrega", async p=>p.locator("text=Confirmar Presença").isVisible());
await T("/edicoes","Edições carrega", async p=>p.locator("text=Garantir presença").first().isVisible());
await T("/galeria/e140","Galeria carrega", async p=>p.locator("text=registros").first().isVisible().catch(()=>true));
await T("/membros","Membros carrega", async p=>p.locator("input").first().isVisible());
await T("/membros/m1","Perfil carrega", async p=>p.getByRole("button",{name:/Conectar com/i}).isVisible());
await T("/garagem","Garagem carrega", async p=>p.locator("text=/Garagem/i").first().isVisible());
await T("/ranking","Ranking carrega", async p=>p.locator("text=/Ranking|Presença/i").first().isVisible());
await T("/niveis","Níveis carrega", async p=>p.locator("text=Como chega").first().isVisible());
await T("/play","Play carrega", async p=>p.locator("text=/Episódios|SCA Play/i").first().isVisible());

// 2) Interações
await T("/edicoes/e141","Edição: votar + RSVP + check-in", async p=>{
  await p.locator("button:has-text('%')").first().click().catch(()=>{}); await p.waitForTimeout(400);
  await p.getByRole("button",{name:/Confirmar Presença/i}).first().click(); await p.waitForTimeout(600);
  const rsvp=await p.getByText("Gerar meu Passe").isVisible();
  await p.getByRole("button",{name:/Gerar meu Passe/i}).click(); await p.waitForTimeout(600);
  await p.getByRole("button",{name:/Simular check-in/i}).click(); await p.waitForTimeout(2200);
  return rsvp && await p.locator("text=/Bem-vindo à/").isVisible();
});
await T("/edicoes/e141","Edição: mapa real (iframe)", async p=>(await p.locator("iframe").count())>0);
await T("/galeria/e140","Galeria: visualizador", async p=>{
  await p.locator("button:has(img)").nth(3).click(); await p.waitForTimeout(700);
  return p.locator("text=Toque para fechar").isVisible();
});
await T("/conexoes","Conexões → Conversa → enviar", async p=>{
  await p.locator("a[href^='/conversas/']").first().click(); await p.waitForTimeout(700);
  await p.locator("input[placeholder='Mensagem…']").fill("Teste");
  await p.locator("button[aria-label='Enviar']").click(); await p.waitForTimeout(1500);
  return (await p.locator("div.flex.justify-end").count())>0;
});
await T("/match","Match: Conectar", async p=>{ await p.getByRole("button",{name:/Conectar/i}).first().click(); await p.waitForTimeout(600); return p.locator("text=/enviado/i").first().isVisible(); });
await T("/conectar","Conectar: simular + enviar msg", async p=>{
  await p.getByRole("button",{name:/Simular conex/i}).click(); await p.waitForTimeout(700);
  await p.getByRole("button",{name:/Enviar mensagem/i}).click(); await p.waitForTimeout(700);
  return p.url().includes("/conversas/");
});
await T("/vantagens","Vantagens: voucher", async p=>{ await p.getByRole("button",{name:/Resgatar/i}).first().click(); await p.waitForTimeout(700); return p.locator("text=/Apresente este código/i").isVisible(); });
await T("/parceiros","Hall de Marcas: abrir parceiro", async p=>{ await p.locator("button:has-text('BM')").first().click(); await p.waitForTimeout(700); return p.locator("text=Benefício para membros").isVisible(); });
await T("/play","Play: mini-player", async p=>{ await p.locator("button:has(img)").nth(1).click(); await p.waitForTimeout(700); return p.locator("text=/tocando agora/i").isVisible(); });

// 3) Fundador
await T("/","Fundador: entrar + abas + mapa + sair", async p=>{
  await p.getByRole("button",{name:"Trocar de visão"}).click(); await p.waitForTimeout(400);
  await p.locator("button",{hasText:"Painel do Fundador"}).first().click(); await p.waitForTimeout(900);
  const dent=await p.locator("button",{hasText:"Sair"}).isVisible();
  let tabs=0; for(const t of ["Portaria","Domínio","Receita","Press"]){ try{ await p.locator("nav button",{hasText:t}).first().click({timeout:3000}); await p.waitForTimeout(600); tabs++;}catch{} }
  await p.locator("nav button",{hasText:"Domínio"}).first().click(); await p.waitForTimeout(1000);
  const ifr=(await p.locator("iframe").count())>0;
  await p.locator("button",{hasText:"Portaria"}).first().click(); await p.waitForTimeout(500);
  await p.getByRole("button",{name:/Aprovar/i}).click().catch(()=>{}); await p.waitForTimeout(800);
  await p.locator("button",{hasText:"Sair"}).click(); await p.waitForTimeout(700);
  const back=await p.getByText("Clube",{exact:true}).first().isVisible();
  return dent && tabs===4 && ifr && back;
});

await b.close();
console.log("=== CHECKLIST FINAL ==="); log.forEach(l=>console.log(" "+l));
console.log("\n=== ERROS DE CONSOLE ==="); console.log(errs.length?[...new Set(errs)].join("\n"):"NENHUM 🎉");
