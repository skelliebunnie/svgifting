import { makeStyles } from '@material-ui/core/styles'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    '&.info .MuiSnackbarContent-root': {
      backgroundColor: theme.palette.dayblue[400],
      color: 'white'
    },
    '&.success .MuiSnackbarContent-root': {
      backgroundColor: theme.palette.green[400],
      color: '#333'
    },
    '&.warning .MuiSnackbarContent-root': {
      backgroundColor: theme.palette.sand[200]
    },
    '&.error .MuiSnackbarContent-root': {
      backgroundColor: theme.palette.red[400],
      color: 'white'
    }
  }
}));

export default function AlertSnack(props) {
  const classes = useStyles();

  return (
    <Snackbar 
      className={`${classes.root} ${props.severity}`}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={props.open}
      autoHideDuration={4000}
      onClose={props.handleClose}
      message={props.message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}
