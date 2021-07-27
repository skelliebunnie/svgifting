// import { useState, useEffect } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Edit, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.dayblue[100],
  },
  list: {
    '& li + li': {
      marginTop: '0.15rem'
    },
    '& li:hover': {
      backgroundColor: theme.palette.dayblue[300]
    }
  },
}));

export default function EventsAdminContextMenu(props) {
  const classes = useStyles();

  if(props.showMenu)
    return (
      <Menu
        keepMounted
        open={props.menuPos.y !== null}
        onClose={props.handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          props.menuPos.y !== null && props.menuPos.x !== null
            ? { top: props.menuPos.y, left: props.menuPos.x }
            : undefined
        }
        elevation={2}
        classes={classes}
        button={false}
      >
        <MenuItem onClick={(e) => props.handleClose(e, 'edit')}><Edit />&nbsp;&nbsp;Edit{props.label !== undefined ? ` ${props.label}` : ''}</MenuItem>
        <MenuItem onClick={(e) => props.handleClose(e, 'delete')}><Delete />&nbsp;&nbsp;Delete{props.label !== undefined ? ` ${props.label}` : ''}</MenuItem>
        {/* <MenuItem onClick={(e) => props.handleClose(e, 'view')}>Details</MenuItem>
        <MenuItem onClick={(e) => props.handleClose(e, 'wiki')}>Wiki</MenuItem> */}
      </Menu>
    );
  else return null;
}
