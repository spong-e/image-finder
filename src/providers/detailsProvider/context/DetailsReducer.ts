import { Reducer } from "react";
import produce from "immer";

import { ACTION_TYPES } from "../constants";

const detailsReducer: Reducer<DetailsState, DetailsAction> = produce(
  (draft: DetailsState, action: DetailsAction) => {
    const { type, payload } = action;
    switch (type) {
      case ACTION_TYPES.SET_DETAILS: {
        draft.details = payload;

        return draft;
      }

      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
);

export default detailsReducer;
