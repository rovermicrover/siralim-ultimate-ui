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

const drawerWidth = 240;

interface INavProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
}

export default function Nav({ isDarkTheme, setIsDarkTheme }: INavProps) {
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
      <List>
        {[
          "Creatures",
          "Traits",
          "Spells",
          "Classes",
          "Races",
          "Status-Effects",
        ].map((text) => (
          <ListItem
            key={text}
            component={MuiRouterLink}
            to={`/${text.toLowerCase()}`}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          component={Link}
          href="https://github.com/rovermicrover/siralim-ultimate-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemText primary="Source Code" />
        </ListItem>
        <ListItem
          component={Link}
          href="https://github.com/rovermicrover/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemText primary="Author" />
        </ListItem>
        <ListItem
          component={Link}
          href="https://store.steampowered.com/app/1289810/Siralim_Ultimate/"
          target="_blank"
          rel="noopener noreferrer"
        >
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
