import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Message } from "semantic-ui-react";

import { ROUTES } from "../constants";
import { useDetails } from "../providers";

const Display: FunctionComponent = () => {
  const details = useDetails();

  if (
    !details ||
    !details.firstName ||
    !details.lastName ||
    !details.thumbnail
  ) {
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

  const { thumbnail, firstName, lastName } = details;

  return (
    <>
      <Card>
        <Card.Content>
          <Image
            src={thumbnail}
            floated="right"
            size="small"
            data-testid="cardThumbnail"
          />

          <Card.Header data-testid="cardHeader">
            {firstName} {lastName}
          </Card.Header>
        </Card.Content>
      </Card>

      <Link to={ROUTES.ENTRY}>Start again</Link>
    </>
  );
};

export default Display;
