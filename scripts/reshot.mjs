import { chromium } from "playwright";
const OUT = "/tmp/sca-shots";
const BASE = "http://localhost:5173";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

const routes = [["home", "/"], ["edicao-detalhe", "/edicoes/e141"], ["membros", "/membros"], ["perfil", "/membros/m1"], ["parceiros", "/parceiros"], ["play", "/play"], ["match", "/match"], ["vantagens", "/vantagens"], ["edicoes", "/edicoes"], ["ranking", "/ranking"], ["garagem", "/garagem"], ["conectar", "/conectar"], ["galeria", "/galeria/e140"]];
for (const [n, p] of routes) {
  const pg = await ctx.newPage();
  await pg.goto(BASE + p, { waitUntil: "networkidle" });
  await pg.waitForTimeout(1300);
  await pg.screenshot({ path: `${OUT}/n-${n}.png` });
  await pg.close();
}
// founder
const pg = await ctx.newPage();
await pg.goto(BASE + "/", { waitUntil: "networkidle" });
await pg.waitForTimeout(700);
await pg.locator("button", { hasText: "001" }).first().click();
await pg.waitForTimeout(500);
await pg.locator("button", { hasText: "Painel do Fundador" }).first().click();
await pg.waitForTimeout(1400);
await pg.screenshot({ path: `${OUT}/n-fundador-visao.png` });
for (const [t, f] of [["Portaria VIP", "portaria"], ["Receita", "receita"], ["Domínio", "dominio"]]) {
  await pg.locator("button", { hasText: t }).first().click().catch(() => {});
  await pg.waitForTimeout(1200);
  await pg.screenshot({ path: `${OUT}/n-fundador-${f}.png` });
}
await b.close();
console.log("reshot done");
