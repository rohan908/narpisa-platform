import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import AfricaMap from "./africa-map";

export default function AfricaMapFrame() {
  return (
    <Box
      component="section"
      aria-label="Africa coverage map"
      sx={{
        position: "relative",
        zIndex: 1,
        bgcolor: "background.default",
        pt: { xs: 4, md: 8 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <AfricaMap sx={{ maxWidth: 720, mx: "auto" }} />
      </Container>
    </Box>
  );
}
