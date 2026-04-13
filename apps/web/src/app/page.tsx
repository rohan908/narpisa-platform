import Box from "@mui/material/Box";

import GlassNav from "@/components/glass-nav";
import MineralHero from "@/components/frames/mineral-hero";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundImage: "url('/landingimage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <GlassNav />
      {/* <MineralHero /> */}
    </Box>
  );
}
