import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { getCountryName } from '../utils/countryNames';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';

import DropDown from './DropDown';

const useStyles = makeStyles(theme => ({
  nameAndSearchBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '350px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(2)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    maxWidth: '170px'
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  selections: {
    display: 'flex',
    alignItems: 'space-between'
  },
  fullScreenIcon: {
    color: 'white',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    marginLeft: theme.spacing(1)
  }
}));

export default function AppBar({ handleSelectCategory, handleSelectCountry, handleSelectSourceId,
  countries, categories, sourceIds, country, category, sourceId, handleSearchValue, toggleFullScreen, isFullscreen, maxElem }) {

  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');

  const searchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSearchValue(searchValue);
    }
  }

  return (
    <Paper elevation={3} square classes={{ root: classes.paper }}>
      <div className='navbarContent'>
        <div className={classes.nameAndSearchBar}>
          <Typography className={classes.title} variant="h6" >
            News Reader
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchValue}
              onChange={searchValueChange}
              onKeyPress={keyPressed}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {toggleFullScreen !== undefined &&
            <IconButton size="small" onClick={toggleFullScreen} classes={{ root: classes.fullScreenIcon }}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          }
        </div>
        <div className={classes.selections}>
          <DropDown handleSelect={handleSelectCountry} values={countries}
            displayValues={countries.map(getCountryName)}
            preSelected={getCountryName(country)} />
          <DropDown handleSelect={handleSelectCategory} values={categories} preSelected={category} />
          <DropDown handleSelect={handleSelectSourceId} values={sourceIds} preSelected={sourceId} />
        </div>
      </div>
    </Paper>
  );
}