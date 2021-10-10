import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MuiSafeLink } from "../components/MuiRouterLink";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

export default function Home() {
  return (
    <Box sx={{ padding: "2em" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome To The Siralim Ultimate Unofficial Codex
      </Typography>
      <Typography component="p" gutterBottom>
        This site contains search and filterable game data from the video game{" "}
        <MuiSafeLink href="https://store.steampowered.com/app/1289810/Siralim_Ultimate/">
          Siralim Ultimate
        </MuiSafeLink>{" "}
        by{" "}
        <MuiSafeLink href="https://www.thylacinestudios.com/">
          Thylacine Studios
        </MuiSafeLink>
        .
      </Typography>
      <Typography component="p" gutterBottom>
        The top links in the left hand nav will take you to different types of
        game data.
      </Typography>
      <Typography component="p" gutterBottom>
        On each data page you can click this icon{" "}
        <FilterListIcon sx={{ verticalAlign: "bottom" }} /> in the topo left of
        the page to open up the filters menu. You can then click this icon{" "}
        <AddIcon sx={{ verticalAlign: "bottom" }} color="success" /> to add a
        new filter.
      </Typography>
      <Typography component="p" variant="subtitle2" gutterBottom>
        This site is no way affiliated with or approved by Thylacine Studios.
      </Typography>
    </Box>
  );
}
