import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Message } from "semantic-ui-react";

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
      <div className="card">
        <img
          src={thumbnail}
          alt="Thumbnail of selected result"
          className="display"
          data-testid="cardThumbnail"
        />
        <div className="card-container">
          <h4>
            <b data-testid="cardHeader">
              {firstName} {lastName}
            </b>
          </h4>
        </div>
        <div className="clear"></div>
      </div>

      <Link to={ROUTES.ENTRY}>Start again</Link>
    </>
  );
};

export default Display;
