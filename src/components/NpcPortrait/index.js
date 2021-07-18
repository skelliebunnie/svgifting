import React from 'react'

export default function NpcPortrait(props) {
  const portrait_url = require(`../../assets/npc_portraits/${props.name}.png`);

  return (
    <img src={portrait_url.default} alt={`${props.name} Icon`} />
  )
}
