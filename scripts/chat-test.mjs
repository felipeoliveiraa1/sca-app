import { chromium } from "playwright";
const OUT="/tmp/sca-shots", BASE="http://localhost:4319";
const b=await chromium.launch();
const m=await b.newContext({viewport:{width:412,height:900},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await m.newPage(); const log=[], errs=[];
p.on("pageerror",e=>errs.push(e.message)); p.on("console",e=>e.type()==="error"&&errs.push(e.text()));
const ok=(c,m)=>log.push((c?"✅":"❌")+" "+m);
// Membros hub -> Conexões
await p.goto(BASE+"/membros",{waitUntil:"networkidle"}); await p.waitForTimeout(2900);
await p.getByText("Conexões",{exact:true}).first().click().catch(()=>{}); await p.waitForTimeout(900);
ok(p.url().includes("/conexoes"), "Hub Membros → Conexões");
ok(await p.locator("text=Mensagens").first().isVisible().catch(()=>false), "Conexões: inbox carregou");
await p.screenshot({path:`${OUT}/ch-conexoes.png`});
// abrir conversa
await p.locator("a[href^='/conversas/']").first().click().catch(()=>{}); await p.waitForTimeout(900);
ok(p.url().includes("/conversas/"), "Abre conversa");
ok(await p.locator("text=online agora").isVisible().catch(()=>false), "Chat: header com status");
const antes = await p.locator("div.flex.justify-end, div.flex.justify-start").count();
// enviar mensagem
await p.locator("input[placeholder='Mensagem…']").fill("Vamos marcar um café essa semana?");
await p.locator("button[aria-label='Enviar']").click(); await p.waitForTimeout(1600);
const depois = await p.locator("div.flex.justify-end, div.flex.justify-start").count();
ok(depois>antes, `Chat: enviar + resposta automática (bolhas ${antes}→${depois})`);
await p.screenshot({path:`${OUT}/ch-conversa.png`});
// fluxo conectar -> enviar mensagem
await p.goto(BASE+"/conectar",{waitUntil:"networkidle"}); await p.waitForTimeout(2900);
await p.getByRole("button",{name:/Simular conex/i}).click().catch(()=>{}); await p.waitForTimeout(900);
await p.getByRole("button",{name:/Enviar mensagem/i}).click().catch(()=>{}); await p.waitForTimeout(900);
ok(p.url().includes("/conversas/"), "Conectar → Enviar mensagem abre o chat");
await b.close();
console.log(log.join("\n")); console.log("erros:", errs.length?errs.join("\n"):"NENHUM 🎉");
