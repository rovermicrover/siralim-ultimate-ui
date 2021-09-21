import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';

export default function Header() {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}>
      <Typography variant="h6" component="h1" style={{padding: "0.5em"}}>Siralim Ultimate Unofficial Codex</Typography>
    </AppBar>
  );
}