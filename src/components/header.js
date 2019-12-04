import React from 'react';
import { makeStyles } from '@material-ui/core';
import AlertDialogSlide from './modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    textAlign: 'left',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    // padding: '15px 0',
    color: '#fff',
    backgroundColor: 'rgba(142, 36, 170, .9)',
  },
  icon: {
    color: '#FFF',
    margin: '0 2.5px'
  },
  inline: {
    display: 'inline-block',
    verticalAlign: 'top',
    margin: '30px 0 0 10px'
  },
  centered: {
    display: 'block',
    padding: '30px 0 10px 0',
    textAlign: 'center',
    margin: 0
  },
  block: {
    display: 'block',
    margin: 0
  },
  inputDiv: {
    display: 'inline-block',
  }
}));

const Header = props => {
  const classes = useStyles();
  const { add, notFixed, main, handleClick } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [owner, setOwner] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submit = () => {
    const regex = RegExp('ზურა*|zura*|ზ.გ.კ*|ზგკ*');
    if (regex.test(owner)) {
      handleClick('error', `ვერ დეემატა! იმიზა რომე ( ${owner} ) არ მოსულა`);
    } else if (regex.test(value)) {
      handleClick('error', `ვერ დეემატა! იმიზა რომე ( ${value} ) არ მოსულა`);
    } else {
      add({ owner, text: value, date: Date.now() });
      setOpen(false);
    }
  };

  const handleChange = (value) => {
    setValue(value);
  };

  const handleChangeOwner = (value) => {
    setOwner(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={!notFixed ? { position: 'fixed' } : {}} className={classes.header}>
      {main ? <>
          {isMobile ?
            <h2 className={classes.centered}>შენი პირში</h2> :
            <h2 className={classes.inline}>შენი პირში - </h2>
          }
          {' '}
          <div className={clsx(isMobile ? classes.block : classes.inputDiv)} style={{ verticalAlign: 'top' }}>
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="რას იზამდი?"
              onChange={e => {
                setValue(e.target.value);
              }}
              value={value}
              margin="normal"
              variant="outlined"
              style={isMobile ? { width: '90%', marginLeft: '5%' } : {}}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  handleClickOpen();
                  ev.preventDefault();
                }
              }}
            />
          </div>
          <AlertDialogSlide
            open={open}
            submit={submit}
            value={value}
            owner={owner}
            handleChange={handleChange}
            handleChangeOwner={handleChangeOwner}
            handleClose={handleClose}/>
          <Link to={'/naxui'} style={{
            textDecoration: 'none'
          }}>
            <Button
              style={!isMobile ? {
                position: 'absolute',
                right: 10,
                top: 20,
                color: 'white',
                fontWeight: 'bold',
              } : {
                color: 'white',
                fontWeight: 'bold',
                padding: 15,
              }}>
              რეიტინგი
            </Button>
          </Link>
        </> :
        <div style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          height: 70,
          backgroundColor: 'rgba(142, 36, 170, .9)'
        }}>
          <Link to={'/'} style={{
            textDecoration: 'none'
          }}>
            <Button style={{ position: 'absolute', left: 10, top: 20, color: 'white', fontWeight: 'bold' }}>
              უკან
            </Button>
          </Link>
        </div>}
    </div>
  );
};

export default Header;
