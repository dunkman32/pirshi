import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import bgImage from '../static/images/bg-image.png';
import Footer from '../components/footer';
import Header from '../components/header';
import StickyHeadTable from '../components/table';
import { read, update, write } from '../service';
import clsx from 'clsx';
import {
  CheckCircle,
  Error,
  Info,
  Close
} from '@material-ui/icons';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ReactLoading from 'react-loading';
import {
  BrowserView,
  MobileView,
} from 'react-device-detect';
import MobileViewComponent from '../components/mobile-view';

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
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const variantIcon = {
  success: CheckCircle,
  warning: Close,
  error: Error,
  info: Info,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper (props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}/>
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <Close className={classes.icon}/>
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const Main = props => {
  const [rows, setRows] = useState(null);
  const [shouldUpdate, setUpdate] = useState(false);
  const [start, setStart] = useState(false);
  const [snackbar, setOpen] = React.useState({ open: false, variant: 'success', message: '' });

  const handleClick = (variant, message) => {
    setOpen({ open: true, variant, message });
  };

  const handleClose = () => {
    setOpen({ open: false, variant: 'success', message: '' });
  };

  const Example = ({ type, color, start }) => start &&
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(37,37,37,0.5)',
      textAlign: 'center',
      zIndex: '9999'
    }}>
      <Grid style={{ marginTop: '25vh' }} container justify="center">
        <Grid item>
          <ReactLoading type={type} color={color} height={300} width={150}/>
        </Grid>
      </Grid>
    </div>;

  useEffect(() => {
    setStart(true);
    read().then(res => {
      let elements = [];
      if (res.data && res.data.Items) {
        elements = res.data.Items.map(element => createData(element));
      }
      if (elements.length) setRows(elements);
      setStart(false);
    }).catch(() => {
      setStart(false);
      handleClick('error', 'რაცხა ერორია!');
    });
  }, [shouldUpdate]);

  const like = davde => {
    update(davde).then(res => setUpdate(!shouldUpdate)).catch(e => {
      handleClick('error', 'რაცხა ერორია!');
    });
  };

  const add = davde => {
    write(davde).then(res => {
      setUpdate(!shouldUpdate);
      handleClick('success', 'დეემატა!');
    }).catch(e => {
      handleClick('error', 'ვერ დეემატა!');
      console.log('errori ara ყლე', e);
    });
  };

  const createData = data => {
    const { text, owner, rating, actions } = data;
    return { text, info: { owner, rating }, actions };
  };
  const classes = useStyles();

  // const color = props.color || '#8e24aa';
  return (rows && rows.length) && (
    <div className={classes.root}>
      <BrowserView>
        <Grid className={classes.grid} container spacing={3}>
          <Grid className={classes.grid} style={{ minHeight: 75 }} item xs={12}>
            <Header add={add}/>
          </Grid>
          <Grid className={classes.grid} item xs={12}>
            <StickyHeadTable rows={rows} like={like} add={add}/>
          </Grid>
          <Grid className={classes.grid} item xs={12}>
            <Footer/>
          </Grid>
        </Grid>

      </BrowserView>
      <MobileView>
        <div style={{height: 80}}>
        <Header add={add}/>
        </div>
        <MobileViewComponent rows={rows} like={like} add={add}/>
        <Footer/>
      </MobileView>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={snackbar.variant}
          message={snackbar.message}
        />
      </Snackbar>
      <Example start={start} type={'spinningBubbles'} color={'rgb(142, 36, 170)'}/>
    </div>
  );
};

export default Main;
