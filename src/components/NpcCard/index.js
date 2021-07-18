import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from '../../contexts/DatabaseContext'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core'


import NpcIcon from '../NpcIcon'
import ItemIcon from '../ItemIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1 0 auto",
    display: "flex",
    margin: 24,
    textAlign: "left",
    justifyContent: "space-between",
    boxSizing: "border-box",
    minHeight: 200,
    color: theme.palette.dayblue[400],
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "45%",
      maxWidth: "45%"
    },
    [theme.breakpoints.up("xl")]: {
      width: '30%',
      maxWidth: '30%'
    }
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  portrait: {
    minWidth: 200,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    margin: "0 0 0 0.5rem",
  },
  marriageable: {
    borderLeft: "8px solid transparent",
    borderLeftColor: theme.palette.green[400],
  },
  birthday: {
    display: "block",
    marginLeft: 40,
    color: theme.palette.gray[500],
  },
  icon: {
    display: "inline-block",
    verticalAlign: "bottom",
    position: "relative",
    left: "-0.25rem",
  },
  name: {
    display: "inline-block",
    verticalAlign: "center",
    fontVariant: "small-caps",
    fontSize: "2.25rem",
    marginBottom: "0",
  },
  status: {
    position: "relative",
    color: theme.palette.green[700],
    marginLeft: "0.5rem",
    bottom: "0.25rem",
    fontSize: "small",
    display: "inline-block",
    verticalAlign: "center",
  },
  giftsContainer: {
    position: "relative",
    width: "80%",
    marginTop: "1.5rem",
    marginBottom: "1rem",
    padding: "1.5rem 1.5rem 0.5rem 2.5rem",
    borderRadius: "4px",
    border: "1px solid gainsboro",
  },
  giftsTitle: {
    position: "absolute",
    top: "-1rem",
    left: "-1.75rem",
    background: "white",
    padding: "0 0.75rem 0 1.25rem",
  },
}));

export default function NpcCard(props) {
  const classes = useStyles();
  const { universalLoves, getURL } = useContext(DatabaseContext);

  const portrait_url = require(`../../assets/npc_portraits/${props.name}.png`);
  const love_emote = require(`../../assets/emotes/42px-Emote_Heart.png`);

  const npc_url = props.includeLink ? getURL(props.name) : '';

  const [gifts, setGifts] = useState([])

  useEffect(() => {
    if(props.includeULoves) {
      setGifts(props.gifts)

    } else {
      setGifts( props.gifts.filter(gift => !universalLoves.includes(gift.name)) )

    }
  // eslint-disable-next-line
  }, [props.includeULoves])

  return (
    <Card
      className={
        props.status && props.name !== "Krobus"
          ? `${classes.root} ${classes.marriageable}`
          : classes.root
      }
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <NpcIcon name={props.name} />
          <Typography component="h5" variant="h5" className={classes.name}>
            {props.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.status}>
            <strong>
              {props.status && props.name !== "Krobus"
                ? "Marriage Candidate"
                : ""}
            </strong>
          </Typography>
          <Typography className={classes.birthday}>
            <strong>Birthday:</strong>{" "}
            {`${props.data.Seasons[0].name} ${props.data.Seasons[0].Event.day}`}
          </Typography>
          {gifts.length > 0 && (
            <Box>
              <section className={classes.giftsContainer}>
                <Typography
                  component="h5"
                  variant="h5"
                  className={classes.giftsTitle}
                >
                  <img
                    src={love_emote.default}
                    alt="Love"
                    style={{ width: 24, marginRight: "0.35rem" }}
                  />
                  {/* <FontAwesomeIcon icon={faHeart} style={{fontSize: '2rem', color: 'crimson', verticalAlign: 'middle'}} /> */}
                  Loved Gifts:
                </Typography>
                {gifts.map(
                  (gift) =>
                    gift.Gift.preference === "love" && (
                      <ItemIcon
                        key={gift.name}
                        name={gift.name}
                        icon={gift.icon}
                        size={24}
                        includeLink={true}
                      />
                    )
                )}
              </section>
              {props.includeLink ? <a href={npc_url} target="_blank" rel="noreferrer">View Wiki</a> : ''}
            </Box>
          )}
        </CardContent>
      </div>
      <CardMedia
        className={classes.portrait}
        image={portrait_url.default}
        title={props.name}
      />
    </Card>
  );
}
