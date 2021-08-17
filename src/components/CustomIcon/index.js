import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from "@material-ui/core/Tooltip";

const offset = "-4px";
const useStyles = makeStyles(() => ({
  iconContainer: {
    position: "relative",
    display: "inline-block",
    margin: "0.15rem 0.2rem",
    padding: 0,
  },
  overlayIcon: {
    position: "absolute",
    display: "inline",

    "&.top": { top: offset, width: "100%", margin: "0 auto" },
    "&.bottom": { bottom: offset, width: "100%", margin: "0 auto" },
    "&.left": { left: offset, height: "100%", margin: "auto 0" },
    "&.right": { right: offset, height: "100%", margin: "auto 0" },
    "&.topLeft": { top: offset, left: offset },
    "&.topRight": { top: offset, right: offset },
    "&.bottomLeft": { bottom: offset, left: offset },
    "&.bottomRight": { bottom: offset, right: offset },
  },
}));

// props = data (name, etc.), mainDir, mainExt, overlay, overlayDir, overlayExt, overlayAlt, includeLink, includeTooltip, tooltipText, tooltipPlacement
export default function CustomIcon(props) {
  const classes = useStyles();

  const { getIcon, getURL } = useContext(DatabaseContext);

  const [image, setImage] = useState("");
  const [overlay, setOverlay] = useState("");
  const [url, setUrl] = useState("");
  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    constructIcon();

    if(props.includeTooltip || props.includeTooltip === undefined) {
      setTooltipText(props.tooltipText !== undefined ? props.tooltipText : props.name !== undefined ? props.name : props.data !== undefined ? props.data.name : '');
    }
  // eslint-disable-next-line
  }, [])

  useEffect(() => {

    constructIcon();

  // eslint-disable-next-line
  }, [props.name, props.maindir, props.overlay, props.overlaydir, props.overlayPosition, props.tooltipPlacement, props.size, props.style, props.includeLink])

  const constructIcon = () => {
    let name, iconName;

    if (props.name !== undefined) {
      name = props.name;

    } else if (props.data !== undefined) {
      name = props.data.name
    }

    if(props.iconName !== undefined) {
      iconName = props.icon;
    } else {
      iconName = name;
    }

    const mainIcon = getIcon(
      iconName,
      props.mainDir !== "undefined" ? props.mainDir : "item_icons",
      props.mainExt !== undefined && props.mainExt !== "default" 
        ? props.mainExt 
        : "png",
      false
    ).default;

    setImage(
      <img
        src={mainIcon}
        alt={`${name} Icon`}
        width={props.size !== undefined ? props.size : 32}
        height={props.size !== undefined ? props.size : 32}
        style={
          props.style !== undefined
            ? { ...props.style }
            : { display: "inline-block", margin: "0 3px", verticalAlign: "middle" }
        }
      />
    );
    
    if(props.overlay !== undefined) {
      
      const overlayIcon = getIcon(
        props.overlay,
        props.overlayDir !== undefined ? props.overlayDir : "item_icons",
        props.overlayExt !== undefined && props.overlayExt !== "default"
        ? props.overlayExt
        : "png",
        false
      ).default;
      
      let overlayPosition = 'bottomLeft';
      if(props.overlayPosition !== undefined && props.overlayPosition !== 'default') {
        overlayPosition = props.overlayPosition;
      }

      setOverlay(
        <img
          src={overlayIcon}
          alt=""
          width={props.overlaySize !== undefined && props.overlaySize !== 24 ? props.overlaySize : props.size !== undefined ? props.size / 2 : 24}
          height={props.overlaySize !== undefined && props.overlaySize !== 24 ? props.overlaySize : props.size !== undefined ? props.size / 2 : 24}
          className={`${classes.overlayIcon} ${overlayPosition}`}
        />
      );
    }
    
    if (props.includeLink) {
      setUrl(getURL(name));
    }
  }

  if (props.includeTooltip || props.includeTooltip === undefined) {
    return (
      <Tooltip
        title={tooltipText}
        aria-label={tooltipText}
        placement={
          props.tooltipPlacement !== undefined
            ? props.tooltipPlacement
            : "bottom"
        }
        arrow
        type="div"
      >
        {props.includeLink ? (
          <a href={url} target="_blank" rel="noreferrer">
            <p className={classes.iconContainer}>
              {image}
              {overlay}
            </p>
          </a>
        ) : (
          <p className={classes.iconContainer}>
            {image}
            {overlay}
          </p>
        )}
      </Tooltip>
    );
  } else {
    return (
      <>
        {props.includeLink ? (
          <a href={url} target="_blank" rel="noreferrer">
            <p className={classes.iconContainer}>
              {image}
              {overlay}
            </p>
          </a>
        ) : (
          <p className={classes.iconContainer}>
            {image}
            {overlay}
          </p>
        )}
      </>
    );
  }
}
