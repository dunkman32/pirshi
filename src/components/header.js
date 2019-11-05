import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    padding: '15px 0',
    color: '#fff',
    backgroundColor: 'rgba(142, 36, 170, .6)',
  },
  icon: {
    color: '#FFF',
    margin: '0 2.5px'
  }
}));

const Header = props => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Grid container className={classes.root}>
        <Grid container xs={12} item justify="center">
          შენი პირში{' '}
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
