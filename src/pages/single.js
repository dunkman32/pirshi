import React, { useEffect, useState } from 'react';
import { findOne } from '../service';
import Footer from '../components/footer';
import Header from '../components/header';
import Grid from '@material-ui/core/Grid';
import ReactLoading from 'react-loading';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { CheckCircle, Close, Error, Info } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { isMobile } from 'react-device-detect';

const Single = props => {
  const [start, setStart] = useState(false);
  const [data, setData] = useState(null);
  const [snackbar, setOpen] = React.useState({ open: false, variant: 'success', message: '' });

  console.log(props.match.params.name);
  useEffect(() => {
    setStart(true);
    findOne(props.match.params.name).then(res => {
      if (res.data) {
        console.log(res.data);
        setData(res.data)
      }
      setStart(false);
    }).catch(() => {
      setStart(false);
      handleClick('error', 'რაცხა ერორია!');
    });
  }, []);

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

  return data && <>
    <div style={{ height: 'max-content' }}>
      <Header  notFixed/>
    </div>
    <div style={{marginTop: 100}}>
      <div style={isMobile?{fontSize: 28}:{fontSize: 32}}>
        <p style={{ display: 'inline-block' }}>{`შენი პირში - `}</p>{' '}
        <p style={{ fontWeight: 'bold', color: 'rgb(142, 36, 170)', display: 'inline-block' }}>{data.text}</p>
      </div>
      <div style={{fontSize: 24}}>
        <p style={{ display: 'inline-block' }}>{`დამდები პიროვნება - `}</p>{' '}
        <p style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'rgb(142, 36, 170)', display: 'inline-block' }}>{data.owner}</p>
      </div>
      <div style={{fontSize: 18}}>
        <p style={{ display: 'inline-block' }}>{`რეიტინგი - `}</p>{' '}
        <p style={{ fontWeight: 'bold', color: 'rgb(142, 36, 170)', display: 'inline-block' }}>{data.rating}</p>
      </div>
    </div>
    <Example start={start} type={'spinningBubbles'} color={'rgb(142, 36, 170)'}/>
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
      open={snackbar.open} autoHideDuration={6000} onClose={handleClose}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={snackbar.variant}
        message={snackbar.message}
      />
    </Snackbar>
    <Footer fixed/>
  </>;
};

const variantIcon = {
  success: CheckCircle,
  warning: Close,
  error: Error,
  info: Info,
};
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

export default Single;
