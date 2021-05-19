import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const offset = '-4px';

const useStyles = makeStyles(() => ({
  iconContainer: {
    position: 'relative',
    display: 'inline-block',
    padding: 0,
    margin: '0.15rem 0.2rem'
  },
  overlayIcon: {
    position: 'absolute',
    display: 'inline-block',

    '&.top': { top: offset, width: '100%', margin: '0 auto' },
    '&.bottom': { bottom: offset, width: '100%', margin: '0 auto' },
    '&.left': { left: offset, height: '100%', margin: 'auto 0' },
    '&.right': { right: offset, height: '100%', margin: 'auto 0' },
    '&.topLeft': { top: offset, left: offset },
    '&.topRight': { top: offset, right: offset },
    '&.bottomLeft': { bottom: offset, left: offset },
    '&.bottomRight': { bottom: offset, right: offset },
  }
}));

export default function VillagerIcon(props) {
  const classes = useStyles();
  const icon_url = require(`../../assets/villager_icons/${props.name}_Icon.png`);

  const image = <img src={props.swap && props.overlay !== undefined ? props.overlay : icon_url.default} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32} style={props.style !== undefined ? {...props.style} : {margin: 0}} />;

  const overlay = props.overlay !== undefined ? <img src={props.swap ? icon_url.default : props.overlay} alt={props.overlayAlt !== undefined ? props.overlayAlt : 'Overlay Icon'} width={props.overlaySize !== undefined ? props.overlaySize : props.size !== undefined ? props.size / 2 : 24} height={props.overlaySize !== undefined ? props.overlaySize : props.size !== undefined ? props.size / 2 : 24} className={`${classes.overlayIcon} ${props.position !== undefined ? props.position : 'bottomLeft'}`} /> : ''

  return (
    <Tooltip title={props.tooltip !== undefined ? props.tooltip : props.name} aria-label={props.name} placement="bottom" arrow>
      <p className={classes.iconContainer}>
        {image}
        {props.overlay !== undefined && overlay}
      </p>
    </Tooltip>
  )
}
