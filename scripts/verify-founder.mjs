import { chromium } from "playwright";

const BASE = "http://localhost:4317";
const OUT = "/tmp/sca-shots";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 412, height: 900 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
const log = [];
page.on("pageerror", (e) => log.push("PAGEERROR: " + e.message));
page.on("console", (m) => m.type() === "error" && log.push(m.text()));

await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(700);

await page.locator("button", { hasText: "001" }).first().click();
await page.waitForTimeout(600);

// Click the founder option (button containing the heading)
await page.locator("button", { hasText: "Painel do Fundador" }).first().click();
await page.waitForTimeout(1600);
await page.screenshot({ path: `${OUT}/fundador-visao.png` });
console.log("after switch, body has 'Dr. José':", await page.getByText("Dr. José Silva").first().isVisible().catch(() => false));

const tabs = ["Portaria VIP", "Domínio", "Receita", "Press Kit"];
const fileMap = { "Portaria VIP": "portaria", "Domínio": "dominio", "Receita": "receita", "Press Kit": "presskit" };
for (const t of tabs) {
  await page.locator("button", { hasText: t }).first().click().catch((e) => log.push("tab " + t + ": " + e.message));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/fundador-${fileMap[t]}.png` });
}

// Demonstrate Portaria swipe (approve one card)
await page.locator("button", { hasText: "Portaria VIP" }).first().click();
await page.waitForTimeout(800);
await page.locator("button", { hasText: "Aprovar" }).first().click().catch(() => {});
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/fundador-portaria-aprovar.png` });

await browser.close();
console.log("\nerrors:", log.length ? log : "none 🎉");
