import { useState, useEffect, useContext } from 'react';
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ItemIcon from "../ItemIcon"

import API from "../../utils/API"
import GeneralFunctions from "../../utils/GeneralFunctions"

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: theme.palette.dayblue[200],
    position: 'absolute',
    listStyleType: 'none',
    textIndent: 0,
    margin: 0,
  	padding: 0,
  	boxShadow: `1px 1px 3px ${theme.palette.gray[400]}`,

  	'& li:last-child': { paddingBottom: '0.5rem' },

    '& li + li': {
    	padding: '0.25rem 1rem 0.15rem 0.25rem',
      marginTop: '0.15rem',
    },
    '& li:hover': {
      backgroundColor: theme.palette.dayblue[300],
      cursor: 'pointer',
    }
  },
  list: {
    
  },
  menuTitle: {
  	backgroundColor: theme.palette.dayblue[500],
  	color: 'white',
  	cursor: 'initial',
  	padding: '0.5rem',
  	fontWeight: 'bold',
  	textAlign: 'center',

  	'ul &:hover, ul &:focus': {
  		backgroundColor: theme.palette.dayblue[500],
  		cursor: 'initial',
  	}
  }
}));

export default function NpcGiftContextMenu(props) {
	const classes = useStyles();

	const { universalLoves } = useContext(DatabaseContext);

	const includeUniversalLoves = JSON.parse(localStorage.getItem("sv_include_uloves")) || false;

	const [selectedNpc, setSelectedNpc] = useState({id: null, name: ''});
	const [giftsList, setGiftsList] = useState([]);
	const [preference, setPreference] = useState("");

	useEffect(() => {
		const container = document.body;

		if(props.showMenu && props.npc !== null && props.preference !== null) {
			container.style.overflow = 'hidden';
			setSelectedNpc(props.npc);

			let pref = GeneralFunctions.toTitleCase(props.preference);
			if(pref !== "Neutral") pref += "d";

			setPreference(pref);

			API.getGiftsByNpcIdAndPreference(props.npc.id, props.preference)
				.then(res => {
					let list = res.data;

					if(!includeUniversalLoves) {
						list = list.filter(gift => !universalLoves.includes(gift.name))
					}

					setGiftsList(list);
				})
				.catch(err => console.error(err))
		} else {
			container.style.overflow = 'auto';
		}

	}, [props.showMenu, props.npc, props.preference])

  return(
  	<>
  	{props.showMenu ?
  		<ClickAwayListener onClickAway={props.handleClose}>
  			<ul
	        onContextMenu={props.handleClose}
	        className={classes.menu}
	        style={{
	        	display: props.showMenu ? 'block' : 'hidden',
	        	top: props.menuPos.y,
	        	left: props.menuPos.x,
	        	maxHeight: props.menuPos.height,
	        	overflow: 'auto'
	        }}
	  		>
	  			<li className={classes.menuTitle} onContextMenu={props.handleClose}>{selectedNpc.name}'s {preference} Gifts</li>
	  			{giftsList.map(gift => <li key={gift.id} onClick={props.handleClose} onContextMenu={props.handleClose}><ItemIcon name={gift.name} size={24} /> {gift.name}</li>)}
	  		</ul>
  		</ClickAwayListener>
      :
      undefined
  	}
  	</>
  )
}