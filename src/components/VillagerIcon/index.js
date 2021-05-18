import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { PortraitSharp } from '@material-ui/icons';

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

export default function VillagerIcon(props) {
  const classes = useStyles();
  const icon_url = require(`../../assets/villager_icons/${props.name}_Icon.png`);

  const image = <img src={props.swap && props.overlay !== undefined ? props.overlay : icon_url.default} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32} style={props.style !== undefined ? {...props.style} : {"margin": "0 10px 0 0"}} />;

  const overlay = props.overlay !== undefined ? <img src={props.swap ? icon_url.default : props.overlay} width={props.overlaySize !== undefined ? props.overlaySize : props.size !== undefined ? props.size / 2 : 24} height={props.overlaySize !== undefined ? props.overlaySize : props.size !== undefined ? props.size / 2 : 24} className={`${classes.overlayIcon} ${props.position !== undefined ? props.position : 'bottomLeft'}`} /> : ''

  return (
    <Tooltip title={props.tooltip !== undefined ? props.tooltip : props.name} aria-label={props.name} placement="bottom" arrow>
      <span style={{position: 'relative'}}>
        {image}
        {props.overlay !== undefined && overlay}
      </span>
    </Tooltip>
  )
}
