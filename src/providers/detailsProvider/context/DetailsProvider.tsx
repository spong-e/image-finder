import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  useReducer,
} from "react";

import detailsReducer from "./DetailsReducer";

const DetailsContext = createContext<DetailsState | undefined>(undefined);
const DetailsDispatchContext = createContext<
  Dispatch<DetailsAction> | undefined
>(undefined);

interface DetailsProviderProps {
  children: ReactNode;
}

const DetailsProvider: FunctionComponent<DetailsProviderProps> = ({
  children,
}) => {
  const initialState: DetailsState = {
    details: {
      firstName: "",
      lastName: "",
      topic: "",
      thumbnail: "",
    },
  };

  const [state, dispatch] = useReducer(detailsReducer, initialState);

  return (
    <DetailsContext.Provider value={state}>
      <DetailsDispatchContext.Provider value={dispatch}>
        {children}
      </DetailsDispatchContext.Provider>
    </DetailsContext.Provider>
  );
};

export { DetailsContext, DetailsDispatchContext, DetailsProvider };
