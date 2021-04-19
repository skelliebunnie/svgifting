import { Switch, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import mainTheme from './themes/mainTheme'

import { Box } from '@material-ui/core'

import Search from './pages/Search'
import Gifts from './pages/Gifts'

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={mainTheme}>
      <Box style={{background: 'lightskyblue', minHeight: '100vh'}}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Search} />
          <Route exact path="/gifts" component={Gifts} />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
