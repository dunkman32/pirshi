import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { OpenInNew, ThumbDown, ThumbUp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    padding: '0 !important'
  }
}));

const CardForMobile = props => {
  const classes = useStyles();
  const { likeOrDislike, row } = props;

  return (
    <Paper style={{ width: '96%', margin: '15px auto' }}>
      <Grid container spacing={3} style={{ width: '100%', margin: '0 auto' }}>
        <Grid className={classes.grid} item xs={12} sm={12}>
          <p style={{ display: 'inline-block' }}>{`შენი პირში - `}</p>{' '}
          <p style={{ fontWeight: 'bold', color: 'rgb(142, 36, 170)', display: 'inline-block' }}>{row.text}</p>
        </Grid>
        <Grid className={classes.grid} item xs={12} sm={12}>
          <div>
            <p style={{ display: 'inline-block', margin: '0' }}>{'დამდები : '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{row.info.owner}</p>
          </div>
        </Grid>
        <Grid className={classes.grid}
              style={{height: 50}}
              item xs={12} sm={12} md={12}>
          <div style={{marginTop: 10, position: 'absolute', left: '5%' }}>
            <p style={{ display: 'inline-block', margin: '0' }}>{'რეიტინგი: '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{row.info.rating}</p>
          </div>
          <div style={{ position: 'absolute', right: '5%'  }}>
            <IconButton aria-label="filter list"
                        onClick={likeOrDislike.bind(this, row, true)}
            >
              <ThumbUp style={{ cursor: 'pointer', color: 'green' }}/>
            </IconButton>
              <Link to={`/single/${row.text}`}>
                <IconButton aria-label="filter list">
                  <OpenInNew style={{ cursor: 'pointer', color: '#d4af37' }}/>
                </IconButton>
              </Link>
            <IconButton aria-label="filter list"
                        onClick={likeOrDislike.bind(this, row, false)}
            >
              <ThumbDown style={{ cursor: 'pointer', color: 'red' }}/>
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardForMobile;
