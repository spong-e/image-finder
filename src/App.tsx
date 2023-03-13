import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { NavBar } from "./components";
import { DisplayPage, EntryPage, HomePage, PresentPage } from "./pages";

function App() {
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Image Finder
          </Typography>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/entry" element={<EntryPage />} />
            <Route path="/present" element={<PresentPage />} />
            <Route path="/display" element={<DisplayPage />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;
