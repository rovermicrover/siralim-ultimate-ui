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

import { MuiSafeLink } from "./components/MuiRouterLink";

import CreaturesPng from "./images/nav/creatures.png";
import PerksPng from "./images/nav/perks.png";
import TraitsPng from "./images/nav/traits.png";
import SpellsPng from "./images/nav/spells.png";
import StatusEffectsPng from "./images/nav/status_effects.png";

import GitLightSvg from "./images/nav/github/favicon-light.svg";
import GitDarkSvg from "./images/nav/github/favicon-dark.svg";

import AuthorJpg from "./images/nav/author-1x.jpg";

import SteamJpg from "./images/nav/steam.jpg";

import SourceIcon from "@mui/icons-material/Source";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface IInteralRoute {
  to: string;
  title: string;
  icon: string | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

interface IExternalRoute {
  href: string;
  title: string;
  icon: string | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

type TRouteData = IInteralRoute | IExternalRoute;

interface NavIconLinkProps {
  title: string;
  icon: string | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  iconWidth: number;
}

function NavIconLink({ title, icon, iconWidth }: NavIconLinkProps) {
  // Check if the icon is base64 img data or assume it's an SVG Icon Component
  return typeof icon === "string" ? (
    <img src={icon} width={iconWidth} alt={title} />
  ) : (
    React.createElement(icon, { sx: { fontSize: `${iconWidth}px` } })
  );
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

  const routeData: TRouteData[] = [
    {
      to: "/creatures",
      title: "Creatures",
      icon: CreaturesPng,
    },
    {
      to: "/traits",
      title: "Traits",
      icon: TraitsPng,
    },
    {
      to: "/perks",
      title: "Perks",
      icon: PerksPng,
    },
    {
      to: "/spells",
      title: "Spells",
      icon: SpellsPng,
    },
    {
      to: "/status-effects",
      title: "Status Effects",
      icon: StatusEffectsPng,
    },
    {
      href: "https://github.com/rovermicrover/siralim-ultimate-ui",
      title: "Source Code",
      icon: isDarkTheme ? GitDarkSvg : GitLightSvg,
    },
    {
      href: "https://github.com/rovermicrover/",
      title: "Author",
      icon: AuthorJpg,
    },
    {
      href: "https://store.steampowered.com/app/1289810/Siralim_Ultimate/",
      title: "SU on Steam",
      icon: SteamJpg,
    },
    {
      href: "https://docs.google.com/spreadsheets/d/1RYRvKTCLLJxXrZ_7OOjG8j98L_fjE5KNHtLG4wHn9Xw/edit#gid=0",
      title: "Source 1",
      icon: SourceIcon,
    },
    {
      href: "https://docs.google.com/spreadsheets/d/1qvWwf1fNB5jN8bJ8dFGAVzC7scgDCoBO-hglwjTT4iY/edit#gid=0",
      title: "Source 2",
      icon: SourceIcon,
    },
    {
      href: "https://docs.google.com/spreadsheets/d/1hlS4iNB6Uj-KVKzmFEygZkeTfX-U73B9R2lXdV3d5I8/edit#gid=0",
      title: "Source 3",
      icon: SourceIcon,
    },
  ];

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
          {routeData.map((route, i) => (
            <li key={i}>
              <ListItem
                button
                component={MuiSafeLink}
                title={route.title}
                to={(route as IInteralRoute).to}
                href={(route as IExternalRoute).href}
                sx={{ paddingLeft: "12px" }}
              >
                <ListItemIcon aria-hidden="true">
                  {isNavOpen ? (
                    <Tooltip
                      title={isNavOpen ? "" : route.title}
                      describeChild
                      arrow
                      placement="right"
                    >
                      <NavIconLink iconWidth={iconWidth} {...route} />
                    </Tooltip>
                  ) : (
                    <NavIconLink iconWidth={iconWidth} {...route} />
                  )}
                </ListItemIcon>
                {isNavOpen && (
                  <ListItemText primary={route.title} sx={itemTextStyle} />
                )}
              </ListItem>
            </li>
          ))}

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
