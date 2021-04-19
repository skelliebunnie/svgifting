import React from 'react'

export default function VillagerIcon(props) {
  const icon_url = require(`../../../public/assets/villager_icons/${props.name}_Icon.png`);

  return (
    <img src={icon_url.default} alt={`${props.name} Icon`} width={props.size !== undefined ? props.size : 32} height={props.size !== undefined ? props.size : 32} />
  )
}
