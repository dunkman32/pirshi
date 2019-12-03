import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  fixed: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: '15px 0',
    // color: '#000'
  },
  nonFixed: {
    padding: '15px 0',
    color: '#000',
    width: '100%',
  },
  icon: {
    color: '#8e24aa',
    margin: '0 2.5px'
  }
}));

const Footer = props => {
  const classes = useStyles();
  const color = props.color || '#8e24aa';
  return (
    <div className={props.fixed ? classes.fixed : classes.footer}>
      <Grid container className={classes.root}>
        <Grid container xs={12} item justify="center">
          &copy; {1900 + new Date().getYear()}, made with{' '}
          <Favorite style={{ color }} className={classes.icon}/> by{' '}
          noZZa.
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
