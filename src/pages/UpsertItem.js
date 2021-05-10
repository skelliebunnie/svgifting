// import { useState } from 'react'
import { Box } from '@material-ui/core'

import Navbar from '../components/Navbar'
import UpsertItemForm from '../components/UpsertItemForm'

export default function UpsertItem() {
  return (
    <Box>
      <Navbar />
      <UpsertItemForm includeItemList={true} />
    </Box>
  );
}
