import React from "react";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Tooltip } from "@mui/material";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { MuiRouterLink } from "./components/MuiRouterLink";

import CreaturesPng from "./images/nav/creatures.png";
import TraitsPng from "./images/nav/traits.png";
import SpellsPng from "./images/nav/spells.png";
import KlassesPng from "./images/nav/classes.png";
import RacesPng from "./images/nav/races.png";
import StatusEffectsPng from "./images/nav/status_effects.png";

import GitLightSvg from "./images/nav/github/favicon-light.svg";
import GitDarkSvg from "./images/nav/github/favicon-dark.svg";

import AuthorJpg from "./images/nav/author.jpg";

import SteamJpg from "./images/nav/steam.jpg";

import SourceIcon from "@mui/icons-material/Source";

interface INavProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
  isNavOpen: boolean;
}

export default function Nav({
  isDarkTheme,
  setIsDarkTheme,
  isNavOpen,
}: INavProps) {
  const themeText = isDarkTheme ? "Dark Theme" : "Light Theme";
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const iconWidth = isMd ? 32 : 24;
  const itemTextStyle = { lineHeight: `${iconWidth}px`, margin: "0px" };
  const drawerWidth = isNavOpen ? 240 : iconWidth + 26;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List
        sx={{
          whiteSpace: "nowrap",
          overflowX: "hidden",
        }}
      >
        {[
          ["Creatures", CreaturesPng],
          ["Traits", TraitsPng],
          ["Spells", SpellsPng],
          ["Classes", KlassesPng],
          ["Races", RacesPng],
          ["Status-Effects", StatusEffectsPng],
        ].map(([text, icon]) => (
          <ListItem
            key={text}
            component={MuiRouterLink}
            to={`/${text.toLowerCase()}`}
          >
            <ListItemIcon aria-hidden="true">
              <Tooltip
                title={isNavOpen ? "" : text}
                describeChild
                arrow
                placement="right"
              >
                <img src={icon} width={iconWidth} alt={text} />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={text} sx={itemTextStyle} />
          </ListItem>
        ))}
        {[
          [
            "Source Code",
            "https://github.com/rovermicrover/siralim-ultimate-ui",
            isDarkTheme ? GitDarkSvg : GitLightSvg,
          ],
          ["Author", "https://github.com/rovermicrover/", AuthorJpg],
          [
            "SU on Steam",
            "https://store.steampowered.com/app/1289810/Siralim_Ultimate/",
            SteamJpg,
          ],
        ].map(([text, url, img]) => (
          <ListItem
            component={Link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon aria-hidden="true">
              <Tooltip title={isNavOpen ? "" : text} arrow placement="right">
                <img src={img} width={iconWidth} alt={text} />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={text} sx={itemTextStyle} />
          </ListItem>
        ))}

        {[
          [
            "Source 1",
            "https://docs.google.com/spreadsheets/d/1RYRvKTCLLJxXrZ_7OOjG8j98L_fjE5KNHtLG4wHn9Xw/edit#gid=0",
          ],
          [
            "Source 2",
            "https://docs.google.com/spreadsheets/d/1qvWwf1fNB5jN8bJ8dFGAVzC7scgDCoBO-hglwjTT4iY/edit#gid=0",
          ],
          [
            "Source 3",
            "https://docs.google.com/spreadsheets/d/1hlS4iNB6Uj-KVKzmFEygZkeTfX-U73B9R2lXdV3d5I8/edit#gid=0",
          ],
        ].map(([text, url]) => (
          <ListItem
            component={Link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon aria-hidden="true">
              <Tooltip title={isNavOpen ? "" : text} arrow placement="right">
                <SourceIcon sx={{ fontSize: `${iconWidth}px` }} />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={text} sx={itemTextStyle} />
          </ListItem>
        ))}

        <ListItem>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    inputProps={{ role: "switch" }}
                    size={isMd ? "medium" : "small"}
                    checked={isDarkTheme}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setIsDarkTheme(event.target.checked)
                    }
                  />
                }
                label="Dark Theme"
              />
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    </Drawer>
  );
}
