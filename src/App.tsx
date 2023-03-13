import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { NavBar } from "./components";
import { DisplayPage, EntryPage, HomePage, PreviewPage } from "./pages";
import { DetailsProvider } from "./providers";

function App() {
  return (
    <>
      <DetailsProvider>
        <Container maxWidth="sm">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Image Finder
            </Typography>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/entry" element={<EntryPage />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/display" element={<DisplayPage />} />
            </Routes>
          </Box>
        </Container>
      </DetailsProvider>
    </>
  );
}

export default App;
