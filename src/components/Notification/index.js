import { createRef } from 'react'
import { IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import { useSnackbar, withSnackbar } from 'notistack';

function Notification(props) {

  const { closeSnackbar } = useSnackbar();
  const alertRef = createRef();

  return (
    <IconButton ref={alertRef} size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(props.key)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  )
}

export default withSnackbar(Notification)