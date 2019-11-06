import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import AlertDialogSlide from './modal';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    textAlign: 'left',
    position: 'fixed',
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
  h4: {
    display: 'inline-block',
    verticalAlign: 'top',
    margin: '30px 10px 0 10px'
  },
  inputDiv: {
    display: 'inline-block',
    verticalAlign: 'top'
  }
}));

const Header = props => {
  const classes = useStyles();
  const { add } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [owner, setOwner] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submit = () => {
    add({ owner, text: value, date: Date.now() });
    setOpen(false);
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
    <div className={classes.header}>
      {/*<Grid container className={classes.root}>*/}
      {/*  <Paper>*/}
          <h2 className={classes.h4}>შენი პირში</h2>
          <div className={classes.inputDiv}>
            <TextField
              id="outlined-basic"
              className={classes.textField}
              label="სიტყვა"
              onChange={e => {
                setValue(e.target.value);
              }}
              value={value}
              margin="normal"
              variant="outlined"
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  handleClickOpen()
                  ev.preventDefault();
                }
              }}
            />
          </div>
        {/*</Paper>*/}
      {/*</Grid>*/}
      <AlertDialogSlide
        open={open}
        submit={submit}
        value={value}
        owner={owner}
        handleChange={handleChange}
        handleChangeOwner={handleChangeOwner}
        handleClose={handleClose}/>
    </div>
  );
};

export default Header;
