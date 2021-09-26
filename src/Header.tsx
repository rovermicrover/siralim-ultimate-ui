import React from "react";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Theme } from "@mui/material/styles";

interface IHeaderProps {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
}

export default function Header({ isNavOpen, setIsNavOpen }: IHeaderProps) {
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open nav"
          onClick={() => toggleNav()}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="h1" style={{ padding: "0.5em" }}>
          Siralim Ultimate Unofficial Codex
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
