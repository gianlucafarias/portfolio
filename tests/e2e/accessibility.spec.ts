import { expect, test } from "@playwright/test";

test("a first-time visitor inherits the system theme and the selector exposes its state", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  const darkButton = page.getByRole("button", { name: "Cambiar a tema oscuro" });
  await expect(darkButton).toHaveAttribute("aria-pressed", "true");

  const size = await darkButton.boundingBox();
  expect(size?.width).toBeGreaterThanOrEqual(44);
  expect(size?.height).toBeGreaterThanOrEqual(44);
});

test("the home page exposes a logical heading outline and labelled form controls", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Sobre mí" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Proyectos" })).toBeVisible();
  const about = page.locator("#about");
  await expect(about.locator(".control-surface")).toHaveCount(0);
  await expect(about.getByRole("link", { name: "GitHub ↗" })).toHaveAttribute("href", /github\.com/);
  await expect(about.getByRole("link", { name: "LinkedIn ↗" })).toHaveAttribute("href", /linkedin\.com/);
  await expect(about.getByRole("link", { name: "hello@gianluca.dev" })).toHaveAttribute(
    "href",
    "mailto:hello@gianluca.dev",
  );
  await expect(about.getByRole("link", { name: /Descargar CV/ })).toHaveCount(0);
  await expect(page.getByLabel("Nombre", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Mensaje", { exact: true })).toBeVisible();

  const languageTrigger = page.getByRole("button", { name: "Idioma" });
  await expect(languageTrigger).toContainText("ES");
  const languageSize = await languageTrigger.boundingBox();
  expect(languageSize?.height).toBe(32);

  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: "GitHub" })).toHaveCount(1);
  await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveCount(1);
  const cvLink = contact.getByRole("link", { name: "Descargar CV" });
  await expect(cvLink).toBeVisible();
  const cvSize = await cvLink.boundingBox();
  expect(cvSize?.height).toBeLessThan(44);
});

test("the English home preserves the same accessible structure", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", { level: 1, name: "About me" })).toBeVisible();
  await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Message", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Language" })).toContainText("EN");
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toHaveAttribute(
    "aria-pressed",
    /true|false/,
  );
});

test("the compact language dropdown switches locale without adding vertical space", async ({ page }) => {
  await page.goto("/");

  const spanishTrigger = page.getByRole("button", { name: "Idioma" });
  await spanishTrigger.click();

  const menu = page.getByRole("menu", { name: "Elegir idioma" });
  await expect(menu).toBeVisible();
  const [triggerBox, menuBox] = await Promise.all([
    spanishTrigger.boundingBox(),
    menu.boundingBox(),
  ]);
  expect(triggerBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  expect(menuBox!.y).toBeGreaterThanOrEqual(triggerBox!.y + triggerBox!.height);

  await page.getByRole("menuitemradio", { name: "EN" }).click();
  await expect(page).toHaveURL("/en");

  const englishTrigger = page.getByRole("button", { name: "Language" });
  await expect(englishTrigger).toContainText("EN");
  await englishTrigger.click();
  await page.getByRole("menuitemradio", { name: "ES" }).click();
  await expect(page).toHaveURL("/");
});

test("the typography keeps its hierarchy, readable wrapping, and contrast floors", async ({ page }) => {
  await page.goto("/");

  const pageTitle = page.getByRole("heading", { level: 1, name: "Sobre mí" });
  await expect(pageTitle).toHaveCSS("font-size", "24px");
  await expect(pageTitle).toHaveCSS("line-height", "27.6px");

  const profileName = page.getByRole("link", { name: "Gianluca Palmier" });
  await expect(profileName).toHaveCSS("font-size", "20px");

  const sectionTitle = page.getByRole("heading", { level: 2, name: "Proyectos" });
  await expect(sectionTitle).toHaveCSS("font-size", "18px");

  const projectSummary = page.locator('[data-project-link="true"] p').first();
  await expect(projectSummary).toHaveCSS("font-size", "14px");
  await expect(projectSummary).toHaveCSS("line-height", "21px");

  const aboutParagraph = page.locator("#about p").first();
  await expect(aboutParagraph).toHaveCSS("font-size", "16px");
  await expect(aboutParagraph).toHaveCSS("text-wrap", "wrap");

  const nameInput = page.getByLabel("Nombre", { exact: true });
  await expect(nameInput).toHaveCSS("font-size", "16px");

  const contrastRatios = await page.evaluate(() => {
    const toRgb = (color: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas context unavailable");
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data.slice(0, 3));
    };
    const luminance = (color: string) => {
      const channels = toRgb(color).map((channel) => channel / 255).map((channel) =>
        channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
      );
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const contrast = (foreground: string, background: string) => {
      const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    const background = getComputedStyle(document.body).backgroundColor;
    const role = document.querySelector("header p");
    const footer = document.querySelector("footer a");
    const input = document.querySelector('input[name="name"]');
    if (!role || !footer || !input) throw new Error("Typography targets unavailable");

    return {
      role: contrast(getComputedStyle(role).color, background),
      footer: contrast(getComputedStyle(footer).color, background),
      placeholder: contrast(getComputedStyle(input, "::placeholder").color, background),
    };
  });

  expect(contrastRatios.role).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatios.footer).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatios.placeholder).toBeGreaterThanOrEqual(4.5);
});
