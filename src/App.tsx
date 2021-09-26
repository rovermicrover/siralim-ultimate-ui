import React, { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import createPersistedState from "use-persisted-state";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import Header from "./Header";
import Nav from "./Nav";

import Creatures from "./pages/Creatures";
import Traits from "./pages/Traits";
import Spells from "./pages/Spells";
import Klasses from "./pages/Klasses";
import Races from "./pages/Races";
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

const useIsDarkThemeState = createPersistedState("isDarkTheme");

function App() {
  const browserIsDarkTheme = getBrowserIsDarkTheme();
  const [isDarkTheme, setIsDarkTheme] =
    useIsDarkThemeState<boolean>(browserIsDarkTheme);

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
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
              sx={{ flexGrow: 1, p: 3 }}
              style={{
                height: "100vh",
                paddingTop: "0px",
                paddingBottom: "0px",
                display: "flex",
                overflow: "auto",
              }}
            >
              <div
                style={{
                  width: "100%",
                  paddingTop: "84px",
                  paddingBottom: "24px",
                }}
              >
                <Switch>
                  <Route path="/creatures">
                    <Creatures />
                  </Route>
                  <Route path="/traits">
                    <Traits />
                  </Route>
                  <Route path="/spells">
                    <Spells />
                  </Route>
                  <Route path="/classes">
                    <Klasses />
                  </Route>
                  <Route path="/races">
                    <Races />
                  </Route>
                  <Route path="/status-effects">
                    <StatusEffects />
                  </Route>
                </Switch>
              </div>
            </Box>
          </Box>
        </QueryParamProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
