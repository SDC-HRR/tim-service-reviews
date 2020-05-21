const express = require('express');

const app = express();

// MIDDLEWARE
const bodyParser = require('body-parser');
const db = require('../db/index.js');

app.use(express.static(`${__dirname}/../client/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// OLD FRONT END ROUTES
app.patch('/api/reviews/:id', ({ params: { id }, body: { reviewId, field, value } }, res) => {
  db.update(id, reviewId, field, value, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/reviews/:id', ({ params: { id } }, res) => {
  db.find(id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    res.send(results);
  });
});

// NEW API ENDPOINTS

// CREATE
app.post('/new-api/reviews/', ({ body }, res) => {
  db.create(body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.send(results);
  });
});

// READ
app.get('/new-api/reviews/:id', ({ params: { id } }, res) => {
  db.findId(id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    res.send(results);
  });
});

// UPDATE
app.put('/new-api/reviews/:id', ({ params: { id }, body }, res) => {
  db.updateId(id, body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.send(results);
  });
});

// DELETE
app.delete('/new-api/reviews/:id', ({ params: { id } }, res) => {
  db.deleteId(id, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.send('Item deleted');
  });
});


module.exports = app;
