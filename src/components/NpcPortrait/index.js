import React from 'react'

export default function NpcPortrait(props) {
	let npc_name = props.name;
	if(npc_name.includes(" ")) npc_name = npc_name.split(" ")[0];

  const portrait_url = require(`../../assets/npc_portraits/${npc_name}.png`);

  return (
    <img src={portrait_url.default} alt={`${props.name} Icon`} />
  )
}
