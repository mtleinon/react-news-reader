import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { getCountryName } from '../utils/countryNames';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';

import { fetchJson } from '../utils/fetchJson';
import PopUpDialog from '../components/PopUpDialog';

import * as fullScreen from "../utils/fullScreen";
import usePrevious from '../utils/usePrevious';

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

const SearchInput = ({ value, onChange, onKeyPress }) => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
}

const ALL_CATEGORIES = 'All categories';
const ALL_COUNTRIES = 'All countries';
const ALL_SOURCE_IDS = 'All sources';

const categories = [ALL_CATEGORIES, 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const countries = [ALL_COUNTRIES, 'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];

export default function AppBar({ loadArticles }) {
  const [errorMessage, setErrorMessage] = useState('');

  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [country, setCountry] = useState('us');
  const [sourceId, setSourceId] = useState(ALL_SOURCE_IDS);
  const [searchValue, setSearchValue] = useState('');
  const prevSearchValue = usePrevious(searchValue, '');

  const [sourceIds, setSourceIds] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (searchValue !== prevSearchValue) {
      return;
    }
    loadArticles(country, category, sourceId, searchValue);
  }, [country, category, sourceId, searchValue, prevSearchValue, loadArticles]);

  const handleSelectCountry = (newCountry) => {
    setCountry(newCountry);
    setSourceId(ALL_SOURCE_IDS);
  }

  const handleSelectCategory = (newCategory) => {
    setCategory(newCategory);
    setSourceId(ALL_SOURCE_IDS);
  }

  const handleSelectSourceId = (newSourceId) => {
    setSourceId(newSourceId);
    setCountry(ALL_COUNTRIES);
    setCategory(ALL_CATEGORIES);
  }

  const toggleFullScreen = () => {
    if (isFullscreen) {
      if (fullScreen.close()) {
        setIsFullscreen(false);
      }
    } else {
      if (fullScreen.open()) {
        setIsFullscreen(true);
      }
    }
  }

  const searchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      loadArticles(country, category, sourceId, searchValue);
    }
  }

  const loadSources = useCallback(async () => {
    const query = '/v2/sources?';
    try {
      const reply = await fetchJson(query);
      const allSourcesIds = [ALL_SOURCE_IDS, ...new Set(reply.sources.map(source => source.id))].sort()
      setSourceIds(allSourcesIds);
    } catch (error) {
      setSourceIds(['No sources available']);
      setErrorMessage(error.message);
    } finally {
    }
  }, []);

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  return (
    <Paper elevation={3} square classes={{ root: classes.paper }}>
      <div className='navbarContent'>
        <div className={classes.nameAndSearchBar}>
          <Typography className={classes.title} variant="h6" >
            News Reader
          </Typography>
          <SearchInput value={searchValue} onChange={searchValueChange} onKeyPress={keyPressed} />
          <IconButton size="small" onClick={toggleFullScreen} classes={{ root: classes.fullScreenIcon }}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </div>
        <div className={classes.selections}>
          <DropDown handleSelect={handleSelectCountry} values={countries}
            displayValues={countries.map(getCountryName)}
            preSelected={getCountryName(country)} />
          <DropDown handleSelect={handleSelectCategory} values={categories} preSelected={category} />
          <DropDown handleSelect={handleSelectSourceId} values={sourceIds} preSelected={sourceId} />
        </div>
      </div>
      <PopUpDialog open={errorMessage !== ''} title='Error happened' message={errorMessage}
        onClose={() => setErrorMessage('')} />
    </Paper>
  );
}