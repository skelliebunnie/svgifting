import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

// import palette from '../utils/palette'
const palette = require('../utils/palette')

const breakpoints = createBreakpoints({})


const mainTheme = createMuiTheme({
  palette: { ...palette },
  typography: {
    fontFamily: [
      'Noto Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: ['Dosis', 'sans-serif'].join(',')
    },
    h2: {
      fontFamily: ['Dosis', 'sans-serif'].join(',')
    },
    h3: {
      fontFamily: ['Dosis', 'sans-serif'].join(',')
    },
    h4: {
      fontFamily: ['Dosis', 'sans-serif'].join(',')
    },
    h5: {
      fontFamily: ['Dosis', 'sans-serif'].join(',')
    },
    h6: {
      fontFamily: ['Dosis', 'sans-serif'].join(',')
    },
  },
  overrides: {
    MuiToolbar: {
      root: {
        background: palette.nightblue,
        '& a:hover': {
          color: palette.yellow
        }
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: palette.dayblue[200],
        color: 'black',
        width: '100%',
        flex: '1 0 100%',
        '&:hover .MuiTabs-indicator': {
          backgroundColor: palette.sand[400]
        }
      },
      flexContainer: {
        width: '100vw',
        flex: '1 0 100%',
        justifyContent: 'space-around',
      },
      indicator: {
        backgroundColor: palette.red[500],
      }
    },
    MuiTab: {
      root: {
        backgroundColor: palette.dayblue[200],
        flex: '1 0 20%',
        [breakpoints.up('md')]: {
          flex: '1 0 20%',
          minWidth: '20%'
        },
        '&.Mui-selected': {
          backgroundColor: palette.red[400],
          color: 'white',
          outline: 0,
          border: 'none',
          textDecoration: 'none',
          '&:hover': {
            color: 'black'
          }
        },
        '&.MuiButtonBase-root:hover': {
          backgroundColor: palette.sand[200],
          // color: 'white',
          cursor: 'pointer'
        },
      },
      textColorInherit: {
        opacity: 1
      },
      wrapper: {
        border: 0,
        outline: 0,
        textDecoration: 'none'
      }
    },
    MuiBox: {
      root: {
        height: '100%'
      }
    },
    MuiCard: {
      root: {
        flex: '1 0 initial',
        margin: '0 auto'
      }
    },
    MuiCardContent: {
      root: {
        paddingTop: 10,
        paddingBottom: 0,
        '&:last-child': {
          paddingBottom: 10
        }
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '0.75rem',
        backgroundColor: palette.nightblue[500],
        color: 'white'
      },
      tooltipPlacementTop: {
        top: '6px'
      },
      tooltipPlacementBottom: {
        bottom: '6px'
      },
      arrow: {
        color: palette.nightblue[500]
      }
    },
  }
});

export default mainTheme