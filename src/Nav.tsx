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

class RouteData {
  constructor(
    public route: string,
    public title: string,
    public iconSrc: string
  ) {}
}

interface ISourceLinkData {
  title: string;
  url: string;
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

  function sourceLinksToIconLinks(links: ISourceLinkData[]): IIconLinkData[] {
    return links.map((link) => {
      const icon = <SourceIcon sx={{ fontSize: `${iconWidth}px` }} />;

      return { title: link.title, url: link.url, icon: icon };
    });
  }

  function routeDataToIconLinks(routeDatas: RouteData[]): IIconLinkData[] {
    return routeDatas.map((data) => {
      const icon = (
        <img src={data.iconSrc} width={iconWidth} alt={data.title} />
      );

      return { title: data.title, url: data.route, icon: icon };
    });
  }

  function externalLinkstoIconLinks(
    externalLinkData: RouteData[]
  ): IIconLinkData[] {
    return externalLinkData.map((data) => {
      const icon = (
        <img src={data.iconSrc} width={iconWidth} alt={data.title} />
      );

      return { title: data.title, url: data.route, icon: icon };
    });
  }

  const routeData: RouteData[] = [
    new RouteData("/creatures", "Creatures", CreaturesPng),
    new RouteData("/traits", "Traits", TraitsPng),
    new RouteData("/spells", "Spells", SpellsPng),
    new RouteData("/status-effects", "Status Effects", StatusEffectsPng),
  ];

  const externalLinkData = [
    new RouteData(
      "https://github.com/rovermicrover/siralim-ultimate-ui",
      "Source Code",
      isDarkTheme ? GitDarkSvg : GitLightSvg
    ),
    new RouteData("https://github.com/rovermicrover/", "Author", AuthorJpg),
    new RouteData(
      "https://store.steampowered.com/app/1289810/Siralim_Ultimate/",
      "SU on Steam",
      SteamJpg
    ),
  ];

  const sourceData = [
    {
      title: "Source 1",
      url: "https://docs.google.com/spreadsheets/d/1RYRvKTCLLJxXrZ_7OOjG8j98L_fjE5KNHtLG4wHn9Xw/edit#gid=0",
    },
    {
      title: "Source 2",
      url: "https://docs.google.com/spreadsheets/d/1qvWwf1fNB5jN8bJ8dFGAVzC7scgDCoBO-hglwjTT4iY/edit#gid=0",
    },
    {
      title: "Source 3",
      url: "https://docs.google.com/spreadsheets/d/1hlS4iNB6Uj-KVKzmFEygZkeTfX-U73B9R2lXdV3d5I8/edit#gid=0",
    },
  ];

  const iconLinks: IIconLinkData[] = [];
  const sourceDataTransformed: IIconLinkData[] =
    sourceLinksToIconLinks(sourceData);
  const routeDataTransformed: IIconLinkData[] = routeDataToIconLinks(routeData);
  const externalLinkDataTransformed: IIconLinkData[] =
    externalLinkstoIconLinks(externalLinkData);

  iconLinks.push(...routeDataTransformed);
  iconLinks.push(...externalLinkDataTransformed);
  iconLinks.push(...sourceDataTransformed);

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

          <ListItem button sx={{ padding: "0px" }}>
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
