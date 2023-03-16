import React, { ReactNode } from "react";

import { renderHook } from "@testing-library/react";

import { DetailsContext } from "../../context";
import useDetails from "../useDetails";

import "@testing-library/jest-dom";

const state: DetailsState = {
  details: {
    firstName: "",
    lastName: "",
    topic: "",
    thumbnail: "",
  },
};

interface WrapperProps {
  children: ReactNode;
}

const DetailsContextProvider = ({ children }: DetailsProviderProps) => (
  <DetailsContext.Provider value={state}>{children}</DetailsContext.Provider>
);

const wrapper = ({ children }: WrapperProps) => (
  <DetailsContextProvider>{children}</DetailsContextProvider>
);

describe("useDetails", () => {
  it("Given useDetails returns data, values returned as expected", async () => {
    const detailsState: DetailsState = {
      details: {
        firstName: "Unit",
        lastName: "Test",
        thumbnail: "http://tempuri/thumb",
        topic: "Unit testing",
      },
    };

    jest.spyOn(React, "useContext").mockImplementation(() => detailsState);

    const { result } = renderHook(() => useDetails(), { wrapper });

    expect(result.current.firstName).toEqual("Unit");
    expect(result.current.lastName).toEqual("Test");
    expect(result.current.thumbnail).toEqual("http://tempuri/thumb");
    expect(result.current.topic).toEqual("Unit testing");
  });

  it("Given useDetails has no context, error thrown", async () => {
    jest.spyOn(React, "useContext").mockImplementation(() => undefined);

    expect(() => renderHook(() => useDetails(), { wrapper })).toThrow(
      "No DetailsContext.Provider found when calling useDetails."
    );
  });
});
