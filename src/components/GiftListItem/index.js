import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

import VillagerIcon from '../VillagerIcon'

const useStyles = makeStyles(() => ({
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
    color: 'green',
    marginLeft: '2.15rem',
    fontSize: 'small'
  }
}));

export default function GiftListItem(props) {
  const classes = useStyles();

  const icon = require(`../../../public/assets/item_icons/${props.icon}`);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.giftIcon}
        image={icon.default}
        title={props.gift}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.gift}>
            {props.gift}
          </Typography>
          {props.villagers.map(villager => <VillagerIcon key={villager} name={villager} />)}
        </CardContent>
      </div>
      
    </Card>
  )
}
