import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

import { ROUTES } from "../constants";
import { useDetails } from "../providers";

const Display: FunctionComponent = () => {
  const details = useDetails();

  if (!details) return null;

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
