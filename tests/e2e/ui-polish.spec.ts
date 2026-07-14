import { expect, test } from "@playwright/test";

test("responsive hover details only expose usable targets", async ({ page, isMobile }) => {
  await page.goto("/");

  const trigger = page.locator("[data-hover-pill-trigger]").first();
  await expect(trigger).toBeVisible();

  if (isMobile) {
    await expect(trigger).not.toHaveAttribute("tabindex", "0");
    return;
  }

  await expect(trigger).toHaveAttribute("tabindex", "0");
  const targetHeight = await trigger.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element, "::after").height),
  );
  expect(targetHeight).toBeGreaterThanOrEqual(40);
});

test("project previews use composited positioning and concentric rows", async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), "Desktop hover preview behavior");
  await page.goto("/");

  const project = page.locator('a[data-project-link="true"][href="/projects/ceresito"]');
  await project.hover();

  const preview = page.locator("[data-project-hover-preview]");
  await expect(preview).toBeVisible();
  await expect(preview).toHaveCSS("top", "0px");
  await expect(preview).toHaveCSS("left", "0px");
  await expect(preview).not.toHaveCSS("transform", "none");
  await expect(project).toHaveCSS("border-radius", "20px");
});

test("profile preview stays vertically centered beside the name", async ({ page, isMobile }) => {
  test.skip(Boolean(isMobile), "Desktop profile preview behavior");
  await page.goto("/");

  const profileLink = page.getByRole("link", { name: "Gianluca Palmier" });
  const profileName = profileLink.locator("span").first();
  await profileLink.hover();

  const preview = page.locator("[data-profile-hover-preview]");
  await expect(preview).toBeVisible();
  await expect
    .poll(async () => {
      const [nameBox, previewBox] = await Promise.all([
        profileName.boundingBox(),
        preview.boundingBox(),
      ]);
      if (!nameBox || !previewBox) return null;
      return {
        verticalOffset: Math.round(
          previewBox.y + previewBox.height / 2 - (nameBox.y + nameBox.height / 2),
        ),
        gap: Math.round(nameBox.x - (previewBox.x + previewBox.width)),
      };
    })
    .toEqual({ verticalOffset: 0, gap: 16 });
});

test("controls keep concentric radii and tactile submit feedback", async ({ page }) => {
  await page.goto("/");

  const themeButton = page.getByRole("button", { name: "Cambiar a tema oscuro" });
  await expect(themeButton).toHaveCSS("border-radius", "10px");

  const submit = page.getByRole("button", { name: "Enviar" });
  await submit.scrollIntoViewIfNeeded();
  const box = await submit.boundingBox();
  if (!box) throw new Error("Submit button unavailable");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await expect.poll(() => submit.evaluate((element) => getComputedStyle(element).scale)).toBe("0.96");
  await page.mouse.up();
});
