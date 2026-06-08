import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://localhost:4317";
const OUT = "/tmp/sca-shots";
mkdirSync(OUT, { recursive: true });

const routes = [
  ["home", "/"],
  ["edicoes", "/edicoes"],
  ["edicao-detalhe", "/edicoes/e141"],
  ["galeria", "/galeria/e140"],
  ["membros", "/membros"],
  ["perfil", "/membros/m1"],
  ["garagem", "/garagem"],
  ["match", "/match"],
  ["conectar", "/conectar"],
  ["ranking", "/ranking"],
  ["parceiros", "/parceiros"],
  ["vantagens", "/vantagens"],
  ["play", "/play"],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 412, height: 900 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

const errors = [];

for (const [name, path] of routes) {
  const page = await ctx.newPage();
  const local = [];
  page.on("console", (m) => {
    if (m.type() === "error") local.push(m.text());
  });
  page.on("pageerror", (e) => local.push("PAGEERROR: " + e.message));
  await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 20000 }).catch((e) => local.push("NAV: " + e.message));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  if (local.length) errors.push([name, local]);
  await page.close();
}

// Founder persona flow
{
  const page = await ctx.newPage();
  const local = [];
  page.on("pageerror", (e) => local.push("PAGEERROR: " + e.message));
  page.on("console", (m) => m.type() === "error" && local.push(m.text()));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  // open persona switch (avatar chip with "001")
  await page.getByText("001", { exact: true }).first().click().catch((e) => local.push("click001: " + e.message));
  await page.waitForTimeout(500);
  await page.getByText("Painel do Fundador").first().click().catch((e) => local.push("clickFundador: " + e.message));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/fundador-visao.png` });
  // tabs
  for (const t of ["Portaria VIP", "Domínio", "Receita", "Press Kit"]) {
    await page.getByText(t, { exact: true }).first().click().catch(() => {});
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/fundador-${t.split(" ")[0].toLowerCase()}.png` });
  }
  if (local.length) errors.push(["fundador", local]);
  await page.close();
}

await browser.close();

console.log("\n=== CONSOLE / PAGE ERRORS ===");
if (!errors.length) console.log("none 🎉");
else for (const [name, errs] of errors) {
  console.log(`\n[${name}]`);
  errs.forEach((e) => console.log("  - " + e));
}
console.log("\nscreenshots in", OUT);
