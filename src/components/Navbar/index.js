import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.nightblue[600]
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flex: '0 0 15%',
    fontWeight: 'bold',
    '& a': {
      textDecoration: 'none',
      color: 'white'
    }
  },
  button: {
    flex: '1 0 initial',
    margin: '0 0.5rem',
    '& a': {
      color: 'gainsboro',
      textDecoration: 'none'
    },
    '&:hover': {
      backgroundColor: theme.palette.dayblue[500],
      '& a': {
        color: 'white'
      }
    }
  },
  active: {
    backgroundColor: theme.palette.sand[400],
    '& a': {
      color: 'white'
    }
  }
}));

export default function Navbar({ active }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}><Link to='/'>Stardew Valley Gifting</Link></Typography>
        {/* Only show menu icon when screen is super small */}
        {window.innerWidth < 768 ? 
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
              <MenuIcon />
          </IconButton>
          :
          <>
          <Button className={active === '/' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/'>Villagers / NPCs</Link></Button>
          <Button className={active === '/gifts' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/gifts'>Gifts</Link></Button>
          <Button className={active === '/events' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/events'>Events</Link></Button>
          </>
        }
      </Toolbar>
    </AppBar>
  )
}
