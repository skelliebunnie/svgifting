import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart } from '@fortawesome/pro-duotone-svg-icons'

import VillagerIcon from '../VillagerIcon'
import GiftIcon from '../GiftIcon'

const useStyles = makeStyles(() => ({
  root: {
    flex: '1 0 100%',
    display: 'flex',
    margin: 24,
    textAlign: 'left',
    justifyContent: 'space-between',
    maxWidth: '30%',
    boxSizing: 'border-box',
    minHeight: 200,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  portrait: {
    minWidth: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    margin: '0 0 0 0.5rem'
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
    verticalAlign: 'center',
    fontVariant: 'small-caps',
    fontSize: '2.25rem',
    marginBottom: '1rem'
  },
  status: {
    position: 'relative',
    color: 'green',
    marginLeft: '0.5rem',
    bottom: '0.25rem',
    fontSize: 'small',
    display: 'inline-block',
    verticalAlign: 'center'
  },
  giftsContainer: {
    position: 'relative',
    width: '80%',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    padding: '1.5rem 1.5rem 0.5rem 2.5rem',
    borderRadius: '4px',
    border: '1px solid gainsboro'
  },
  giftsTitle: {
    position: 'absolute',
    top: '-1rem',
    left: '-1.75rem',
    background: 'white',
    padding: '0 0.75rem 0 1.25rem',
  }
}));

export default function VillagerCard(props) {
  const classes = useStyles();
  const portrait_url = require(`../../assets/villager_portraits/${props.name}.png`);
  const love_emote = require(`../../assets/emotes/42px-Emote_Heart.png`);

  return (
    <Card className={props.status && props.name !== 'Krobus' ? `${classes.root} ${classes.marriageable}` : classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <VillagerIcon name={props.name} />
          <Typography component="h5" variant="h5" className={classes.name}>
            {props.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.status}>
            <strong>{props.status && props.name !== 'Krobus' ? 'Marriage Candidate' : ''}</strong>
          </Typography>
          {props.gifts.length > 0 &&
          <Box>
            <section className={classes.giftsContainer}>
            <Typography component="h5" variant="h5" className={classes.giftsTitle}>
              <img src={love_emote.default} alt="Love" style={{ width: 24, marginRight: '0.35rem' }} />
              {/* <FontAwesomeIcon icon={faHeart} style={{fontSize: '2rem', color: 'crimson', verticalAlign: 'middle'}} /> */}
              Loved Gifts:
              </Typography>
             {props.gifts.map(gift => gift.Gift.preference === 'love' && <GiftIcon key={gift.name} name={gift.name} size={24} />)}
            </section>
          </Box>
          }
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
