import React from "react";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
    >
      <Typography variant="h6" component="h1" style={{ padding: "0.5em" }}>
        Siralim Ultimate Unofficial Codex
      </Typography>
    </AppBar>
  );
}
