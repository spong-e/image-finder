import { Route, Routes } from "react-router-dom";

import { Display, EntryForm, Search } from "./components";
import { ROUTES } from "./constants";
import { DetailsProvider } from "./providers";

function App() {
  return (
    <DetailsProvider>
      <div className="page">
        <header>
          <h1>Image Finder</h1>
        </header>

        <main>
          <div className="container">
            <Routes>
              <Route path={ROUTES.ENTRY} element={<EntryForm />} />
              <Route path={ROUTES.SEARCH} element={<Search />} />
              <Route path={ROUTES.DISPLAY} element={<Display />} />
            </Routes>
          </div>
        </main>
        <footer>&copy;Image Finder</footer>
      </div>
    </DetailsProvider>
  );
}

export default App;
