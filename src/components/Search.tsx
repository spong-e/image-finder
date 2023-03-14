import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Image, Loader } from "semantic-ui-react";

import { ROUTES } from "../constants";
import { useUnsplash } from "../hooks";
import { useDetails, useDetailsActions } from "../providers";

const Search: FunctionComponent = () => {
  const navigate = useNavigate();
  const details = useDetails();
  const { setDetails } = useDetailsActions();
  const [page, setPage] = useState<number>(1);
  const [isSearching, photo] = useUnsplash(details.topic, page);

  const decline = () => {
    setPage(page + 1);
  };

  const accept = () => {
    if (!photo) return;
    const newDetails: Details = { ...details, thumbnail: photo };

    setDetails(newDetails).then(() => navigate(ROUTES.DISPLAY));
  };

  return (
    <>
      <Card>
        {!isSearching && (
          <Card.Content>
            <Loader active inline size="massive">
              Searching...
            </Loader>
          </Card.Content>
        )}
        {photo && (
          <>
            {" "}
            <Card.Content>
              <Image src={photo} wrapped ui={true} />
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={() => accept()}>
                  Accept
                </Button>
                <Button basic color="red" onClick={() => decline()}>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </>
        )}
      </Card>

      <Link to={ROUTES.ENTRY}>Start again</Link>
    </>
  );
};

export default Search;
