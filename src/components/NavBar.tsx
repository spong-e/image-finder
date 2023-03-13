import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/entry">Entry</Link>
        </li>
        <li>
          <Link to="/preview">Preview</Link>
        </li>
        <li>
          <Link to="/display">Display</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
