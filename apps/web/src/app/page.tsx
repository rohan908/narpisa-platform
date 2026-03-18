import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        py: { xs: 6, md: 9 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0,1.6fr) minmax(300px,0.9fr)",
              },
            }}
          >
            <Paper
              sx={{
                borderRadius: 8,
                bgcolor: "secondary.main",
                color: "common.white",
                px: { xs: 3, md: 5 },
                py: { xs: 4, md: 5 },
              }}
            >

                <Box>
                  <Typography
                    component="h1"
                    variant="h2"
                    sx={{ maxWidth: 720, fontSize: { xs: "2.6rem", md: "4rem" } }}
                  >
                    Source-led document intelligence for mineral value addition.
                  </Typography>
                  <Typography
                    variant="h6"
                    color="rgba(255,255,255,0.78)"
                    sx={{ mt: 2, maxWidth: 720, fontWeight: 400, lineHeight: 1.65 }}
                  >
                    Register source links, parse PDFs on demand, and retain only
                    the structured records needed for research, policymaking, and
                    trading workflows across Namibia and future African market
                    expansion.
                  </Typography>
                </Box>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    component="a"
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowOutwardRoundedIcon />}
                  >
                    Connect web to Vercel
                  </Button>
                  <Button
                    component="a"
                    href="https://render.com"
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    color="inherit"
                    endIcon={<ArrowOutwardRoundedIcon />}
                    sx={{
                      borderColor: "rgba(255,255,255,0.25)",
                      color: "white",
                    }}
                  >
                    Deploy worker on Render
                  </Button>
                </Stack>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0,1.2fr) minmax(0,1fr)",
              },
            }}
          >
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
