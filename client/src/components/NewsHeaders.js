import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
    overflow: 'hidden',
    overflowY: 'scroll'
  },
  h6: {
    margin: theme.spacing(2)
  }
}));

const NoArticles = () => <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}><h4>No Articles</h4></div>

const ArticleHeading = ({ article }) => {
  return <div>
    <Typography variant="subtitle2" component="span" >
      {article.title.split('-')[0]}
    </Typography>
    <Typography variant="body2" component="span" >
      {' - ' + article.source.name + ' - '}
    </Typography>
    <Typography variant="body2" component="span" >
      {' ' + new Date(article.publishedAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
    </Typography>
  </div>;
}

export default function NewsHeaders({ title, articles, onClick, url }) {
  const classes = useStyles();

  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography variant="h6" align='center' component="div" classes={{ h6: classes.h6 }}>
        {title}
      </Typography>
      <List className={classes.root}>
        {articles.length > 0 ?
          articles.map((article, i) => (
            <React.Fragment key={'title' + i + ':' + article.url}>
              <Divider />
              <ListItem button component="a" href={'#' + article.url}
                alignItems="flex-start"
                selected={url === article.url}
                autoFocus={url === article.url}
                onClick={() => { onClick(article.url); }}
                classes={{ selected: classes.selected }}
              >
                <ArticleHeading article={article} />
              </ListItem>
            </React.Fragment>
          )) :
          <NoArticles />
        }
      </List>
    </Paper >
  );
}
