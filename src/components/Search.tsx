import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Image, Loader, Message } from "semantic-ui-react";

import { ROUTES } from "../constants";
import { useUnsplash } from "../hooks";
import { useDetails, useDetailsActions } from "../providers";

const Search: FunctionComponent = () => {
  const navigate = useNavigate();
  const details = useDetails();
  const { setDetails } = useDetailsActions();
  const [page, setPage] = useState<number>(1);
  const [isSearching, photo, isError] = useUnsplash(details.topic, page);

  const decline = () => {
    setPage(page + 1);
  };

  const accept = () => {
    const newDetails: Details = { ...details, thumbnail: photo! };
    setDetails(newDetails);
    navigate(ROUTES.DISPLAY);
  };

  if (!details || isError) {
    return (
      <>
        <Message negative>
          <Message.Header>
            Something has gone wrong with your search
          </Message.Header>
          <Link to={ROUTES.ENTRY}>Start again</Link>
        </Message>
      </>
    );
  }

  return (
    <>
      <Card>
        {isSearching && (
          <Card.Content>
            <Loader active inline size="massive" data-testid="searchingSpinner">
              Searching...
            </Loader>
          </Card.Content>
        )}
        {photo && (
          <>
            {" "}
            <Card.Content>
              <Image src={photo} wrapped ui={true} data-testid="imageElement" />
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  onClick={() => accept()}
                  data-testid="acceptBtn"
                >
                  Accept
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => decline()}
                  data-testid="declineBtn"
                >
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
