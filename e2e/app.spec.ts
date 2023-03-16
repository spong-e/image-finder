import { expect, test } from "@playwright/test";

import { firstName, lastName, topic } from "./constants";
import * as response from "./response.json";

test.beforeEach(async ({ page }) => {
  await page.route(
    "https://api.unsplash.com/search/photos**",
    async (route) => {
      const json = {
        ...response,
      };
      setTimeout(async () => await route.fulfill({ json }), 100);
    }
  );
});

test.describe("App flow through", () => {
  test("Verify that can get through the app", async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("First name").fill(firstName);

    await page.getByPlaceholder("Last name").fill(lastName);

    await page.getByText(topic, { exact: true }).check();

    await page.getByTestId("submitBtn").click();

    expect(page).toHaveURL("/search");

    const acceptButton = page.getByText("Accept", { exact: true });
    const declineButton = page.getByText("Decline", { exact: true });

    await acceptButton.waitFor({ state: "attached" });

    await declineButton.waitFor({ state: "attached" });

    await acceptButton.click();

    expect(page).toHaveURL("/display");

    const nameDisplay = page.getByTestId("cardHeader");
    const thumbnail = page.getByRole("img");

    await nameDisplay.waitFor({ state: "attached" });
    await thumbnail.waitFor({ state: "attached" });

    expect(await nameDisplay.textContent()).toEqual(`${firstName} ${lastName}`);
  });
});
