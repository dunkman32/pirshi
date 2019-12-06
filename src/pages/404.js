import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import travolta from '../static/travolta.gif';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import randomColor from 'randomcolor';
import Footer from '../components/footer';

const useStyles = makeStyles(theme => ({
  imageForBrowser: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '60%'
  },
  bodyForBrowser: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    backgroundColor: '#f5f5f5'
  },
  link: {
    textDecoration: 'none',
    fontSize: 32
  },
  text404Browser: {
    fontSize: 114,
    fontWeight: 'bolder',
    marginBottom: 15,
  },
  textDescription: {
    fontStyle: 'italic'
  },
  but: {}
}));
const _404 = () => {
  const color = randomColor({ luminosity: 'dark' });
  const classes = useStyles();
  return <div>
    {isMobile ?
      <>
        <h1 className={classes.text404Browser} style={{ color }}>404</h1>
        <h3 className={classes.textDescription} style={{ color }}>გვერდი ვერ მოიძებნა ყ*ეზე გვკიდია წუხილი...</h3>
        <Link className={classes.link} to={'/'}>
          <Button variant="outlined" size="large" style={{
            border: `${color} solid 1px`,
            fontWeight: 'bold',
          }}>დაბრუნდი მთავარზე</Button>
        </Link>
        <img style={{ width: '100%' }} src={travolta} alt={'travolta'}/>
        <div style={{ color, fontWeight: 'bold' }}>
          <Footer color={color} fixed/>
        </div>
      </> : <div className={classes.bodyForBrowser}>
        <h1 className={classes.text404Browser} style={{ color }}>404</h1>
        <h3 className={classes.textDescription} style={{ color }}>გვერდი ვერ მოიძებნა, ყ*ეზე გვკიდია წუხილი...</h3>
        <Link className={classes.link} to={'/'}>
          <Button variant="outlined" size="large" style={{
            border: `${color} solid 1px`,
            fontWeight: 'bold',
          }}>დაბრუნდი მთავარზე</Button>
        </Link>
        <img className={classes.imageForBrowser} src={travolta} alt={'travolta'}/>
        <Footer color={color} fixed/>
      </div>
    }
  </div>;
};

export default _404;
