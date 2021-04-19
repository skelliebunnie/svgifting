// import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

export default function VillagerIcon(props) {
  const icon_url = require(`../../../public/assets/villager_icons/${props.name}_Icon.png`);

  return (
    <Tooltip title={props.name} aria-label={props.name} placement="bottom" arrow>
      <img src={icon_url.default} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32} />
    </Tooltip>
  )
}
