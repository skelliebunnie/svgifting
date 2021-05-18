import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'

import ItemIcon from '../ItemIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '1rem'
  },
  itemIcon: {
    borderRadius: 7,
    padding: 48,
    transition: 'all .3s ease-out',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.green[200]
    }
  },
  activeItem: {
    backgroundColor: theme.palette.green[400]
  }
}));

export default function ItemList({ onItemClick, selected, list }) {
  const classes = useStyles();
  
  const [items, setItems] = useState([])
  
  useEffect(() => {
    setItems(list);

  }, [list])

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} className={classes.gridContainer}>
      {items.map(item => <Grid item key={item.id} className={(selected !== null && selected.id === item.id) ? `${classes.activeItem} ${classes.itemIcon}` : classes.itemIcon} onClick={() => onItemClick(item)}><ItemIcon name={item.name} size={24} style={{position: 'relative', margin: '8px', verticalAlign: 'middle'}} /></Grid>)}
      </Grid>
    </Container>
  )
}
