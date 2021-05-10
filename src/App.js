import { Switch, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import mainTheme from './themes/mainTheme'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { SnackbarProvider } from 'notistack'
import DatabaseContextProvider from './contexts/DatabaseContext';

import Search from './pages/Search'
import Gifts from './pages/Gifts'
import GiftForm from './pages/GiftForm'
import UpsertItem from './pages/UpsertItem'

const palette = require('./utils/palette')

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: palette.dayblue[200]
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

  return (
    <ThemeProvider theme={mainTheme}>
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
          <Box className={classes.root}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Search} />
              <Route exact path="/gifts" component={Gifts} />
              <Route exact path="/assign-gifts" component={GiftForm} />
              <Route exact path="/add-item" component={UpsertItem} />
            </Switch>
          </Box>
        </DatabaseContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
