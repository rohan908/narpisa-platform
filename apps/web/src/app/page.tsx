"use client";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import Link from "next/link";

import HalftoneHero from "@/components/halftone-hero";

export default function Home() {
  const theme = useTheme();

  return (
    <HalftoneHero
      videoSrc="/spitzkoppe_video.mp4"
      posterSrc="/Spitzkoppe.jpg"
      dotSpacing={8}
      colorDark={theme.palette.primary.main}
      colorLight={theme.palette.grey[100]}
      vignette={0.0}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
                  bgcolor: (t) => alpha(t.palette.background[700], 0.82),
                  backdropFilter: "blur(12px)",
                  color: "common.white",
                  px: { xs: 3, md: 5 },
                  py: { xs: 4, md: 5 },
                }}
              >
                <Box>
                  <Typography
                    component="h1"
                    variant="h2"
                    sx={{
                      maxWidth: 720,
                      fontSize: { xs: "2.6rem", md: "4rem" },
                    }}
                  >
                    NaRPISA Platform
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      maxWidth: 720,
                      fontWeight: 400,
                      lineHeight: 1.65,
                      color: (t) => alpha(t.palette.common.white, 0.78),
                    }}
                  >
                    Source-led document intelligence for mineral value addition
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mt: 3 }}
                >
                  <Link href="/data_input">
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowOutwardRoundedIcon />}
                    >
                      Open PDF link tester
                    </Button>
                  </Link>
                </Stack>
              </Paper>
            </Box>

            <Box sx={{ display: "grid", gap: 3 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  bgcolor: (t) => alpha(t.palette.background.default, 0.85),
                  backdropFilter: "blur(8px)",
                  borderColor: (t) => alpha(t.palette.background[200], 0.6),
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5">Quick testing ground</Typography>
                  <Typography color="text.secondary">
                    Use the temporary data input page to try PDF source links
                    and test input flows before wiring the full ingestion
                    pipeline.
                  </Typography>
                  <Box>
                    <Link href="/data_input">
                      <Button variant="contained">
                        Open PDF link tester
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Stack>
        </Container>
      </Box>
    </HalftoneHero>
  );
}
