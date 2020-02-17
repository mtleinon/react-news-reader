import React from 'react';
import Article from './Article';

export default function Articles({ articles }) {
  return (
    <>
      {articles.map((article, i) => <Article id={article.url} key={article.url} article={article} />)}
    </>
  )
} 