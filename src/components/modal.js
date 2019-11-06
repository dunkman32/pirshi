import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  main: {
    fontFamily: '\'Lobster\', cursive',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
  const {
    open,
    handleChange,
    handleClose,
    value,
    submit,
    owner,
    handleChangeOwner
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      className={classes.main}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        შენი პირში
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="სიტყვა"
          onChange={e => {
            handleChange(e.target.value);
          }}
          value={value}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="ავტორი"
          onChange={e => {
            handleChangeOwner(e.target.value);
          }}
          value={owner}
          margin="normal"
          variant="outlined"
          autoFocus={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          დახურვა
        </Button>
        <Button onClick={submit} color="primary">
          შენახვა
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialogSlide;
