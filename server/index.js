require('newrelic');

const express = require('express');

const app = express();

// MIDDLEWARE
const bodyParser = require('body-parser');
const db = require('../db/index.js');

app.use(express.static(`${__dirname}/../client/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UPDATE
app.patch('/api/reviews/:id', ({ params: { id }, body: { reviewId, field, value } }, res) => {
  db.updateId(id, reviewId, field, value, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  });
});

// READ
app.get('/api/reviews/:id', ({ params: { id } }, res) => {
  db.findId(id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    console.log(results);
    res.send(results);
  });
});

// CREATE
app.post('/api/reviews/:id', ({ params: { id }, body }, res) => {
  db.create(id, body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.send(results);
  });
});

// DELETE
app.delete('/api/reviews/:id', ({ params: { id }, body }, res) => {
  db.deleteId(id, body, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.status(200).send('Item deleted');
  });
});


module.exports = app;
