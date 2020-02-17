import React, { useState, useEffect, useCallback } from 'react';
import './MainPage.css';
import Container from '../components/Container';
import NewsHeaders from '../components/NewsHeaders';
import NavBar from './NavBar';
import AppBar from '../components/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainContent from '../components/MainContent';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Articles from '../components/Articles';
import { fetchJson } from '../utils/fetchJson';

const ALL_CATEGORIES = 'All categories';
const ALL_COUNTRIES = 'All countries';
const ALL_SOURCE_IDS = 'All sources';
const categories = [ALL_CATEGORIES, 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const countries = [ALL_COUNTRIES, 'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];
const DEFAULT_SOURCE = 'bbc-news';

const Spinner = () => <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}><CircularProgress /></div>

export default function MainPage() {

  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [country, setCountry] = useState('us');
  const [sourceId, setSourceId] = useState(ALL_SOURCE_IDS);
  const [searchValue, setSearchValue] = useState('');

  const [sourceIds, setSourceIds] = useState([]);
  const [articles, setArticles] = useState([]);
  const [defaultArticles, setDefaultArticles] = useState([]);

  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingDefaultArticles, setLoadingDefaultArticles] = useState(false);

  const loadSources = useCallback(async () => {

    const query = '/v2/sources?';
    const reply = await fetchJson(query);

    const allSourcesIds = [ALL_SOURCE_IDS, ...new Set(reply.sources.map(source => source.id))].sort()
    setSourceIds(allSourcesIds);
  }, []);

  const loadDefaultArticles = useCallback(async () => {
    const queryParams = 'sources=' + DEFAULT_SOURCE;
    const query = 'v2/top-headlines?' + queryParams + '&';

    setLoadingDefaultArticles(true);

    const reply = await fetchJson(query);

    setDefaultArticles(reply.articles);
    setLoadingDefaultArticles(false);

  }, []);

  const loadArticles = useCallback(async () => {
    let queryParams = '';

    // Query params can contain either both country and category or only source
    if (country !== ALL_COUNTRIES) {
      queryParams = 'country=' + country;
    }
    if (category !== ALL_CATEGORIES) {
      if (queryParams) queryParams += '&';
      queryParams += 'category=' + category;
    }
    if (sourceId !== ALL_SOURCE_IDS) {
      queryParams = 'sources=' + sourceId;
    }
    if (searchValue !== '') {
      if (queryParams) queryParams += '&';
      queryParams += 'q=' + searchValue;
    }

    const query = 'v2/top-headlines?' + queryParams + '&pageSize=100&';

    setLoadingArticles(true);
    const reply = await fetchJson(query);

    setArticles(reply.articles);
    setLoadingArticles(false);

    console.debug('sources =', reply);
  },
    [category, country, sourceId, searchValue]
  );

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  useEffect(() => {
    loadDefaultArticles();
  }, [loadDefaultArticles]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles, country, category, sourceId]);

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

  const handleSearchValue = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  return (
    <Container className='container'>
      <NavBar >
        <AppBar
          handleSelectCategory={handleSelectCategory}
          handleSelectCountry={handleSelectCountry}
          handleSelectSourceId={handleSelectSourceId}
          countries={countries}
          categories={categories}
          sourceIds={sourceIds}
          country={country}
          category={category}
          sourceId={sourceId}
          handleSearchValue={handleSearchValue}
        />
      </NavBar>
      <LeftSidebar>
        {loadingArticles ? <Spinner /> : <NewsHeaders title={'Search results'} articles={articles} />}
      </LeftSidebar>
      <MainContent>
        {loadingArticles ? <Spinner /> : (
          articles.length > 0 || defaultArticles.length > 0 ? (<Articles articles={[...articles, ...defaultArticles]} />) : ''
        )
        }
      </MainContent>
      <RightSidebar>
        {loadingDefaultArticles ? <Spinner /> : <NewsHeaders title={'BBC News'} articles={defaultArticles} />}
      </RightSidebar>

    </Container>
  )
}