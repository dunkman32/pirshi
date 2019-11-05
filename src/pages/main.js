import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import bgImage from '../static/images/bg-image.png';
import Footer from '../components/footer';
import Header from '../components/header';
import StickyHeadTable from '../components/table';
import { read, write, update } from '../service';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: `url(${bgImage})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
    width: '100%',
    minHeight: '100vh',
    fontFamily: '\'Lobster\', cursive',
    // backgroundColor: '#000000'
  },
  fixed: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: '15px 0',
    color: '#000'
  },
  nonFixed: {
    padding: '15px 0',
    color: '#000',
    width: '100%',
  },
  icon: {
    color: '#8e24aa',
    margin: '0 2.5px'
  },
  grid: {
    width: '100% !important'
  }
}));

const Main = props => {
  const [rows, setRows] = useState(null);
  const [shouldUpdate, setUpdate] = useState(false);

  useEffect(() => {
    read().then(res => {
      let elements = [];
      if (res.data && res.data.Items) {
        elements = res.data.Items.map(element => createData(element));
      }
      if (elements.length) setRows(elements);
    }).catch(() => {
      // notify('error', `can not fetch data from server`, notifyPositions.bottom.center);
    });
  }, [shouldUpdate]);

  const like = davde => {
    update(davde).then(res => setUpdate(!shouldUpdate)).catch(e => console.log('errori ara ყლე', e));
  };

  const add = davde => {
    write(davde).then(res => setUpdate(!shouldUpdate)).catch(e => console.log('errori ara ყლე', e));
  };

  const createData = data => {
    const { text, owner, rating, actions } = data;
    return { text, owner, rating, actions };
  };
  const classes = useStyles();

  // const color = props.color || '#8e24aa';
  return (rows && rows.length) && (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid className={classes.grid} style={{ minHeight: 75 }} item xs={12}>
          <Header/>
        </Grid>
        <Grid className={classes.grid} item xs={12}>
          <StickyHeadTable rows={rows} like={like} add={add}/>
        </Grid>
        <Grid className={classes.grid} item xs={12}>
          <Footer fixed/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
