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
app.patch('/api/reviews/:id', function update1({ params: { id }, body: { reviewId, field, value } }, res) {
  function update2(err, results) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(results);
  }

  db.updateId(id, reviewId, field, value, update2);
});

// READ
app.get('/api/reviews/:id', function read1({ params: { id } }, res) {
  function read2(err, results) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(results);
  }
  db.findId(id, read2);
});


// app.get('/api/reviews/:id', ({ params: { id } }, res) => {
//   function callback(err, results) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     res.send(results);
//   }
//   db.findId(id, callback);
// });

// CREATE
app.post('/api/reviews/:id', function post1({ params: { id }, body }, res) {
  function post2(err, results) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(results);
  }
  db.create(id, body, post2);
});

// DELETE
app.delete('/api/reviews/:id', function delete1({ params: { id }, body }, res) {
  db.deleteId(id, body, function delete2(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.status(200).send('Item deleted');
  });
});

module.exports = app;
