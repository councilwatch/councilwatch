import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { Routes } from '../router';

import classes from './NavigationBar.module.css';

export const NavigationBar: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6'>CouncilWatch</Typography>

          <div className={classes.links}>
            <Button color='inherit' onClick={() => navigate(Routes.Home)}>
              Home
            </Button>
            <Button color='inherit' onClick={() => navigate(Routes.About)}>
              About
            </Button>
            <Button color='inherit' onClick={() => navigate(Routes.Events)}>
              Events
            </Button>
            <Button color='inherit' onClick={() => navigate(Routes.Resources)}>
              Resources
            </Button>
            <Button color='inherit' onClick={() => navigate(Routes.Contact)}>
              Contact
            </Button>
          </div>

          <Button variant='outlined' color='inherit'>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
};
