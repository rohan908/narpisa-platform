import Box from "@mui/material/Box";

import GlassNav from "@/components/glass-nav";
import MineralHero from "@/components/mineral-hero";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        /* One viewport tall: nav is fixed and does not reserve flow space */
        height: "100dvh",
        maxHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      <GlassNav />
      <MineralHero />
    </Box>
  );
}
