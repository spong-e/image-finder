interface DetailsState {
  details: Details;
}

interface Details {
  firstName: string;
  surname: string;
  topic: string;
  thumbnail: string;
}

interface DetailsAction {
  type: string;
  payload: Details;
}
