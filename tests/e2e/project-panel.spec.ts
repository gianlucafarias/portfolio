import { expect, test } from "@playwright/test";

test("a direct desktop project route keeps the project panel at full opacity", async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), "Desktop panel behavior");
  await page.goto("/projects/ceresito");

  const panel = page.getByRole("complementary", {
    name: "Proyecto: Ceresito — Asistente Conversacional de Ceres",
  });
  await expect(panel).toBeVisible();

  await expect
    .poll(() =>
      panel.evaluate((element) => {
        let opacity = 1;
        let current: Element | null = element;

        while (current) {
          opacity *= Number.parseFloat(window.getComputedStyle(current).opacity || "1");
          current = current.parentElement;
        }

        return opacity;
      }),
    )
    .toBe(1);
});

test("the desktop panel manages focus without exposing unrelated background controls", async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), "Desktop panel behavior");
  await page.goto("/");

  const opener = page.locator('a[data-project-link="true"][href="/projects/ceresito"]');
  await opener.focus();
  await opener.click();
  await expect(page).toHaveURL("/projects/ceresito", { timeout: 15_000 });

  const projectTitle = page.getByRole("heading", {
    level: 1,
    name: "Ceresito — Asistente Conversacional de Ceres",
  });
  await expect(projectTitle).toBeFocused();

  const languageTrigger = page.getByRole("button", { name: "Idioma" });
  await expect(languageTrigger).toHaveAttribute("tabindex", "-1");

  await expect
    .poll(() =>
      opener.evaluate((element) => {
        let opacity = 1;
        let current: Element | null = element;
        while (current) {
          opacity *= Number.parseFloat(window.getComputedStyle(current).opacity || "1");
          current = current.parentElement;
        }
        return opacity;
      }),
    )
    .toBe(1);

  const aboutOpacity = await page.getByRole("heading", { level: 1, name: "Sobre mí" }).evaluate((element) => {
    let opacity = 1;
    let current: Element | null = element;
    while (current) {
      opacity *= Number.parseFloat(window.getComputedStyle(current).opacity || "1");
      current = current.parentElement;
    }
    return opacity;
  });
  expect(aboutOpacity).toBeLessThan(1);

  await page.getByRole("button", { name: "Cerrar proyecto" }).click();
  await expect(page).toHaveURL("/");
  await expect(opener).toBeFocused();
});

test("reduced-motion removes panel layout transitions", async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), "Desktop panel behavior");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('a[data-project-link="true"][href="/projects/ceresito"]').click();

  const transitionDurations = await page.locator(".portfolio-shell").evaluate((shell) => {
    const primary = shell.querySelector(".portfolio-primary");
    const firstBackgroundChild = primary?.querySelector(":scope > :not([data-project-panel])");

    return {
      shell: window.getComputedStyle(shell).transitionDuration,
      background: firstBackgroundChild
        ? window.getComputedStyle(firstBackgroundChild).transitionDuration
        : null,
    };
  });

  expect(transitionDurations.shell).toBe("0.01s");
  expect(transitionDurations.background).toBe("0.01s");
});

test("mobile project navigation keeps the full-page case study", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile case-study behavior");
  await page.goto("/");
  await page.locator('a[data-project-link="true"][href="/projects/ceresito"]').click();

  await expect(page).toHaveURL("/projects/ceresito");
  await expect(page.locator("[data-project-panel]")).toHaveCount(0);
  await expect(page.getByRole("img", { name: "Ceresito — Asistente Conversacional de Ceres" })).toBeVisible();
});
