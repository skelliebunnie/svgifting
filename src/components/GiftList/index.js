import { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'

import GiftListItem from "../GiftListItem";
import NpcGiftContextMenu from "../NpcGiftContextMenu";
import API from '../../utils/API';

import CustomIcon from '../CustomIcon'

const useStyles = makeStyles((theme) => ({
  giftsGrid: {
  	position: 'relative',
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

  const tableRef = useRef(null)
  const tableContainerRef = useRef(null)

  const gifts = props.list || [];
  const [npcs, setNpcs] = useState([])
  const [tablePos, setTablePos] = useState(0)

  const [selectedNpc, setSelectedNpc] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({x: null, y: null, height: 0})

  useEffect(() => {
    API.getNpcs()
      .then(res => setNpcs(res.data))
      .catch(err => console.error(err))
  }, []);

  const handleRightClick = (e, npc) => {
  	e.preventDefault();

  	const targetParent = e.target.offsetParent.offsetParent;
  	const initHeight = (window.innerHeight - e.clientY) - 20;
  	let maxHeight = initHeight;
  	let yPos = targetParent.offsetTop + 50;

  	if(initHeight <= 110) maxHeight = window.innerHeight - e.clientY + 100;

  	if(initHeight <= 110 && initHeight > 60) {
  		yPos = targetParent.offsetTop - 220

  	} else if(initHeight <= 60 && initHeight > 10) {
  		yPos = targetParent.offsetTop - 160

  	} else if(initHeight <= 10) {
  		yPos = targetParent.offsetTop - 120
  	}

  	setSelectedNpc(npc);
		setContextMenuPos({
			x: targetParent.offsetLeft - 65,
			y: yPos,
			height: maxHeight
		})
		setShowContextMenu(true);
  }

  const closeContextMenu = (e) => {
    setContextMenuPos({
      x: null,
      y: null,
      height: 0
    });
    setShowContextMenu(false);
  }

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
 	
 	// DISPLAY STYLE: CARDS
  if(props.display === 'cards') {
    return (
      <Container 
      	className={classes.giftsGrid}
      >
        {gifts.map((gift) => (
          <GiftListItem
            key={gift.name}
            gift={gift.name}
            icon={gift.icon}
            npcs={gift.Npcs}
            contextMenu={handleRightClick}
            showContextMenu={showContextMenu}
            npc={selectedNpc}
          />
        ))}
        <NpcGiftContextMenu
	      	showMenu={showContextMenu}
	      	menuPos={contextMenuPos}
	      	handleClose={closeContextMenu}
	      	preference={props.preference}
	      	npc={selectedNpc}
	      />
      </Container>
    );
  } 
  // DISPLAY STYLE: TABLE
  else {
    return (
    	<>
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
                    {npcs.map((npc) => (
                      <th key={npc.name}>
                        <CustomIcon name={npc.name} mainDir="npc_icons" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gifts.map((gift) => {
                    const giftNpcs = gift.Npcs.map(npc => npc.name);

                    return (
                      <tr key={gift.name}>
                        <th>
                          <CustomIcon name={gift.name} mainDir="item_icons" />
                        </th>
                        {npcs.map((npc) => {
                          let status = giftNpcs.includes(npc.name)
                            ? "Y"
                            : "N";
                          return (
                            <td
                              key={`${npc.name}-${status}`}
                              className={`status-${status}`}
                            >
                              {status === "Y" ? (
                                <CustomIcon
                                  includeTooltip={true}
                                  tooltipText={`Gift: ${gift.name}, NPC: ${npc.name}`}
                                  name={gift.name}
                                  mainDir="item_icons"
                                  overlay={npc.name}
                                  overlayDir="npc_icons"
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
                  {npcs.map((npc) => (
                    <th key={npc.name}>
                      <CustomIcon name={npc.name} mainDir="npc_icons" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gifts.map((gift) => {
                  const giftNpcs = gift.Npcs.map(
                    (npc) => npc.name
                  );

                  return (
                    <tr key={gift.name}>
                      <th>
                        <CustomIcon name={gift.name} />
                      </th>
                      {npcs.map((npc) => {
                        let status = giftNpcs.includes(npc.name)
                          ? "Y"
                          : "N";
                        return (
                          <td
                            key={`${npc.name}-${status}`}
                            className={`status-${status}`}
                          >
                            {status === "Y" ? (
                              <CustomIcon
                                tooltip={`Gift: ${gift.name}, NPC: ${npc.name}`}
                                name={gift.name}
                                mainDir="item_icons"
                                overlay={npc.name}
                                overlayDir="npc_icons"
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
	    </>	
    );
  }
}
