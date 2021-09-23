/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/react'

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';

import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

function MuiRouterLink(props: any) {
  return (
    <Link component={RouterLink} {...props} />
  )
}

export default function Header() {
  return (
    <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {['Creatures', 'Traits', 'Spells', 'Classes', 'Races', 'Status-Effects'].map((text) => (
            <ListItem key={text} component={MuiRouterLink} to={`/${text.toLowerCase()}`}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem component={Link} href="https://github.com/rovermicrover/siralim-ultimate-ui" target="_blank">
            <ListItemText primary='Source Code' />
          </ListItem>
          <ListItem component={Link} href="https://github.com/rovermicrover/" target="_blank">
            <ListItemText primary='Author' />
          </ListItem>
          <ListItem component={Link} href="https://store.steampowered.com/app/1289810/Siralim_Ultimate/" target="_blank">
            <ListItemText primary='SU On Steam'/>
          </ListItem>
        </List>
      </Drawer>
  );
}