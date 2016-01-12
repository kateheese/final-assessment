var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://@localhost/galvanizegazette';

router.post('/api/stories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO stories(title, link, image, summary) VALUES($1, $2, $3, $4)',[req.body.title, req.body.link, req.body.image, req.body.summary], function(err, result) {
      done();
      res.status(200).end();
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
});

router.get('/api/stories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM stories', function(err, result) {
      done();
      res.status(200).json(result);
      if (err) {
        return console.error('error running query', err);
      }
    });
  });
});

router.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public'
  })
});

module.exports = router;
