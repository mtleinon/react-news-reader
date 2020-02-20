import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

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
  description: {
    margin: '16px 24px 16px'
  }
}));

const ArticleContent = ({ article }) => {
  const classes = useStyles();

  return (
    <CardContent>
      {article.author && <Typography variant="body2" color="textPrimary" component="span">
        <b>{article.author}</b> -
  </Typography>
      }
      <Typography variant="body2" component="span">
        {' ' + new Date(article.publishedAt).toLocaleString([], {
          day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
        })
        }
      </Typography>
      <div className={classes.description}>
        <Typography variant="body1" color="textPrimary" component="p">
          {article.description}
        </Typography>
      </div>
      <Typography variant="body2" color="textSecondary" component="p">
        {article.content ? article.content.split('[')[0] : ''}
      </Typography>
    </CardContent>
  );
}

export default function Article({ id, article }) {
  const classes = useStyles();

  return (
    <Card id={id} className={classes.card} raised>
      <CardHeader
        title={article.title.split('-')[0]}
        subheader={article.source.name}
      />
      {article.urlToImage &&
        <CardMedia
          className={classes.media}
          image={article.urlToImage}
          title={article.title}
        />
      }
      <ArticleContent article={article} />
      <CardActions>
        <Button href={article.url}
          target="_blank" rel="opener" color="primary">
          full article
        </Button>
      </CardActions>
    </Card>
  );
}
