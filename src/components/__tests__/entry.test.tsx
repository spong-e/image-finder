import { MemoryRouter } from "react-router-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";

import { ROUTES } from "../../constants";
import { useDetailsActions } from "../../providers";
import Entry from "../Entry";

import "@testing-library/jest-dom";

const details: Details = {
  firstName: "Test",
  lastName: "User",
  thumbnail: "",
  topic: "cars",
};

const mockedNavigate = jest.fn();

const mockedSetDetails = jest.fn();

const mockDetailsActions = {
  setDetails: (details: Details) => mockedSetDetails(details),
};

jest.mock("../../providers");

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigate,
}));

describe("Entry component", () => {
  beforeEach(async () => {
    (useDetailsActions as jest.Mock).mockReturnValue(mockDetailsActions);
  });
  describe("Component renders as expected", () => {
    it("When component loads, renders as expect", async () => {
      const { container } = render(
        <MemoryRouter>
          <Entry />
        </MemoryRouter>
      );

      expect(container).toMatchSnapshot();
    });
  });

  it("When form completed and submit clicked, setDetails function is called", async () => {
    const { container } = render(
      <MemoryRouter>
        <Entry />
      </MemoryRouter>
    );

    await act(async () => {
      const firstNameInput = await setInputValue(
        "firstNameInput",
        details.firstName
      );

      const lastNameInput = await setInputValue(
        "lastNameInput",
        details.lastName
      );

      const topicInput = await clickRadioInput("topic_carsRadio");

      expect(firstNameInput).toHaveValue(details.firstName);
      expect(lastNameInput).toHaveValue(details.lastName);
      expect(topicInput.checked).toEqual(true);
    });
    expect(container).toMatchSnapshot();

    await act(async () => {
      const submitButtonWrapper = await screen.findByTestId("submitBtn");

      fireEvent.click(submitButtonWrapper);

      await wait();

      expect(mockedSetDetails).toHaveBeenCalledWith(details);

      expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.SEARCH);
    });
  });
});

async function setInputValue(testId: string, value: string) {
  const inputWrapper = await screen.findByTestId(testId);

  const input = inputWrapper.firstChild as HTMLInputElement;

  fireEvent.change(input, {
    target: { value: value },
  });

  return input;
}

async function clickRadioInput(testId: string) {
  const inputWrapper = await screen.findByTestId(testId);

  const input = inputWrapper.firstChild as HTMLInputElement;

  userEvent.click(input);

  return input;
}
