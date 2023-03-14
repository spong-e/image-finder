import { Route, Routes } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

import { Display, EntryForm, Search } from "./components";
import { ROUTES } from "./constants";
import { DetailsProvider } from "./providers";

function App() {
  return (
    <DetailsProvider>
      <Container>
        <Header size="huge">Image Search</Header>
        <Routes>
          <Route path={ROUTES.ENTRY} element={<EntryForm />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.DISPLAY} element={<Display />} />
        </Routes>
      </Container>
    </DetailsProvider>
  );
}

export default App;
