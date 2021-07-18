import { useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

import NpcIcon from '../NpcIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1 0 initial',
    width: '100%',
    display: 'flex',
    textAlign: 'left',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  giftIcon: {
    minWidth: 54,
    backgroundSize: '32px !important',
    backgroundPosition: 'center 0.75rem',
    borderRight: `1px solid ${theme.palette.dayblue[400]}`,
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

  const { universalLoves } = useContext(DatabaseContext)

  return (
    <Card className={classes.root} style={universalLoves.includes(props.gift) ? {border: '4px solid gold'} : {border: '4px solid transparent'}}>
      <CardMedia
        className={classes.giftIcon}
        image={props.icon.default}
        title={props.gift}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.gift}>
            {props.gift}
          </Typography>
          {props.npcs.map(npc => <NpcIcon key={npc.name} name={npc.name} />)}
        </CardContent>
      </div>
      
    </Card>
  )
}
