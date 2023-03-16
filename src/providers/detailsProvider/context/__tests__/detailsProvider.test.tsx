import { render } from "@testing-library/react";

import { DetailsProvider } from "../DetailsProvider";

describe("Details provider", () => {
  it("Provider renders children", () => {
    const { container } = render(
      <DetailsProvider>
        <h1>This is the Details Provider</h1>
      </DetailsProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
