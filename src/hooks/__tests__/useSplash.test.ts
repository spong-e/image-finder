import { act, renderHook, waitFor } from "@testing-library/react";

import { unsplashSearch } from "../unsplashSearch";
import useUnsplash from "../useUnsplash";

import * as response from "./response.json";

import "@testing-library/jest-dom";

jest.mock("../unsplashSearch");

jest.mock("../../providers");

describe("useUnsplash hooks", () => {
  describe("Details returned", () => {
    it("Given useUnsplash returns data, values returned as expected", async () => {
      jest.spyOn(unsplashSearch, "search").mockResolvedValue(response);

      const { result } = renderHook(() => useUnsplash("cars", 1));

      const [isSearching, photo, isError] = result.current;

      expect(isSearching).toBe(true);
      expect(photo).toBeUndefined();
      expect(isError).toBe(false);

      await waitFor(() => expect(result.current[1]).toBeTruthy(), {
        timeout: 3000,
      });

      const [isSearchingUpdate, photoUpdate, isErrorUpdate] = result.current;

      expect(isSearchingUpdate).toBe(false);
      expect(photoUpdate).toEqual("https://images.unsplash.com/small");
      expect(isErrorUpdate).toBe(false);
    });

    it("Given useUnsplash returns not data, component renders", async () => {
      jest.spyOn(unsplashSearch, "search").mockResolvedValue(null);

      const { result } = renderHook(() => useUnsplash("cars", 1));

      await waitFor(() => expect(result.current[2]).toBe(true), {
        timeout: 3000,
      });
    });
  });
});
