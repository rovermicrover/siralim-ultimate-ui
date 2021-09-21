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

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Nav />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Switch>
            <Route path="/creatures">
              <Creatures />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
