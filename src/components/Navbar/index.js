import { useState, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.nightblue[600],
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  title: {
    flex: "1 0 auto",
    fontWeight: "bold",
    "& a": {
      textDecoration: "none",
      color: "white",
    },
    [theme.breakpoints.up("md")]: {
      flex: "0 0 15%",
    },
  },
  button: {
    flex: "1 0 initial",
    margin: "0 0.5rem",
    "& a": {
      color: "black",
      textDecoration: "none",
      [theme.breakpoints.up("md")]: {
        color: "gainsboro",
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.dayblue[500],
      "& a": {
        color: "white",
      },
    },
  },
  active: {
    backgroundColor: theme.palette.sand[400],
    "& a": {
      color: "white",
    },
  },
  login: {
    justifySelf: 'flex-end'
  }
}));

const CustomCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.green[600],
    // '&$checked': {
    //   color: theme.palette.green[600]
    // }
  },
}))((props) => <Checkbox color="default" {...props} />);

function FilterAvailableIn({ includeAvailableIn, handleAvailableInChecks }) {
  return (
    <>
      {includeAvailableIn.map(mod => (
        <FormControlLabel
          key={mod.name}
          label={mod.name}
          control={
            <CustomCheckbox
              name={mod.name}
              value={mod.name}
              onChange={handleAvailableInChecks}
              checked={mod.isChecked}
              style={{ display: "inline-block" }}
            />
          }
        />
      ))}
    </>
  );
}

export default function Navbar(props) {
  const classes = useStyles();

  const { availableIn, handleAvailableInChecks } = useContext(DatabaseContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const userData = props.user || null;
  const active = props.active;

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}><Link to='/'>Stardew Valley Gifting</Link></Typography>
        {/* Only show menu icon when screen is super small */}
        {window.innerWidth < 768 ?
          <>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu" onClick={openMenu}>
              <MenuIcon />
          </IconButton>
          <Menu
            id="main-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            <MenuItem className={active === '/' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/'>NPCs</Link></MenuItem>
            <MenuItem className={active === '/gifts' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/gifts'>Gifts</Link></MenuItem>
            <MenuItem className={active === '/events' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/events'>Events</Link></MenuItem>
            {/* Login */}
            {!userData.isLoggedIn &&
              <MenuItem className={active === '/login' ? `${classes.button} ${classes.active}` : classes.button}><Link to='/login'>Sign In</Link></MenuItem>
            }
            {/* Admin Only */}
            {(userData.isLoggedIn && userData.Admin) &&
            <>
              <MenuItem className={active === '/npcs/admin' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/npcs/admin'>Admin NPCs</Link></MenuItem>
              <MenuItem className={active === '/items/admin' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/items/admin'>Admin Items</Link></MenuItem>
              <MenuItem className={active === '/gifts/admin' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/gifts/admin'>Admin Gifts</Link></MenuItem>
            </>
            }
            <hr/>
            <Typography>Include Data From:</Typography>
            <FilterAvailableIn
              includeAvailableIn={availableIn}
              handleAvailableInChecks={handleAvailableInChecks}
            />
          </Menu>
          </>
          :
          <Grid container style={{justifyContent: 'space-between'}}>
            <Grid item>
              <Button className={active === '/' ? `${classes.button} ${classes.active}` : classes.button}><Link to='/'>NPCs</Link></Button>
              <Button className={active === '/gifts' ? `${classes.button} ${classes.active}` : classes.button}><Link to='/gifts'>Gifts</Link></Button>
              <Button className={active === '/events' ? `${classes.button} ${classes.active}` : classes.button}><Link to='/events'>Events</Link></Button>
              <div style={{display: 'inline-block', color: 'gainsboro'}}>
                <span style={{ borderLeft: '2px solid gainsboro', paddingLeft: '1rem'}}>Include Data From:&nbsp;&nbsp;&nbsp;</span>
                <FilterAvailableIn
                  includeAvailableIn={availableIn}
                  handleAvailableInChecks={handleAvailableInChecks}
                />
              </div>
            </Grid>
            <Grid item>
              {/* Login */}
              {!userData.isLoggedIn &&
                <Button className={active === '/login' ? `${classes.button} ${classes.active} ${classes.login}` : `${classes.button} ${classes.login}`}><Link to='/login'>Sign In</Link></Button>
              }
              {/* Admin Only */}
              {(userData.isLoggedIn && userData.admin) &&
              <>
                <Button className={active === '/npcs/admin' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/npcs/admin'>Admin NPCs</Link></Button>
                <Button className={active === '/items/admin' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/items/admin'>Admin Items</Link></Button>
                <Button className={active === '/gifts/admin' ? `${classes.button} ${classes.active}` : classes.button} ><Link to='/gifts/admin'>Admin Gifts</Link></Button>
              </>
              }
            </Grid>
          </Grid>
        }
      </Toolbar>
    </AppBar>
  )
}
