import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import { useDetails } from "../../providers";
import Display from "../Display";

import "@testing-library/jest-dom";

const details: Details = {
  firstName: "Test",
  lastName: "User",
  thumbnail: "http://tempuri/thumbnail",
  topic: "testing",
};

jest.mock("../../providers");

describe("Display component", () => {
  describe("Details returned", () => {
    beforeEach(async () => {
      (useDetails as jest.Mock).mockReturnValue(details);
    });

    it("Given useDetails returns data, component renders", async () => {
      const { container } = render(
        <MemoryRouter>
          <Display />
        </MemoryRouter>
      );

      const thumbnail = await screen.findByTestId("cardThumbnail");
      const header = await screen.findByTestId("cardHeader");

      expect(thumbnail).toHaveAttribute("src", details.thumbnail);
      expect(header).toHaveTextContent(
        `${details.firstName} ${details.lastName}`
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("No details returned", () => {
    beforeEach(async () => {
      (useDetails as jest.Mock).mockReturnValue(null);
    });

    it("Given useDetails returns null, component does not render", async () => {
      const { container } = render(
        <MemoryRouter>
          <Display />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
