import { useState, useEffect, useRef, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'
import GiftListItem from "../GiftListItem";
import VillagerIcon from '../VillagerIcon'
import ItemIcon from '../ItemIcon'
import API from '../../utils/API'

const useStyles = makeStyles((theme) => ({
  giftsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    maxWidth: "90%",
    gridGap: "1rem",
    margin: "0 auto",
    padding: "2rem 0 4rem",

    [theme.breakpoints.up("md")]: {
      maxWidth: "80%",
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  giftsTable: {
    flex: 1,
    display: "block",
    textAlign: "left",
    margin: "2.5rem 0",
    padding: 0,
    overflowY: "hidden",

    "& div": {
      margin: "1rem 0 0",
      padding: 0,
      height: "100%",
      [theme.breakpoints.down("md")]: {
        overflowY: "auto",
        overflowX: "hidden",
      },
    },

    "& .status-Y": {
      backgroundColor: theme.palette.green[400],
    },

    "& .status-N": {
      backgroundColor: theme.palette.red[400],
    },

    "& table": {
      margin: 0,
      width: "100%",
    },

    [theme.breakpoints.up("md")]: {
      marginTop: "1rem",
    },
  },
  scrollNav: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    padding: "0.25rem 0",
    alignItems: "center",
    // backgroundColor: theme.palette.dayblue[200],
    textAlign: "center",
    marginBottom: "1rem",
    height: "100%",
    width: "100%",
    position: "absolute",
    // zIndex: 10,

    "& > span": {
      flex: "1 0 20%",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "2.5rem",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "x-large",
      height: "100%",
      backgroundColor: theme.palette.dayblue[200],
      // '&:first-child': {
      //   borderRight: '4px solid white'
      // },

      "&:hover": {
        backgroundColor: theme.palette.dayblue[400],
      },
    },
  },
}));

export default function GiftList(props) {
  const classes = useStyles();

  const { getIcon } = useContext(DatabaseContext);

  const tableRef = useRef(null)
  const tableContainerRef = useRef(null)

  const gifts = props.list || [];
  const [villagers, setVillagers] = useState([])
  const [tablePos, setTablePos] = useState(0)

  useEffect(() => {
    API.getVillagers()
      .then(res => setVillagers(res.data))
      .catch(err => console.error(err))
  }, []);

  const scrollTable = (direction) => {
    const tableWidth = tableRef.current.clientWidth;
    const maxScroll = Math.floor(tableWidth / (tableWidth / window.innerWidth));
    let offset = Math.floor( (tableWidth / Math.ceil(tableWidth / window.innerWidth)) );
    let newPos = 0;

    if(direction === 'right' && Math.abs(tablePos) < maxScroll + (tableWidth / 2)) {
      newPos = tablePos - (offset / 1.5)
    }

    if (direction === "left" && tablePos < 0) {
      newPos = tablePos + offset
    }

    if (offset === 0) {
      newPos = 0;
    }

    setTablePos(newPos);
  }
 
  if(props.display === 'grid') {
    return (
      <Container className={classes.giftsGrid}>
        {gifts.map((gift) => (
          <GiftListItem
            key={gift.name}
            gift={gift.name}
            icon={gift.icon}
            villagers={gift.Villagers}
          />
        ))}
      </Container>
    );
  } else {
    return (
      <Container className={classes.giftsTable} maxWidth="xl">
        {window.innerWidth < 768 ? (
          <div className={classes.scrollNav}>
            <span
              className={classes.scrollLeft}
              onClick={() => scrollTable("left")}
            >
              <NavigateBefore />
            </span>
            <div ref={tableContainerRef}>
              <table
                ref={tableRef}
                style={{ position: "relative", left: tablePos }}
              >
                <thead>
                  <tr>
                    <th style={{ position: "relative" }}></th>
                    {villagers.map((villager) => (
                      <th key={villager.name}>
                        <VillagerIcon name={villager.name} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gifts.map((gift) => {
                    const giftVillagers = gift.Villagers.map(
                      (villager) => villager.name
                    );

                    return (
                      <tr key={gift.name}>
                        <th>
                          <ItemIcon name={gift.name} />
                        </th>
                        {villagers.map((villager) => {
                          let status = giftVillagers.includes(villager.name)
                            ? "Y"
                            : "N";
                          return (
                            <td
                              key={`${villager.name}-${status}`}
                              className={`status-${status}`}
                            >
                              {status === "Y" ? (
                                <VillagerIcon
                                  tooltip={`Gift: ${gift.name}, NPC: ${villager.name}`}
                                  name={villager.name}
                                  overlay={getIcon(gift.name).default}
                                  swap={true}
                                  size={38}
                                  overlaySize={32}
                                />
                              ) : (
                                ""
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <span
              className={classes.scrollRight}
              onClick={() => scrollTable("right")}
            >
              <NavigateNext />
            </span>
          </div>
        ) : (
          <div ref={tableContainerRef}>
            <table
              ref={tableRef}
              style={{ position: "relative", left: tablePos }}
            >
              <thead>
                <tr>
                  <th style={{ position: "relative" }}></th>
                  {villagers.map((villager) => (
                    <th key={villager.name}>
                      <VillagerIcon name={villager.name} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gifts.map((gift) => {
                  const giftVillagers = gift.Villagers.map(
                    (villager) => villager.name
                  );

                  return (
                    <tr key={gift.name}>
                      <th>
                        <ItemIcon name={gift.name} />
                      </th>
                      {villagers.map((villager) => {
                        let status = giftVillagers.includes(villager.name)
                          ? "Y"
                          : "N";
                        return (
                          <td
                            key={`${villager.name}-${status}`}
                            className={`status-${status}`}
                          >
                            {status === "Y" ? (
                              <VillagerIcon
                                tooltip={`Gift: ${gift.name}, NPC: ${villager.name}`}
                                name={villager.name}
                                overlay={getIcon(gift.name).default}
                                swap={true}
                                size={38}
                                overlaySize={32}
                              />
                            ) : (
                              ""
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    );
  }
}
