import { useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";
import { Box } from '@material-ui/core'

import UpsertItemForm from '../components/UpsertItemForm'
import AlertSnack from '../components/AlertSnack'

export default function UpsertItem() {
  const { alert, handleAlertClose } = useContext(DatabaseContext)

  return (
    <Box>
      <UpsertItemForm includeItemList={true} />
      <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
    </Box>
  );
}
