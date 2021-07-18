import { useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";
import { Box } from '@material-ui/core'

import AdminItemsForm from '../components/AdminItemsForm'
import AlertSnack from '../components/AlertSnack'

export default function AdminItems() {
  const { alert, handleAlertClose } = useContext(DatabaseContext)

  return (
    <Box>
      <AdminItemsForm includeItemList={true} />
      <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
    </Box>
  );
}
