import { MemoryRouter } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { ROUTES } from "../../constants";
import { useUnsplash } from "../../hooks";
import { useDetails, useDetailsActions } from "../../providers";
import Search from "../Search";

import "@testing-library/jest-dom";

const details: Details = {
  firstName: "Test",
  lastName: "User",
  thumbnail: "http://tempuri/cars/1",
  topic: "cars",
};

const mockedNavigate = jest.fn();

const mockedSetDetails = jest.fn();

const mockDetailsActions = {
  setDetails: (details: Details) => mockedSetDetails(details),
};

jest.mock("../../providers");
jest.mock("../../hooks");

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigate,
}));

describe.only("Search component", () => {
  describe("Component renders as expected when searching", () => {
    beforeEach(async () => {
      (useDetailsActions as jest.Mock).mockReturnValue(mockDetailsActions);
      (useDetails as jest.Mock).mockReturnValue(details);
      (useUnsplash as jest.Mock).mockImplementation(() => {
        const isSearching = true;
        const photo = null;
        const isError = false;
        return [isSearching, photo, isError] as const;
      });
    });
    it("When component loads, shows 'searching' message and renders as expected", async () => {
      const { container } = render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("Component renders as expected when error returned", () => {
    beforeEach(async () => {
      (useDetailsActions as jest.Mock).mockReturnValue(mockDetailsActions);
      (useDetails as jest.Mock).mockReturnValue(details);
      (useUnsplash as jest.Mock).mockImplementation(() => {
        const isSearching = false;
        const photo = null;
        const isError = true;
        return [isSearching, photo, isError] as const;
      });
    });
    it("When component loads, shows 'error' message and renders as expected", async () => {
      const { container } = render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("Component renders as expected when searching complete", () => {
    beforeEach(async () => {
      (useDetailsActions as jest.Mock).mockReturnValue(mockDetailsActions);
      (useDetails as jest.Mock).mockReturnValue(details);
      (useUnsplash as jest.Mock).mockImplementation(
        (topic: string, page: number) => {
          const isSearching = false;
          const photo = `http://tempuri/${topic}/${page}`;
          const isError = false;
          return [isSearching, photo, isError] as const;
        }
      );
    });

    it("When component loads, shows imageu and renders as expected", async () => {
      const { container } = render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      const imageWrapper = await screen.findByTestId("imageElement");

      const image = imageWrapper.firstChild as HTMLImageElement;

      expect(image).toHaveAttribute("src", `http://tempuri/${details.topic}/1`);

      expect(container).toMatchSnapshot();
    });

    it("After component loaded, clicking on decline generates a new image", async () => {
      const { container } = render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      const imageWrapper = await screen.findByTestId("imageElement");

      const image = imageWrapper.firstChild as HTMLImageElement;

      expect(image).toHaveAttribute("src", `http://tempuri/${details.topic}/1`);

      expect(container).toMatchSnapshot();

      const button = await screen.findByTestId("declineBtn");

      fireEvent.click(button);

      expect(image).toHaveAttribute("src", `http://tempuri/${details.topic}/2`);

      expect(container).toMatchSnapshot();
    });

    it("After component loaded, clicking on accept dispatches action and navigates to display", async () => {
      const { container } = render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      );

      const button = await screen.findByTestId("acceptBtn");

      fireEvent.click(button);

      expect(container).toMatchSnapshot();

      expect(mockedSetDetails).toHaveBeenCalledWith(details);

      expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.DISPLAY);
    });
  });
});
