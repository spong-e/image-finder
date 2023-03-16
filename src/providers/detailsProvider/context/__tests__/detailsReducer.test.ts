import produce from "immer";

import { render } from "@testing-library/react";

import { ACTION_TYPES } from "../../constants";
import detailsReducer from "../DetailsReducer";

describe("Details reducer", () => {
  describe("Set Details", () => {
    it("Should set details to values passed in", () => {
      const initialState: DetailsState = {
        details: {
          firstName: "",
          lastName: "",
          topic: "",
          thumbnail: "",
        },
      };

      const storeState = detailsReducer(initialState, {
        type: ACTION_TYPES.SET_DETAILS,
        payload: {
          firstName: "Unit",
          lastName: "Test",
          topic: "unit testing",
          thumbnail: "http://tempuri/thumbnail",
        },
      });

      const newState = produce(initialState, (draftState) => {
        draftState.details = {
          firstName: "Unit",
          lastName: "Test",
          topic: "unit testing",
          thumbnail: "http://tempuri/thumbnail",
        };
      });

      expect(storeState).toEqual(newState);
    });
  });

  describe("Invalid action", () => {
    it("Should throw an error", () => {
      const initialState: DetailsState = {
        details: {
          firstName: "",
          lastName: "",
          topic: "",
          thumbnail: "",
        },
      };

      expect(() =>
        detailsReducer(initialState, {
          type: "JUNK_ACTION",
          payload: {
            firstName: "Unit",
            lastName: "Test",
            topic: "unit testing",
            thumbnail: "http://tempuri/thumbnail",
          },
        })
      ).toThrowError("Unhandled action type: JUNK_ACTION");
    });
  });
});
