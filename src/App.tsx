import React, { useState } from "react";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";

import "./App.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import createPersistedState from "use-persisted-state";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import Header from "./Header";
import Nav from "./Nav";

import Creatures from "./pages/Creatures";
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

const test: number = "tt";

const useIsDarkThemeState = createPersistedState("isDarkTheme");

function App() {
  const browserIsDarkTheme = getBrowserIsDarkTheme();
  const [isDarkTheme, setIsDarkTheme] =
    useIsDarkThemeState<boolean>(browserIsDarkTheme);

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const cellPadding = isLg ? "16px" : isMd ? "12px" : "8px";

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <SkipNavLink id="skip" data-testid="skip-link" />
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
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
                </Switch>
              </main>
            </Box>
          </Box>
        </QueryParamProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
