import { useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";

import { Container } from '@material-ui/core'

import Calendar from '../components/Calendar'

import AlertSnack from '../components/AlertSnack'

export default function Events({ userIsAdmin }) {
  const { alert, handleAlertClose, setSelectedDate, addEventModalOpen, setAddEventModalOpen } = useContext(DatabaseContext)

  const openModal = (date) => {
    setSelectedDate(date)
    setAddEventModalOpen(true)
  }

  const closeModal = () => {
    setAddEventModalOpen(false)
  }
  
  return (
    <Container maxWidth="lg">
      <Calendar openModal={openModal} closeModal={closeModal} modalState={addEventModalOpen} userIsAdmin={userIsAdmin} />
      <p><em>The week begins on Monday for everything <strong>EXCEPT</strong> gift-giving! The "gift-giving week" begins on SUNDAY.</em></p>
      <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
    </Container>
  )
}
