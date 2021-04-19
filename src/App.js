import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom'

import { Box } from '@material-ui/core'

import Search from './pages/Search'
import Gifts from './pages/Gifts'

function App() {
  const location = useLocation();

  return (
    <Box>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Search} />
        <Route exact path="/gifts" component={Gifts} />
      </Switch>
    </Box>
  );
}

export default App;
