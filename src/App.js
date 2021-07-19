import { Switch, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import mainTheme from './themes/mainTheme'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { SnackbarProvider } from 'notistack'
import DatabaseContextProvider from './contexts/DatabaseContext';

import Navbar from './components/Navbar'

import Npcs from './pages/Npcs'
import Gifts from './pages/Gifts'
import Events from './pages/Events'
import AdminNpcs from './pages/AdminNpcs'
import AdminGifts from './pages/AdminGifts'
import AdminItems from './pages/AdminItems'

const palette = require('./utils/palette')

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: palette.dayblue[50]
  },
  navbarMargin: {

  },
  info: {
    background: `${palette.dayblue[500]} !important`,
    color: 'white'
  },
  success: {
    background: `${palette.green[600]} !important`,
    color: '#333'
  },
  warning: {
    background: `${palette.sand[200]} !important`
  },
  error: {
    background: `${palette.red[500]} !important`,
      color: 'white'
  }
}));

function App() {
  const location = useLocation();
  const classes = useStyles();

  const eventToken = location.pathname.includes("admin") ? true : false;
  localStorage.setItem('token', eventToken)

  return (
    <ThemeProvider theme={mainTheme}>
      <Navbar active={location.pathname} />
      <SnackbarProvider
        maxSnack={5} 
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
          variantInfo: classes.info
        }}
        preventDuplicate
      >
        <DatabaseContextProvider>
          <Box className={classes.root} style={location.pathname !== '/gifts' ? {paddingTop: '2rem'} : {}}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Npcs} />
              <Route exact path="/npcs" component={Npcs} />
              <Route exact path="/gifts" component={Gifts} />
              <Route path="/events" component={Events} />
              {/* ADMIN ROUTES */}
              <Route exact path="/npcs/admin" component={AdminNpcs} />
              <Route exact path="/items/admin" component={AdminItems} />
              <Route exact path="/gifts/admin" component={AdminGifts} />
            </Switch>
          </Box>
        </DatabaseContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
