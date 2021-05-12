// import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

export default function GiftIcon(props) {

  if(props.tooltip) {
    return (
      <Tooltip title={props.name} aria-label={props.name} placement="bottom" arrow>
        <img src={props.icon} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32}  style={props.style !== undefined ? {...props.style} : {display: 'inline-block', margin: '0 3px', verticalAlign: 'middle'}} />
      </Tooltip>
    )
  } else {
    return (
      <img src={props.icon} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32}  style={props.style !== undefined ? {...props.style} : {display: 'inline-block', margin: '0 3px', verticalAlign: 'middle'}} />
    )
  }
}
