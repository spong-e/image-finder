import produce from "immer";
import { Reducer } from "react";
import { ACTION_TYPES } from "./constants";

const detailsReducer: Reducer<DetailsState, DetailsAction> = produce(
  (draft: DetailsState, action: DetailsAction) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_TYPES.SET_DETAILS: {
        draft.details = payload;

        return;
      }

      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
);

export default detailsReducer;
