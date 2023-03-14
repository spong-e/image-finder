import { useContext } from "react";

import { DetailsContext } from "../context";

const useDetails = () => {
  const detailsContext = useContext(DetailsContext);
  if (!detailsContext)
    throw new Error(
      "No DetailsContext.Provider found when calling useDetails."
    );

  const { details } = detailsContext;

  return details;
};

export default useDetails;
