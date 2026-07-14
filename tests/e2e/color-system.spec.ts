import { expect, test } from "@playwright/test";

const setTheme = async (page: import("@playwright/test").Page, theme: "light" | "dark") => {
  await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
};

test("light theme uses the warm editorial canvas, paper and accent roles", async ({ page }) => {
  await setTheme(page, "light");
  await page.goto("/");

  await expect(page.locator("body")).toHaveCSS("background-color", "oklch(0.985 0.008 75)");
  await expect(page.locator(".control-surface").first()).toHaveCSS(
    "background-color",
    "oklch(0.995 0.004 75)",
  );

  const accentText = await page.locator("html").evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--accent-text").trim(),
  );
  expect(accentText).toBe("oklch(0.55 0.19 35)");
});

test("dark theme keeps the editorial warmth and accessible accent", async ({ page }) => {
  await setTheme(page, "dark");
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "oklch(0.16 0.012 50)");

  const accentText = await page.locator("html").evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--accent-text").trim(),
  );
  expect(accentText).toBe("oklch(0.84 0.12 65)");
});

test("project hover treatment is global rather than project-specific", async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), "Desktop hover treatment");
  await setTheme(page, "light");
  await page.goto("/");

  const projects = page.locator('[data-project-link="true"]');
  expect(await projects.count()).toBeGreaterThanOrEqual(2);

  const first = projects.nth(0);
  const second = projects.nth(1);
  await first.hover();
  await expect(first.locator("h4")).toHaveCSS("color", "oklch(0.55 0.19 35)");
  const firstBackground = await first.evaluate((element) => getComputedStyle(element).backgroundColor);
  await second.hover();
  await expect(second.locator("h4")).toHaveCSS("color", "oklch(0.55 0.19 35)");
  await expect
    .poll(() => second.evaluate((element) => getComputedStyle(element).backgroundColor))
    .toBe(firstBackground);
});
