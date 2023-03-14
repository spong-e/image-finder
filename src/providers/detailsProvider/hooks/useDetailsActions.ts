import { useContext } from "react";

import { ACTION_TYPES } from "../constants";
import { DetailsDispatchContext } from "../context";

const useDetailsActions = () => {
  const detailsDispatchContext = useContext(DetailsDispatchContext);
  if (!detailsDispatchContext)
    throw new Error(
      "No DetailsDispatchContext.Provider found when calling useDetailsActions."
    );

  const setDetails = async (details: Details) => {
    detailsDispatchContext({
      type: ACTION_TYPES.SET_DETAILS,
      payload: details,
    });
  };

  return { setDetails };
};

export default useDetailsActions;
