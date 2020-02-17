import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    marginTop: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Article({ id, article }) {
  const classes = useStyles();

  return (
    <Card id={id} className={classes.card} raised>
      <CardHeader
        title={article.title}
        subheader={article.source.name}
      />
      {article.urlToImage &&
        <CardMedia
          className={classes.media}
          image={article.urlToImage}
          title={article.title}
        />
      }
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.publishedAt}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.description}
        </Typography>
        <hr />
        <Typography paragraph>
          {article.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
