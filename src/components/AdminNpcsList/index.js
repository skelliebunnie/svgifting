import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'

import API from '../../utils/API'
import CustomIcon from '../CustomIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '1rem'
  },
  npcIcon: {
    borderRadius: 7,
    padding: 48,
    transition: 'all .3s ease-out',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.green[200]
    }
  },
  activeNpc: {
    backgroundColor: theme.palette.green[400]
  }
}));

export default function AdminNpcsList({ onNpcClick, selected }) {
  const classes = useStyles();

  const [npcs, setNpcs] = useState([])

  useEffect(() => {
    API.getNpcs().then(res => {
      setNpcs(res.data);
    }).catch(err => console.error(err));

  }, [])

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} className={classes.gridContainer}>
        {npcs.map(npc =>
          <Grid item key={npc.id} className={(selected !== null && selected.id === npc.id) ? `${classes.activeNpc} ${classes.npcIcon}` : classes.npcIcon} onClick={() => onNpcClick(npc)}>
            <CustomIcon name={npc.name} mainDir="npc_icons" size={38} style={{ position: 'relative', margin: '8px', verticalAlign: 'middle' }} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
