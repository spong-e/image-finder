import * as React from "react";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import detailsReducer from "./DetailsReducer";

const DetailsContext = createContext<DetailsState | undefined>(undefined);

const DetailsDispatchContext = createContext<
  Dispatch<DetailsAction> | undefined
>(undefined);

interface DetailsProviderProps {
  children: ReactNode;
}

function DetailsProvider({ children }: DetailsProviderProps) {
  const initialState: DetailsState = {
    details: {
      firstName: "",
      surname: "",
      topic: "",
      thumbnail: "",
    },
  };

  const [state, dispatch] = useReducer(detailsReducer, initialState);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  const value = { state, dispatch };
  return (
    <DetailsContext.Provider value={state}>
      <DetailsDispatchContext.Provider value={dispatch}>
        <>
          {JSON.stringify(state, null, 2)}
          {children}
        </>
      </DetailsDispatchContext.Provider>
    </DetailsContext.Provider>
  );
}

export { DetailsProvider, DetailsContext, DetailsDispatchContext };
