import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Tooltip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '1rem'
  },
  itemIcon: {
    borderRadius: 7,
    width: 48,
    height: 48,
    transition: 'all .3s ease-out',
    '& > img': {
      margin: 7
    },
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

    let newList = list;
    for(var i = 0; i < newList.length; i++) {
      const fileName = imageFileName(newList[i].name);
      const image = require(`../../assets/item_icons/24px-${fileName}.png`) || '../../assets/item_icons/Error_Item.png';
      newList[i].img_src = image;
    }
    setItems(newList);

  }, [list])

  const imageFileName = (name) => {
    // 1. replace apostrophes & commas in the name with "nothing" then split
    // 2. capitalize the first letter of each word & lowercase the rest
    // 3. rejoin with underscores instead of spaces
    let filename = name.replace("'", "").replace(",", "").split(" ");
    filename = filename.map( word => word.substring(0,1).toUpperCase() + word.substring(1, word.length).toLowerCase() );

    return filename.join("_").replace("__", "_");
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} className={classes.gridContainer}>
      {items.map(item => <Grid item key={item.id} className={(selected !== null && selected.id === item.id) ? `${classes.activeItem} ${classes.itemIcon}` : classes.itemIcon}><Tooltip title={item.name} onClick={() => onItemClick(item)}><img src={item.img_src.default} alt={item.name} width={24} height="auto" /></Tooltip></Grid>)}
      </Grid>
    </Container>
  )
}
