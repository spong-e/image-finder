import { FunctionComponent, useContext } from "react";
import { DetailsContext } from "./DetailsProvider";

const useDetails = () => {
  const detailsContext = useContext(DetailsContext);
  if (!detailsContext)
    throw new Error(
      "No DetailsContext.Provider found when calling useGridItemContext."
    );

  const { details } = detailsContext;

  return details;
};

export default useDetails;
