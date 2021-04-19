import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})

const colors = {
  dayblue: '#59C9F1',
  nightblue: '#151152',
  red: '#B52121',
  brown: '#6B3710',
  sand: '#DDA059',
  yellow: '#FFD921',
  green: '#58AC14'
};

const mainTheme = createMuiTheme({
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
  },
  overrides: {
    MuiToolbar: {
      root: {
        background: colors.nightblue,
        '& a:hover': {
          color: colors.yellow
        }
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: colors.dayblue,
        color: 'black',
        width: '100%',
        flex: '1 0 100%',
        '&:hover .MuiTabs-indicator': {
          backgroundColor: colors.sand
        }
      },
      flexContainer: {
        width: '100vw',
        flex: '1 0 100%',
        justifyContent: 'space-around',
      },
      indicator: {
        backgroundColor: 'maroon',
      }
    },
    MuiTab: {
      root: {
        backgroundColor: colors.dayblue,
        flex: '1 0 20%',
        [breakpoints.up('md')]: {
          flex: '1 0 20%',
          minWidth: '20%'
        },
        '&.Mui-selected': {
          backgroundColor: colors.red,
          color: 'white',
          outline: 0,
          border: 'none',
          textDecoration: 'none',
          '&:hover': {
            color: 'black'
          }
        },
        '&.MuiButtonBase-root:hover': {
          backgroundColor: colors.yellow,
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
        backgroundColor: colors.nightblue,
        color: 'white'
      },
      tooltipPlacementTop: {
        top: '6px'
      },
      tooltipPlacementBottom: {
        bottom: '6px'
      },
      arrow: {
        color: colors.nightblue
      }
    },
  }
});

export default mainTheme