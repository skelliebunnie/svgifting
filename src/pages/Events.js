import { useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";

import { Box } from '@material-ui/core'

import Calendar from '../components/Calendar'

import AlertSnack from '../components/AlertSnack'

export default function Events() {
  const { alert, handleAlertClose, setSelectedDate, addEventModalOpen, setAddEventModalOpen } = useContext(DatabaseContext)

  const openModal = (date) => {
    setSelectedDate(date)
    setAddEventModalOpen(true)
  }

  const closeModal = () => {
    setAddEventModalOpen(false)
  }
  
  return (
    <Box>
      <Calendar openModal={openModal} closeModal={closeModal} modalState={addEventModalOpen} />
      <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
    </Box>
  )
}
