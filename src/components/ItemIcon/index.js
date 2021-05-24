import { useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const offset = 0;

const useStyles = makeStyles(() => ({
  iconContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '0.15rem 0.2rem',
    padding: 0,
  },
  overlayIcon: {
    position: 'absolute',
    display: 'inline',

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

export default function ItemIcon(props) {
  const classes = useStyles();

  const { getIcon } = useContext(DatabaseContext)

  let overlay_image, icon_image;

  if(props.overlay !== undefined && !props.overlay.includes(".png") && !props.overlay.includes("gif")) {
    overlay_image = require(props.overlay).default

  } else if(props.overlay !== undefined) {
    overlay_image = props.overlay
  }

  if(props.image !== undefined && !props.icon.includes(".png") && !props.icon.includes("gif")) {
    icon_image = require(props.icon).default
  } else if(props.icon !== undefined) {
    icon_image = props.icon
  } else {
    icon_image = getIcon(props.name, 'item_icons', 'png', false).default
  }

  let main_icon = props.swap !== undefined && props.swap === true ? overlay_image : icon_image
  let overlay_icon = props.swap !== undefined && props.swap === true ? icon_image : overlay_image

  if(typeof main_icon === 'object' && main_icon.default !== undefined) main_icon = main_icon.default 
  if(typeof overlay_icon === 'object' && overlay_icon.default !== undefined) overlay_icon = overlay_icon.default 

  const image = <img src={main_icon} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32} style={props.style !== undefined ? {...props.style} : {display: 'inline-block', margin: '0 3px', verticalAlign: 'middle'}} />

  const overlay = props.overlay !== undefined ? <img src={overlay_icon} alt={props.overlayAlt !== undefined ? props.overlayAlt : `Overlay Icon`} width={props.size !== undefined ? props.size / 2 : 24} height={props.size !== undefined ? props.size / 2 : 24} className={`${classes.overlayIcon} ${props.position !== undefined ? props.position : 'bottomLeft'}`} /> : '';

  if(props) {
    return (
      <Tooltip title={props.name} aria-label={props.name} placement="bottom" arrow type="div">
        <p className={classes.iconContainer}>
          {image}
          {(props.overlay !== undefined && props.overlay !== '') &&
            {overlay}
          }
        </p>
      </Tooltip>
    )
  } else {
    return (
      <p className={classes.iconContainer}>
        {image}
        {(props.overlay !== undefined && props.overlay !== '') &&
          {overlay}
        }
      </p>
    )
  }
}
