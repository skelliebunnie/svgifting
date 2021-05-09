import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

import VillagerIcon from '../VillagerIcon'
import GiftIcon from '../GiftIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1 0 initial',
    width: '100%',
    display: 'flex',
    textAlign: 'left',
    justifyContent: 'flex-start',
    boxSizing: 'border-box'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  giftIcon: {
    width: 64,
    backgroundSize: 32
  },
  gift: {
    display: 'block',
  },
  status: {
    color: theme.palette.green[600],
    marginLeft: '2.15rem',
    fontSize: 'small'
  }
}));

export default function GiftListItem(props) {
  const classes = useStyles();

  // let fileName = '24px-' + props.gift.replace("'", "").replace(",", "")
  // if(fileName.includes(" ")) {
  //   fileName = fileName.split(' ')

  //   for(var word in fileName) {
  //     word = word.length > 1 ? word.substring(0,1).toUpperCase() + word.substring(1, word.length - 1).toLowerCase() : word.toUpperCase()
  //   }
  //   fileName = fileName.join('_')
  // }
  // fileName += '.png'

  // const icon = require(`../../assets/item_icons/${fileName}`) || require('../../assets/item_icons/Error_Item.png');

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.giftIcon}
        image={<GiftIcon name={props.gift} />}
        title={props.gift}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.gift}>
            {props.gift}
          </Typography>
          {props.villagers.map(villager => <VillagerIcon key={villager.name} name={villager.name} />)}
        </CardContent>
      </div>
      
    </Card>
  )
}
