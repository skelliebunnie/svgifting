import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import API from '../../utils/API'

import VillagerCard from '../VillagerCard'
import VillagerIcon from '../VillagerIcon'
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
      padding: '0.25rem 0',
    },

    '& > div:nth-child(2n)': {
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

const villagerIcon = {
  headerName: " ",
  align: 'center',
  disableColumnMenu: true,
  renderCell: ({ value }) => (
    <VillagerIcon name={value} tooltip={false} style={{verticalAlign: 'middle', margin: '0 auto'}} />
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

export default function VillagersList(props) {
  const classes = useStyles();

  const [villagers, setVillagers] = useState([]);
  const { getIcon, universalLoves } = useContext(DatabaseContext)

  const dataGridColumns = [
    { field: "icon", flex: 0, ...villagerIcon },
    { field: 'name', headerName: "Name", flex: 1 },
    { field: 'available', headerName: "Marriage Candidate", flex: 1 },
    { field: 'birthday', headerName: 'Birthday', flex: 1 },
    { field: 'gifts', headerName: 'Loved Gifts', flex: 1, ...giftIcons }
  ]
  
  const [dataGridRows, setDataGridRows] = useState([])

  useEffect(() => {
    API.getVillagers().then(list => {
      let data = list.data;
      const rows = createTableRows(data);
      
      for(var i = 0; i < data.length; i++) {
        // filter out gifts that are not 'loved'
        data[i].Items = data[i].Items.filter(item => item.Gift.preference === 'love')

        for(var j = 0; j < data[i].Items.length; j++) {
          const item = data[i].Items[j];
          const icon = getIcon( item.name, 'item_icons', 'png', false ).default

          data[i].Items[j].icon = icon
        }
      }
      
      setVillagers(data);
      setDataGridRows(rows);

    }).catch(err => console.error(err));
  
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let newRows = [];
    for(var i = 0; i < dataGridRows.length; i++) {
      let row = dataGridRows[i]
      row.gifts = props.includeULoves ? row.allGifts : row.allGifts.filter(item => !universalLoves.includes(item.name))

      newRows.push(row)
    }

    setDataGridRows(newRows);
  // eslint-disable-next-line
  }, [props.includeULoves, universalLoves])

  const createTableRows = (data) => {
    let rows = [];

    for(var i = 0; i < data.length; i++) {
      data[i].Items = data[i].Items.filter(item => item.Gift.preference === 'love')

      let row = {
        id: data[i].id,
        icon: data[i].name,
        name: data[i].name,
        available: data[i].available && data[i].name !== 'Krobus' ? true : false,
        birthday: data[i].Seasons.length > 0 ? `${data[i].Seasons[0].name} ${data[i].Seasons[0].Event.day}`: 'unavailable',
        allGifts: data[i].Items,
        gifts: data[i].Items
      };

      rows.push(row)
    }

    return rows;
  }

  return (
    <Container className={classes.root} maxWidth={(props.format === 'Grid' || props.format === 'Table') ? 'xl' : 'lg'}>
      {/* GRID DISPLAY */}
      {props.format === 'Grid' && 
        villagers.map(villager => <VillagerCard key={villager.name} name={villager.name} status={villager.available} gifts={villager.Items} includeULoves={props.includeULoves} />)
      }
      {/* LIST DISPLAY */}
      {props.format === 'List' &&
        <div className={classes.displayList}>
        {villagers.map(villager => 
          <div key={villager.name}>
            <p style={{margin: 0, padding: 0}}><VillagerIcon name={villager.name} style={{verticalAlign: 'middle'}} /> <strong>{villager.name}</strong> {(villager.available && villager.name !== "Krobus") && <span style={{color: 'green'}}>[Marriage Candidate]</span>}</p>
            <ul className={classes.giftList}>
              {villager.Items.map(item => ((props.includeULoves || (!props.includeULoves && !universalLoves.includes(item.name))) && item.Gift.preference === 'love') && <li key={item.id}><ItemIcon key={item.name} name={item.name} icon={item.icon} size={24} /></li>)}
            </ul>
          </div>
        )}
        </div>
      }

      {/* TABLE DISPLAY */}
      {props.format === 'Table' &&
        <DataGrid rows={dataGridRows} columns={dataGridColumns} pageSize={10} autoHeight />
      }
    </Container>
  );
}
