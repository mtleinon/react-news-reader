import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(() => ({
  paper: {
    height: '100%',
    overflow: 'hidden',
    overflowY: 'scroll'
  },
  // root: {
  //   overflowY: 'scroll'
  // }
}));

const NoArticles = () => <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}><h4>No Articles</h4></div>

export default function NewsHeaders({ title, articles }) {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={1} className={classes.paper}>
        <h3 style={{ textAlign: 'center' }}>{title}</h3>
        {/* <div style={{ overflowY: 'scroll' }}> */}
        <List className={classes.root}>

          {articles.length > 0 ? articles.map((article, i) => (
            <React.Fragment key={article.url}>
              <Divider />
              <ListItem button component="a" href={'#' + article.url}
                alignItems="flex-start">
                <div>
                  <Typography variant="subtitle2" component="span" >
                    {article.title.split('-')[0]}
                  </Typography>
                  <Typography variant="body2" component="span" >
                    {' - ' + article.source.name}
                  </Typography>
                </div>
              </ListItem>
            </React.Fragment>
          )) : <NoArticles />
          }
        </List>
        {/* </div> */}
      </Paper >
    </>
  );
}