import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  overlayIcon: {
    position: 'absolute',
    display: 'inline-block',

    '&.top': { top: '-4px', width: '100%', margin: '0 auto' },
    '&.bottom': { bottom: '-4px', width: '100%', margin: '0 auto' },
    '&.left': { left: '-4px', height: '100%', margin: 'auto 0' },
    '&.right': { right: '-4px', height: '100%', margin: 'auto 0' },
    '&.topLeft': { top: '-4px', left: '-4px' },
    '&.topRight': { top: '-4px', right: '-4px' },
    '&.bottomLeft': { bottom: '-4px', left: '-4px' },
    '&.bottomRight': { bottom: '-4px', right: '-4px' },
  }
}));


export default function ItemIcon(props) {
  const classes = useStyles();

  const image = <img src={props.icon} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32} style={props.style !== undefined ? {...props.style} : {display: 'inline-block', margin: '0 3px', verticalAlign: 'middle'}} />

  const overlay = props.overlay !== undefined ? <img src={props.overlay} width={props.size !== undefined ? props.size / 2 : 24} height={props.size !== undefined ? props.size / 2 : 24} className={`${classes.overlayIcon} ${props.position !== undefined ? props.position : 'bottomLeft'}`} /> : '';

  if(props) {
    return (
      <Tooltip title={props.name} aria-label={props.name} placement="bottom" arrow>
        <span style={{position: 'relative'}}>
          {image}
          {(props.overlay !== undefined && props.overlay !== '') &&
            {overlay}
          }
        </span>
      </Tooltip>
    )
  } else {
    return (
      <span style={{position: 'relative'}}>
        {image}
        {(props.overlay !== undefined && props.overlay !== '') &&
          {overlay}
        }
      </span>
    )
  }
}
