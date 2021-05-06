// import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Navbar from '../components/Navbar'

import GiftPreferenceForm from '../components/GiftPreferenceForm'

export default function GiftForm() {

  return (
    <Box>
      <Navbar />
      <GiftPreferenceForm />
    </Box>
  );
}
