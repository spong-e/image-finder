interface DetailsProviderProps {
  children: ReactNode;
}

interface DetailsState {
  details: Details;
}

interface Details {
  firstName: string;
  lastName: string;
  topic: string;
  thumbnail: string;
}

interface DetailsAction {
  type: string;
  payload: Details;
}
