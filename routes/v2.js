var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

let newsApiKey;
if (process.env.NODE_ENV === 'development') {
  newsApiKey = require("../secrets/secrets");
  console.debug('development newsApiKey =', newsApiKey);
} else {
  newsApiKey = 'apiKey=' + process.env.NEWS_API_KEY
  console.debug('production newsApiKey =', newsApiKey);
}

router.get('/*', function (req, res, next) {

  // Add API key and execute the request
  let url;
  if (req.url.includes('?')) {
    url = req.url;
  } else {
    url = req.url + '?';
  }
  const request = 'https://newsapi.org/v2' + url + newsApiKey;
  fetch(request)
    .then((res, err) => {
      if (err) {
        console.error('err =', err);
        return res.status(500).send('newsapi call failed');

      }
      return res.json();
    })
    .then(json => {
      return res.send(json);
    });
});

module.exports = router;
