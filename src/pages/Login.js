import { useState } from 'react'
import { Container, Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from "@material-ui/lab/Alert";

import API from '../utils/API'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: "0 auto",

    [theme.breakpoints.up("md")]: {
      maxWidth: "50%",
      
    },

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },

    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

export default function Login(props) {
  const classes = useStyles();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
    error: ''
  })

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    
    API.login(loginForm).then(res => {
      localStorage.setItem("svgifting-token", res.data.token);

      setLoginForm({
        username: "",
        password: "",
        error: ""
      })

      props.history.push('/')

    }).catch(err => {
      localStorage.removeItem("svgifting-token");
      console.log("svgifting-token has been removed. Error Login.line: 89")
      console.error(err)

      setLoginForm({
        ...loginForm,
        error: "There was a problem signing in - please try again"
      })
    })
  }

  return (
    <Container>
      <Typography variant="h2" style={{margin: "0 auto", textAlign: 'center'}}>Sign In</Typography>
      {loginForm.error !== '' && <Alert severity="error">{loginForm.error}</Alert>}
      <form autoComplete="off" onSubmit={handleLogin} className={classes.root}>
        <TextField label="Username" name="username" variant="filled" value={loginForm.username} type="text" onChange={handleInputChange} required />
        <TextField label="Password" name="password" variant="filled" value={loginForm.password} type="password" onChange={handleInputChange} required />
        <Button variant="contained" color="secondary" onClick={handleLogin} type="submit">Sign In</Button>
      </form>
    </Container>
  );
}