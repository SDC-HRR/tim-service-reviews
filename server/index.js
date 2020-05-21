const express = require('express');

const app = express();

// MIDDLEWARE
const bodyParser = require('body-parser');
const db = require('../db/index.js');

app.use(express.static(`${__dirname}/../client/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// FRONT END ROUTES
app.patch('/api/reviews/:id', ({ params: { id }, body: { reviewId, field, value } }, res) => {
  db.update(id, reviewId, field, value, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(results);
    }
  });
});


// CREATE
app.post('/api/reviews/', ({ body }, res) => {
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
app.get('/api/reviews/:id', ({ params: { id } }, res) => {
  db.find(id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    } else {
      res.status(200).send(results);
    }
  });
});

// UPDATE
app.put('/api/reviews/:id', ({ params: { id }, body: { body } }, res) => {
  db.updateId(id, body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.status(200).send(results);
  });
});

// DELETE
app.delete('/api/reviews/:id', ({ params: { id } }, res) => {
  db.removeId(id, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  });
});




module.exports = app;
