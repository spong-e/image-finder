import React, { Dispatch, ReactNode } from "react";

import { renderHook, waitFor } from "@testing-library/react";

import { useUnsplash } from "../../../../hooks";
import { unsplashSearch } from "../../../../hooks/unsplashSearch";
import { ACTION_TYPES } from "../../constants";
import { DetailsDispatchContext } from "../../context";
import useDetailsActions from "../useDetailsActions";

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

const dispatch: Dispatch<DetailsAction> = jest.fn();

const DetailsContextProvider = ({ children }: DetailsProviderProps) => (
  <DetailsDispatchContext.Provider value={dispatch}>
    {children}
  </DetailsDispatchContext.Provider>
);

const wrapper = ({ children }: WrapperProps) => (
  <DetailsContextProvider>{children}</DetailsContextProvider>
);

describe("useDetailsActions", () => {
  it("When setDetails called, action dispatched with expected params", async () => {
    //jest.useFakeTimers();

    const details: Details = {
      firstName: "Unit",
      lastName: "Test",
      thumbnail: "http://tempuri/thumb",
      topic: "Unit testing",
    };

    jest.spyOn(React, "useContext").mockImplementation(() => dispatch);

    const { result } = renderHook(() => useDetailsActions(), { wrapper });

    result.current.setDetails(details);

    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.SET_DETAILS,
      payload: details,
    });
  });

  it("When setDetails called and no context, error thrown", async () => {
    jest.spyOn(React, "useContext").mockImplementation(() => undefined);

    expect(() => renderHook(() => useDetailsActions(), { wrapper })).toThrow(
      "No DetailsDispatchContext.Provider found when calling useDetailsActions."
    );
  });
});
