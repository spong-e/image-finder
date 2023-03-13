import { useContext } from "react";
import { ACTION_TYPES } from "./constants";
import { DetailsDispatchContext } from "./DetailsProvider";

const useDetailsActions = () => {
  const detailsDispatchContext = useContext(DetailsDispatchContext);
  if (!detailsDispatchContext)
    throw new Error(
      "No DetailsDispatchContext.Provider found when calling useGridItemContext."
    );

  const set = (details: Details) => {
    detailsDispatchContext({
      type: ACTION_TYPES.SET_DETAILS,
      payload: details,
    });
  };

  return { set };
};

export default useDetailsActions;
