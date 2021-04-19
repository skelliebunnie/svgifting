import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flex: '0 0 20%',
    // letterSpacing: '0.1rem',
    fontWeight: 'bold'
  },
  button: {
    flex: '1 0 initial',
    '& a': {
      color: 'gainsboro',
      textDecoration: 'none'
    }
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Stardew Valley Gifting
        </Typography>
        {/* Only show menu icon when screen is super small */}
        {window.innerWidth < 768 ? 
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
          </IconButton>
          :
          <>
          <Button className={classes.button} color="inherit"><Link to='/'>Villagers / NPCs</Link></Button>
          <Button className={classes.button} color="inherit"><Link to='/gifts'>Gifts</Link></Button>
          </>
        }
      </Toolbar>
    </AppBar>
  )
}
