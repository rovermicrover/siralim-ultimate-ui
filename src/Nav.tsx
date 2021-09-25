import React from "react";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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


interface INavProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
  drawerWidth: number;
}

export default function Nav({ isDarkTheme, setIsDarkTheme, drawerWidth }: INavProps) {
  const themeText = isDarkTheme ? "Dark Theme" : "Light Theme";

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
          whiteSpace: 'nowrap', 
          overflowX: 'hidden',
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
            <ListItemIcon><img src={icon} width={32}/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        sx={{
          whiteSpace: 'nowrap', 
          overflowX: 'hidden',
        }}
      >
        <ListItem
          component={Link}
          href="https://github.com/rovermicrover/siralim-ultimate-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemIcon><img src={isDarkTheme ? GitDarkSvg : GitLightSvg} width={32}/></ListItemIcon>
          <ListItemText primary="Source Code" />
        </ListItem>
        <ListItem
          component={Link}
          href="https://github.com/rovermicrover/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemIcon><img src={AuthorJpg} width={32}/></ListItemIcon>
          <ListItemText primary="Author" />
        </ListItem>
        <ListItem
          component={Link}
          href="https://store.steampowered.com/app/1289810/Siralim_Ultimate/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemIcon><img src={SteamJpg} width={32}/></ListItemIcon>
          <ListItemText primary="SU On Steam" />
        </ListItem>
        <ListItem>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDarkTheme}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setIsDarkTheme(event.target.checked)
                    }
                  />
                }
                label={themeText}
              />
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    </Drawer>
  );
}
