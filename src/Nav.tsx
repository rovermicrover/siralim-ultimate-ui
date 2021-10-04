import React from "react";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { SvgIconTypeMap, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { MuiRouterLink } from "./components/MuiRouterLink";

import CreaturesPng from "./images/nav/creatures.png";
import TraitsPng from "./images/nav/traits.png";
import SpellsPng from "./images/nav/spells.png";
import StatusEffectsPng from "./images/nav/status_effects.png";

import GitLightSvg from "./images/nav/github/favicon-light.svg";
import GitDarkSvg from "./images/nav/github/favicon-dark.svg";

import AuthorJpg from "./images/nav/author.jpg";

import SteamJpg from "./images/nav/steam.jpg";

import SourceIcon from "@mui/icons-material/Source";
import { OverridableComponent } from "@mui/material/OverridableComponent";

class RouteData {
  public url: string;
  public title: string;
  public iconComponent:
    | string
    | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  constructor(data: RouteData) {
    this.url = data.url;
    this.title = data.title;
    this.iconComponent = data.iconComponent;
  }
}

interface IIconLinkData {
  title: string;
  url: string;
  icon: JSX.Element;
}

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
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const iconWidth = isMd ? 32 : 24;
  const itemTextStyle = { lineHeight: `${iconWidth}px`, margin: "0px" };
  const drawerWidth = isNavOpen ? 240 : iconWidth + 26;

  function routeDataToIconLinks(routeDatas: RouteData[]): IIconLinkData[] {
    return routeDatas.map((data) => {
      let icon = undefined;
      if (typeof data.iconComponent === "string") {
        icon = (
          <img src={data.iconComponent} width={iconWidth} alt={data.title} />
        );
      }
      // Assume an SVG Icon
      else {
        icon = <data.iconComponent sx={{ fontSize: `${iconWidth}px` }} />;
      }
      return { title: data.title, url: data.url, icon: icon };
    });
  }

  const routeData: RouteData[] = [
    new RouteData({
      url: "/creatures",
      title: "Creatures",
      iconComponent: CreaturesPng,
    }),
    new RouteData({
      url: "/traits",
      title: "Traits",
      iconComponent: TraitsPng,
    }),
    new RouteData({
      url: "/spells",
      title: "Spells",
      iconComponent: SpellsPng,
    }),
    new RouteData({
      url: "/status-effects",
      title: "Status Effects",
      iconComponent: StatusEffectsPng,
    }),
    new RouteData({
      url: "https://github.com/rovermicrover/siralim-ultimate-ui",
      title: "Source Code",
      iconComponent: isDarkTheme ? GitDarkSvg : GitLightSvg,
    }),
    new RouteData({
      url: "https://github.com/rovermicrover/",
      title: "Author",
      iconComponent: AuthorJpg,
    }),
    new RouteData({
      url: "https://store.steampowered.com/app/1289810/Siralim_Ultimate/",
      title: "SU on Steam",
      iconComponent: SteamJpg,
    }),
    new RouteData({
      url: "https://docs.google.com/spreadsheets/d/1RYRvKTCLLJxXrZ_7OOjG8j98L_fjE5KNHtLG4wHn9Xw/edit#gid=0",
      title: "Source 1",
      iconComponent: SourceIcon,
    }),
    new RouteData({
      url: "https://docs.google.com/spreadsheets/d/1qvWwf1fNB5jN8bJ8dFGAVzC7scgDCoBO-hglwjTT4iY/edit#gid=0",
      title: "Source 2",
      iconComponent: SourceIcon,
    }),
    new RouteData({
      url: "https://docs.google.com/spreadsheets/d/1hlS4iNB6Uj-KVKzmFEygZkeTfX-U73B9R2lXdV3d5I8/edit#gid=0",
      title: "Source 3",
      iconComponent: SourceIcon,
    }),
  ];

  const iconLinks: IIconLinkData[] = routeDataToIconLinks(routeData);

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
      <nav>
        <List
          sx={{
            whiteSpace: "nowrap",
            overflowX: "hidden",
          }}
        >
          {iconLinks.map((data) => {
            return (
              <li key={data.title}>
                <ListItem
                  button
                  key={data.title}
                  component={MuiRouterLink}
                  title={data.title}
                  to={data.url}
                >
                  <ListItemIcon aria-hidden="true">
                    <Tooltip
                      title={isNavOpen ? "" : data.title}
                      describeChild
                      arrow
                      placement="right"
                    >
                      {data.icon}
                    </Tooltip>
                  </ListItemIcon>
                  {isNavOpen && (
                    <ListItemText primary={data.title} sx={itemTextStyle} />
                  )}
                </ListItem>
              </li>
            );
          })}

          <ListItem sx={{ padding: "0px" }}>
            {
              <FormControlLabel
                sx={{ paddingLeft: "11px" }}
                control={
                  <Switch
                    sx={{ marginRight: "14px" }}
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
            }
          </ListItem>
        </List>
      </nav>
    </Drawer>
  );
}
