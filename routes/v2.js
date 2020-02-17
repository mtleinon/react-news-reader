var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
// var newsApiKey = require('../secrets/secrets');

let newsApiKey;
if (process.env.NODE_ENV === 'development') {
  newsApiKey = require("../secrets/secrets");
  console.debug('development newsApiKey =', newsApiKey);
} else {
  newsApiKey = 'apiKey=' + process.env.NEWS_API_KEY
  console.debug('production newsApiKey =', newsApiKey);
}

router.get('/*', function (req, res, next) {

  // console.log('serve: ' + req.url);
  let url;
  if (req.url.includes('?')) {
    url = req.url;
  } else {
    url = req.url + '?';
  }
  const request = 'https://newsapi.org/v2' + url + newsApiKey;
  console.debug('req.url =', req.url);
  console.debug('request =', request);
  fetch(request)
    .then((res, err) => {
      if (err) {
        console.error('err =', err);
        return res.status(500).send('newsapi call failed');

      }
      // console.debug('reply received =', res);
      return res.json();
    })
    .then(json => {
      // console.log(json)
      return res.send(json);
    });
});

module.exports = router;
