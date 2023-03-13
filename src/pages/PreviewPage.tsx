import { FunctionComponent } from "react";
import { Search } from "../components";

interface PreviewPageProps {}

const PreviewPage: FunctionComponent<PreviewPageProps> = () => {
  return (
    <>
      <h2>PreviewPage page</h2>
      <Search />
    </>
  );
};

export default PreviewPage;
