import { useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";
import { Box } from '@material-ui/core'

import GiftPreferenceForm from '../components/GiftPreferenceForm'
import AlertSnack from '../components/AlertSnack'

export default function GiftForm() {
  const { alert, handleAlertClose } = useContext(DatabaseContext)

  return (
    <Box>
      <GiftPreferenceForm />
      <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
    </Box>
  );
}
