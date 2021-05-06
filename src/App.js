import { Switch, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import mainTheme from './themes/mainTheme'

import { makeStyles } from '@material-ui/core/styles'

import { Box } from '@material-ui/core'

import Search from './pages/Search'
import Gifts from './pages/Gifts'
import GiftForm from './pages/GiftForm'
import AddItem from './pages/AddItem'

const palette = require('./utils/palette')

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: palette.dayblue[200]
  },
}));

function App() {
  const location = useLocation();
  const classes = useStyles();

  return (
    <ThemeProvider theme={mainTheme}>
      <Box className={classes.root}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Search} />
          <Route exact path="/gifts" component={Gifts} />
          <Route exact path="/assign-gifts" component={GiftForm} />
          <Route exact path="/add-item" component={AddItem} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
