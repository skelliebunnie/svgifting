import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

import VillagerIcon from '../VillagerIcon'

const useStyles = makeStyles(() => ({
  root: {
    flex: '1 0 100%',
    display: 'flex',
    margin: 24,
    textAlign: 'left',
    justifyContent: 'space-between',
    maxWidth: '20%',
    boxSizing: 'border-box'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  portrait: {
    width: 151,
  },
  marriageable: {
    borderLeft: '8px solid greenyellow'
  },
  icon: {
    display: 'inline-block',
    verticalAlign: 'bottom',
    position: 'relative',
    left: '-0.25rem'
  },
  name: {
    display: 'inline-block',
  },
  status: {
    color: 'green',
    marginLeft: '2.15rem',
    fontSize: 'small'
  }
}));

export default function VillagerCard(props) {
  const classes = useStyles();
  const portrait_url = require(`../../../public/assets/villager_portraits/${props.name}.png`);

  return (
    <Card className={props.status ? `${classes.root} ${classes.marriageable}` : classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <VillagerIcon name={props.name} />
          <Typography component="h5" variant="h5" className={classes.name}>
            {props.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.status}>
            <strong>{props.status && 'Marriage Candidate'}</strong>
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.portrait}
        image={portrait_url.default}
        title={props.name}
      />
    </Card>
  )
}
