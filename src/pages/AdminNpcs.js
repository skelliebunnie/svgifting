import { useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";
import { Box } from '@material-ui/core'

import AdminGiftsForm from '../components/AdminGiftsForm'
import AlertSnack from '../components/AlertSnack'

export default function AdminNpcs() {
  const { alert, handleAlertClose } = useContext(DatabaseContext)

  return (
    <Box>
      <AdminGiftsForm />
      <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
    </Box>
  );
}
