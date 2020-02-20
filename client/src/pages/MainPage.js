import React, { useState, useEffect, useCallback } from 'react';
import './MainPage.css';
import NewsHeaders from '../components/NewsHeaders';
import AppBar from '../components/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Articles from '../components/Articles';
import { fetchJson } from '../utils/fetchJson';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import TocIcon from '@material-ui/icons/Toc';
import Fab from '@material-ui/core/Fab';
import PopUpDialog from '../components/PopUpDialog';

const ALL_CATEGORIES = 'All categories';
const ALL_COUNTRIES = 'All countries';
const ALL_SOURCE_IDS = 'All sources';
const DEFAULT_SOURCE = 'bbc-news';
const DEFAULT_COUNTRY = 'us';

const Spinner = () => <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}><CircularProgress /></div>

const LeftSidebar = ({ visible, loading, articles, handleSetCurrentUrl, currentUrl }) =>
  visible &&
  <div className='leftSidebar sidebars'>
    {loading
      ? <Spinner />
      : <NewsHeaders title={'Search results'} articles={articles} onClick={handleSetCurrentUrl} url={currentUrl} />
    }
  </div>

const MainContent = ({ loading, articles, defaultArticles, rightSidebarVisible }) =>
  <div className='mainContent'>
    {loading ? <Spinner /> : (
      articles.length > 0 || defaultArticles.length > 0 ?
        (rightSidebarVisible ?
          <Articles articles={[...articles, ...defaultArticles]} /> :
          <Articles articles={[...articles]} />)
        : ''
    )}
  </div>

const RightSidebar = ({ visible, loading, articles, handleSetCurrentUrl, currentUrl }) =>
  visible &&
  <div className='rightSidebar sidebars'>
    {loading
      ? <Spinner />
      : <NewsHeaders title={'BBC News'} articles={articles} onClick={handleSetCurrentUrl} url={currentUrl} />}
  </div>

const ArticleHeadersInMobile = ({ visible, articles, toggleShowHeaders, open, handleSetCurrentUrl, currentUrl }) =>
  !visible && <>
    <Fab color="primary" aria-label="toc"
      style={{ position: 'absolute', bottom: '30px', right: '30px' }}
      onClick={toggleShowHeaders}
    >
      <TocIcon />
    </Fab>
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={toggleShowHeaders}
      onOpen={toggleShowHeaders}
    >
      <NewsHeaders title={'Search results'} articles={articles} onClick={(url) => { toggleShowHeaders(); handleSetCurrentUrl(url); }} url={currentUrl} />
    </SwipeableDrawer>
  </>

export default function MainPage() {

  const [errorMessage, setErrorMessage] = useState('');
  const [helpText, setHelpText] = useState('');
  const rightSidebarVisible = useMediaQuery('(min-width:800px)');
  const leftSidebarVisible = useMediaQuery('(min-width:600px)');
  const [currentUrl, setCurrentUrl] = useState('');

  const [articles, setArticles] = useState([]);
  const [defaultArticles, setDefaultArticles] = useState([]);

  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingDefaultArticles, setLoadingDefaultArticles] = useState(false);

  const [showHeaders, setShowHeaders] = useState(false);

  const toggleShowHeaders = () => {
    setShowHeaders(!showHeaders);
  };

  const loadDefaultArticles = useCallback(async () => {
    if (!rightSidebarVisible) {
      return;
    }
    const queryParams = 'sources=' + DEFAULT_SOURCE;
    const query = 'v2/top-headlines?' + queryParams + '&';

    setLoadingDefaultArticles(true);
    try {
      const reply = await fetchJson(query);
      setDefaultArticles(reply.articles);
    } catch (error) {
      setDefaultArticles([]);
      setErrorMessage(error.message);
    } finally {
      setLoadingDefaultArticles(false);
    }
  }, [rightSidebarVisible]);

  const loadArticles = useCallback(async (
    country = DEFAULT_COUNTRY,
    category = ALL_CATEGORIES,
    sourceId = ALL_SOURCE_IDS,
    searchValue = ''
  ) => {
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
    if (!queryParams) {
      setHelpText('Please give a search string or select a country, a category or a source.');
      return;
    } else {
      setHelpText('');
    }

    if (queryParams) queryParams += '&';
    queryParams += 'pageSize=100&';

    const query = 'v2/top-headlines?' + queryParams;

    setLoadingArticles(true);
    try {
      const reply = await fetchJson(query);
      setArticles(reply.articles);
    } catch (error) {
      setArticles([]);
      setErrorMessage(error.message);
    } finally {
      setLoadingArticles(false);
    }

  }, []);

  useEffect(() => {
    loadDefaultArticles();
  }, [loadDefaultArticles]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleSetCurrentUrl = (url) => setCurrentUrl(url);

  return (
    <div className='container' >
      <div className='navbar' >
        <AppBar loadArticles={loadArticles} />
      </div>
      <LeftSidebar visible={leftSidebarVisible} loading={loadingArticles}
        articles={articles} handleSetCurrentUrl={handleSetCurrentUrl} currentUrl={currentUrl}
      />
      <MainContent loading={loadingArticles} articles={articles}
        defaultArticles={defaultArticles} rightSidebarVisible={rightSidebarVisible} />
      <RightSidebar visible={rightSidebarVisible} loading={loadingDefaultArticles}
        articles={defaultArticles} handleSetCurrentUrl={handleSetCurrentUrl} currentUrl={currentUrl} />
      <ArticleHeadersInMobile visible={leftSidebarVisible} articles={articles} toggleShowHeaders={toggleShowHeaders}
        open={showHeaders} handleSetCurrentUrl={handleSetCurrentUrl} currentUrl={currentUrl} />
      <PopUpDialog open={errorMessage !== ''} title='Error happened' message={errorMessage}
        onClose={() => setErrorMessage('')} />
      <PopUpDialog open={helpText !== ''} title='Info' message={helpText}
        onClose={() => setHelpText('')} />
    </div>
  )
}