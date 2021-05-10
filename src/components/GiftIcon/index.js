// import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

export default function GiftIcon(props) {
  const toTitleCase = (str) => {
    str = str.split(' ');

    for(var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    return str.join(' ');
  }

  const item_name = toTitleCase(props.name);
  const filename = '24px-' + toTitleCase(props.name).replace('\'', '').split(' ').join('_') + '.png';
  const icon_url = (file) => {
    try {
      return require(`../../assets/item_icons/${file}`) ;
    } catch (err) {
      return require('../../assets/item_icons/Error_Item.png')
    }
  }

  return (
    <Tooltip title={item_name} aria-label={item_name} placement="bottom" arrow>
      <img src={icon_url(filename).default} alt={`${item_name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32}  style={props.style !== undefined ? {...props.style} : {display: 'inline-block', margin: '0 3px', verticalAlign: 'middle'}} />
    </Tooltip>
  )
}
