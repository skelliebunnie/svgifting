import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
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
    { field: "icon", flex: 0, ...villagerIcon, sortable: false, disableColumnMenu: true },
    { field: 'name', headerName: "Name", flex: 1 },
    { field: 'available', headerName: "Marriage Candidate", flex: 1, type: 'boolean' },
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
  
  const [dataGridRows, setDataGridRows] = useState(villagers)

  const [sortBy, setSortBy] = useState(props.sortBy)

  useEffect(() => {
    API.getVillagers().then(list => {
      let data = sortData(list.data, props.sortBy);
      
      for(var i = 0; i < data.length; i++) {
        // filter out gifts that are not 'loved'
        data[i].Items = data[i].Items.filter(item => item.Gift.preference === 'love')

        for(var j = 0; j < data[i].Items.length; j++) {
          const item = data[i].Items[j];
          const icon = getIcon( item.name, 'item_icons', 'png', false ).default
          data[i].birthday = data[i].Seasons.length > 0 ? `${data[i].Seasons[0].name} ${data[i].Seasons[0].Event.day}`: 'unavailable';
          data[i].Items[j].icon = icon
        }

        data[i].birthdaySeasonId = data[i].Seasons[0].id;
        data[i].birthdaySeason = data[i].Seasons[0].name;
        data[i].birthdayDate = data[i].Seasons[0].Event.day
      }

      const rows = createTableRows(data);
      
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

  useEffect(() => {
    const villagerData = sortData(villagers, props.sortBy);
    setVillagers(villagerData);
    
    createTableRows(villagerData);

    setSortBy(props.sortBy);
  }, [props.sortBy])

  const createTableRows = (data) => {
    let rows = [];

    for(var i = 0; i < data.length; i++) {
      data[i].Items = data[i].Items.filter(item => item.Gift.preference === 'love')

      let row = {
        id: data[i].id,
        icon: data[i].name,
        name: data[i].name,
        available: data[i].available && data[i].name !== 'Krobus' ? true : false,
        birthdaySeasonId: data[i].Seasons.length > 0 ? data[i].Seasons[0].id : 0,
        birthdaySeason: data[i].Seasons.length > 0 ? data[i].Seasons[0].name : '',
        birthdayDate: data[i].Seasons.length > 0 ? data[i].Seasons[0].Event.day : 0,
        birthday: data[i].Seasons.length > 0 ? `${data[i].Seasons[0].name} ${data[i].Seasons[0].Event.day}`: 'unavailable',
        allGifts: data[i].Items,
        gifts: data[i].Items
      };

      rows.push(row)
    }

    return rows;
  }

  const sortData = (data, sortBy='Villager Name') => {

    if(sortBy === 'Availability') {
      data.sort((a, b) => {
        // true first
        return (a.available === b.available) ? 0 : a.available && a.name !== 'Krobus' ? -1 : 1
        // false first
        // return (a.available === b.available)? 0: a.available ? 1 : -1;
      })
    } else if(sortBy === 'Birthday <Season, Day>') {
      data.sort((a, b) => {
        if(a.birthdaySeasonId === b.birthdaySeasonId) {
          return a.birthdayDate > b.birthdayDate ? 1 : -1;

        } else {
          return a.birthdaySeasonId > b.birthdaySeasonId ? 1 : -1;

        }
      })
    } else {
      data.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      })
    }

    return data;
  }

  return (
    <Container className={classes.root} maxWidth={(props.format === 'Grid' || props.format === 'Table') ? 'xl' : 'lg'}>
      {/* GRID DISPLAY */}
      {props.format === 'Grid' && 
        villagers.map(villager => <VillagerCard key={villager.name} name={villager.name} status={villager.available} gifts={villager.Items} includeULoves={props.includeULoves} data={villager} />)
      }
      {/* LIST DISPLAY */}
      {props.format === 'List' &&
        <div className={classes.displayList}>
        {villagers.map(villager => 
          <article key={villager.name}>
            <section style={{display: 'flex', flexFlow: 'row wrap'}}>
              <div style={{flex: 0, margin: 0, padding: 0, lineHeight: '1rem'}}>
                <VillagerIcon name={villager.name} style={{verticalAlign: 'middle', margin: 0}} />
              </div>
              <div style={{flex: 1}}>
                <p style={{margin: '0.25rem 0'}}><strong>{villager.name}</strong> {(villager.available && villager.name !== "Krobus") && <span style={{color: 'green'}}>[Marriage Candidate]</span>}</p>
                <p style={{margin: '0.25rem 0'}}><strong>Birthday:</strong> {villager.birthday}</p>
              </div>
            </section>
            <ul className={classes.giftList}>
              {villager.Items.map(item => ((props.includeULoves || (!props.includeULoves && !universalLoves.includes(item.name))) && item.Gift.preference === 'love') && <li key={item.id}><ItemIcon key={item.name} name={item.name} icon={item.icon} size={24} /></li>)}
            </ul>
          </article>
        )}
        </div>
      }

      {/* TABLE DISPLAY */}
      {props.format === 'Table' &&
        <DataGrid rows={dataGridRows} columns={dataGridColumns} pageSize={10} autoHeight components={{Toolbar: GridToolbar}} disableColumnSelector={true} disableColumnFilter={true} />
      }
    </Container>
  );
}
