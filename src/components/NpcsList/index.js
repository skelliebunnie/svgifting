import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'

import NpcCard from '../NpcCard'
import NpcIcon from '../NpcIcon'
import ItemIcon from '../ItemIcon'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    width: 'auto',
    // height: '40rem'
  },
  displayList: {
    flex: '1 0 auto',
    // display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: 'minmax(fit-content, 1fr)',
    columnGap: 10,
    listStyleType: 'none',
    marginTop: '2rem',
    marginBottom: '2rem',
    maxWidth: '100%',

    '& > *': {
      margin: '0.15rem 0',
      padding: '0.25rem 0 0.5rem',
    },

    '& > *:nth-child(2n)': {
      backgroundColor: 'gainsboro'
    }
  },
  giftList: {
    display: 'flex',
    flexFlow: 'row wrap',
    listStyleType: 'none',
    margin: 0,
    padding: 0,

    '& li': {
      display: 'inline-block',
      width: 'auto',
      flex: 0,
      margin: 0,
      padding: 0,
    }
  }
}));

const npcIcon = {
  headerName: " ",
  align: 'center',
  disableColumnMenu: true,
  renderCell: ({ value }) => (
    <NpcIcon name={value} tooltip={false} style={{verticalAlign: 'middle', margin: '0 auto'}} />
  )
}

const giftIcons = {
  disableColumnMenu: true,
  renderCell: (({value}) => (
    <div>
    {value.length > 0 ? value.map(item => <ItemIcon key={item.name} name={item.name} size={24} style={{position: 'relative', margin: '8px', verticalAlign: 'middle'}} />) : ""}
    </div>
  ))
}

export default function NpcsList(props) {
  const classes = useStyles();

  const { universalLoves, sortNpcData } = useContext(DatabaseContext);

  const [npcs, setNpcs] = useState(props.npcs);

  const dataGridColumns = [
    { field: "icon", flex: 0, ...npcIcon, sortable: false, disableColumnMenu: true },
    { field: 'name', headerName: "Name", flex: 1 },
    { field: 'availableIn', headerName: "Available In", flex: 1, type: 'string' },
    { field: 'marriageable', headerName: "Marriage Candidate", flex: 1, type: 'boolean' },
    { field: 'birthdaySeasonId', hide: true, type: 'number', flex: 1 },
    { field: 'birthdaySeason', hide: true, flex: 1 },
    { field: 'birthdayDate', hide: true, type: 'number', flex: 1 },
    { field: 'birthday',
      headerName: 'Birthday',
      flex: 1,
      valueGetter: (params) => 
      `${params.getValue(params.id, 'birthdaySeason')} ${params.getValue(params.id, 'birthdayDate')}`,
      sortComparator: (v1, v2, param1, param2) => 
        param1.api.getCellValue(param1.id, 'birthdaySeasonId') - param2.api.getCellValue(param2.id, 'birthdaySeasonId')

    },
    { field: 'gifts', headerName: 'Loved Gifts', flex: 1, ...giftIcons, sortable: false }
  ]
  
  const [dataGridRows, setDataGridRows] = useState(npcs)

  const [sortBy, setSortBy] = useState(props.sortBy)

  useEffect(() => {
    setNpcs(props.npcs);
    const rows = createTableRows(props.npcs);
    setDataGridRows(rows);

  }, [props.npcs]);

  useEffect(() => {
    // sortData(npcs, sortBy);
    
    let newRows = [];
    for(var i = 0; i < dataGridRows.length; i++) {
      let row = dataGridRows[i]
      row.gifts = props.includeULoves ? row.allGifts : row.allGifts.filter(item => !universalLoves.includes(item.name))

      newRows.push(row)
    }

    setDataGridRows(newRows);
  // eslint-disable-next-line
  }, [props.includeULoves, universalLoves])

  useEffect(() => {
    const npcData = sortNpcData(npcs, props.sortBy);
    setNpcs(npcData);
    
    createTableRows(npcData);

    setSortBy(props.sortBy);
    //eslint-disable-next-line
  }, [props.sortBy])

  const createTableRows = (data) => {
    let rows = [];

    for(var i = 0; i < data.length; i++) {
      data[i].Items = data[i].Items.filter(item => item.Gift.preference === 'love')

      let row = {
        id: data[i].id,
        icon: data[i].name,
        name: data[i].name,
        marriageable: data[i].marriageable && data[i].name !== 'Krobus' ? true : false,
        birthdaySeasonId: data[i].Seasons.length > 0 ? data[i].Seasons[0].id : 0,
        birthdaySeason: data[i].Seasons.length > 0 ? data[i].Seasons[0].name : '',
        birthdayDate: data[i].Seasons.length > 0 ? data[i].Seasons[0].Event.day : 0,
        birthday: data[i].Seasons.length > 0 ? `${data[i].Seasons[0].name} ${data[i].Seasons[0].Event.day}`: 'unavailable',
        allGifts: data[i].Items,
        gifts: data[i].Items,
        availableIn: data[i].availableIn
      };

      rows.push(row)
    }

    return rows;
  }

  return (
    <Container
      className={classes.root}
      maxWidth={
        props.format === "Grid" || props.format === "Table" ? "xl" : "lg"
      }
    >
      {/* GRID DISPLAY */}
      {props.format === "Grid" &&
        npcs.map((npc) => (
          <NpcCard
            key={npc.name}
            name={npc.name}
            status={npc.marriageable}
            gifts={npc.Items}
            includeULoves={props.includeULoves}
            data={npc}
            includeLink={true}
            availableIn={npc.availableIn}
          />
        ))}
      {/* LIST DISPLAY */}
      {props.format === "List" && (
        <div className={classes.displayList}>
          {npcs.map((npc) => (
            <article key={npc.name}>
              <section style={{ display: "flex", flexFlow: "row wrap" }}>
                <div
                  style={{ flex: 0, margin: 0, padding: 0, lineHeight: "1rem" }}
                >
                  <NpcIcon
                    name={npc.name}
                    style={{ verticalAlign: "middle", margin: 0 }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>{npc.name}</strong>{" "}
                    {npc.available && npc.name !== "Krobus" && (
                      <span style={{ color: "green" }}>
                        [Marriage Candidate]
                      </span>
                    )}
                  </p>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Birthday:</strong> {npc.birthday}
                  </p>
                </div>
              </section>
              <ul className={classes.giftList}>
                {npc.Items.map(
                  (item) =>
                    (props.includeULoves ||
                      (!props.includeULoves &&
                        !universalLoves.includes(item.name))) &&
                    item.Gift.preference === "love" && (
                      <li key={item.id}>
                        <ItemIcon
                          key={item.name}
                          name={item.name}
                          icon={item.icon}
                          size={24}
                        />
                      </li>
                    )
                )}
              </ul>
            </article>
          ))}
        </div>
      )}

      {/* TABLE DISPLAY */}
      {props.format === "Table" && (
        <DataGrid
          rows={dataGridRows}
          columns={dataGridColumns}
          pageSize={10}
          autoHeight
          components={{ Toolbar: GridToolbar }}
          disableColumnSelector={true}
          disableColumnFilter={true}
        />
      )}
    </Container>
  );
}
