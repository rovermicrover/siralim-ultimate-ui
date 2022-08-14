import React, { useState, useEffect } from "react";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";

import "./App.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter5Adapter } from "use-query-params/adapters/react-router-5";
import { HelmetProvider } from "react-helmet-async";

import useLocalStorage from "./lib/useLocalStorage";

import Header from "./Header";
import Nav from "./Nav";

import Home from "./pages/Home";

import Creatures from "./pages/Creatures";
import Creature from "./pages/Creature";
import Traits from "./pages/Traits";
import Perks from "./pages/Perks";
import Spells from "./pages/Spells";
import StatusEffects from "./pages/StatusEffects";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function getBrowserIsDarkTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (key: string, ...args: any[]) => void;
  }
}

const GOOGLE_TRACKING_ID = "G-ZSNS8WJHPS";

function App() {
  const browserIsDarkTheme = getBrowserIsDarkTheme();
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>(
    "isDarkTheme",
    browserIsDarkTheme
  );

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const cellPadding = isLg ? "16px" : isMd ? "12px" : isSm ? "8px" : "6px";

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (key: string, ...args: any[]): void => {
      window.dataLayer.push([key, ...args]);
    };
    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_TRACKING_ID);
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <SkipNavLink id="skip" data-testid="skip-link" />
      <HelmetProvider>
        <Router>
          <QueryParamProvider adapter={ReactRouter5Adapter}>
            <Box sx={{ display: "flex" }}>
              <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
              <Nav
                isDarkTheme={isDarkTheme}
                setIsDarkTheme={setIsDarkTheme}
                isNavOpen={isNavOpen}
              />
              <Box
                id="main-wrapper"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  padding: "0px",
                  display: "flex",
                  overflow: "auto",
                  "& .MuiTableCell-body": {
                    padding: cellPadding,
                  },
                  "& .MuiTableCell-head": {
                    padding: cellPadding,
                  },
                }}
              >
                <main
                  data-testid="main"
                  style={{
                    width: "100%",
                    padding: "64px 0px 0px 0px",
                  }}
                >
                  <SkipNavContent data-testid="content" />
                  <Switch>
                    <Route path="/creatures/:id">
                      <Creature />
                    </Route>
                    <Route path="/creatures">
                      <Creatures />
                    </Route>
                    <Route path="/traits">
                      <Traits />
                    </Route>
                    <Route path="/perks">
                      <Perks />
                    </Route>
                    <Route path="/spells">
                      <Spells />
                    </Route>
                    <Route path="/status-effects">
                      <StatusEffects />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </main>
              </Box>
            </Box>
          </QueryParamProvider>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
