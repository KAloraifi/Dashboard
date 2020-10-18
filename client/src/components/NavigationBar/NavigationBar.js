import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import LaunchIcon from '@material-ui/icons/Launch';

import githubLogo from '../../assets/GitHub-Mark/github.png'


const useStyles = makeStyles((theme) => ({
  toolbarMargin: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  goodreadsLink: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}));

export default function NavigationBar() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Tooltip title="Github Repository">
            <IconButton color="inherit" aria-label="launch" target="_blank" href="https://github.com/KAloraifi/Dashboard" toolt>
              <img src={githubLogo} />
            </IconButton>
          </Tooltip>
          <IconButton className={classes.goodreadsLink} color="inherit" aria-label="launch" target="_blank" href="https://www.goodreads.com/api">
            <LaunchIcon />
            <Typography>
              Goodreads API
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
}