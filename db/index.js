const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true});

let reviewSchema = mongoose.Schema({
  id: Number,
  name: String,
  numReviews: Number,
  review: {
    id: Number,
    description: String,
    helpful: Number,
    funny: Number,
    date_posted: Date,
    language: String,
    thread_length: Number,
    user: {
      id: Number,
      username: String,
      steam_purchaser: Boolean,
      numProducts: Number,
      icon: String
    }
  }
})

let Review = mongoose.model('Review', reviewSchema);

