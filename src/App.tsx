import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './Header';
import Nav from './Nav';

import Creatures from './pages/Creatures';
import Traits from './pages/Traits';
import Spells from './pages/Spells';
import Klasses from './pages/Klasses';
import Races from './pages/Races';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Nav />
        <Box sx={{ flexGrow: 1, p: 3 }} style={{ height: '100vh', paddingTop: '0px', paddingBottom: '0px', display: 'flex' }}>
          <div style={{ width: '100%', paddingTop: '84px', paddingBottom: '24px' }}>
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
            </Switch>
          </div>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
