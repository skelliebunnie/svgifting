import { useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";

import { Box } from '@material-ui/core'

import Calendar from '../components/Calendar'

import AlertSnack from '../components/AlertSnack'

export default function Events() {
  const { alert, handleAlertClose } = useContext(DatabaseContext)
  
  return (
    <Box>
      <Calendar />
      <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
    </Box>
  )
}
