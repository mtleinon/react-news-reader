import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(() => ({
  paper: {
    height: '100%',
    overflow: 'hidden',
    overflowY: 'scroll'
  }
}));

const NoArticles = () => <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}><h4>No Articles</h4></div>

export default function NewsHeaders({ articles }) {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.paper}>
      <List className={classes.root}>

        {articles.length > 0 ? articles.map((article, i) => (
          <React.Fragment key={article.url}>
            <ListItem button component="a" href={'#' + article.url}
              alignItems="flex-start">
              <ListItemText
                primary={article.title}
                secondary={article.source.name}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        )) : <NoArticles />
        }
      </List>
    </Paper >
  );
}