import { FunctionComponent } from "react";
import { EntryForm } from "../components";

interface EntryPageProps {}

const EntryPage: FunctionComponent<EntryPageProps> = () => {
  return (
    <>
      <h2>Entry page</h2>
      <EntryForm />
    </>
  );
};

export default EntryPage;
