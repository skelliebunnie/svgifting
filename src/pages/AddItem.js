// import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Navbar from '../components/Navbar'

import AddItemForm from '../components/AddItemForm'

export default function AddItem() {

  return (
    <Box>
      <Navbar />
      <AddItemForm />
    </Box>
  );
}
