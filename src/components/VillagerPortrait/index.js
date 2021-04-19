import React from 'react'

export default function VillagerPortrait(props) {
  const portrait_url = require(`../../../public/assets/villager_portraits/${props.name}.png`);

  return (
    <img src={portrait_url.default} alt={`${props.name} Icon`} />
  )
}
